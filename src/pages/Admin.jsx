import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { auth } from "../lib/firebase";
import { supabase } from "../lib/supabase";
import {
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
} from "firebase/auth";

function formatTimestamp(ts) {
    if (!ts) return "";
    const d = new Date(ts);
    return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    }) +
        " · " +
        d.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });
}

const MAX_ATTEMPTS = 3;
const LOCKOUT_SECONDS = 30;

function SkeletonCard() {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 animate-pulse">
            <div className="flex items-center gap-3 mb-3">
                <div className="h-4 w-28 rounded bg-white/10" />
                <div className="h-3 w-36 rounded bg-white/10" />
            </div>
            <div className="space-y-2 mb-4">
                <div className="h-3 w-full rounded bg-white/10" />
                <div className="h-3 w-5/6 rounded bg-white/10" />
                <div className="h-3 w-4/6 rounded bg-white/10" />
            </div>
            <div className="h-3 w-32 rounded bg-white/10" />
        </div>
    );
}

function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPw, setShowPw] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [shakeKey, setShakeKey] = useState(0);
    const [attempts, setAttempts] = useState(0);
    const [lockoutEnd, setLockoutEnd] = useState(null);
    const [countdown, setCountdown] = useState(0);

    useEffect(() => {
        if (!lockoutEnd) return;
        const tick = () => {
            const remaining = Math.ceil((lockoutEnd - Date.now()) / 1000);
            if (remaining <= 0) {
                setLockoutEnd(null);
                setCountdown(0);
                setAttempts(0);
            } else {
                setCountdown(remaining);
            }
        };
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, [lockoutEnd]);

    const isLocked = lockoutEnd && Date.now() < lockoutEnd;

    const handleLogin = async (e) => {
        e.preventDefault();
        if (isLocked || !auth) return;

        setError("");
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setAttempts(0);
        } catch (err) {
            const next = attempts + 1;
            setAttempts(next);

            if (next >= MAX_ATTEMPTS) {
                setLockoutEnd(Date.now() + LOCKOUT_SECONDS * 1000);
            }

            const msg =
                err.code === "auth/invalid-credential"
                    ? "Invalid email or password"
                    : err.code === "auth/too-many-requests"
                        ? "Too many attempts — try again later"
                        : "Login failed. Please try again.";
            setError(msg);
            setShakeKey((k) => k + 1);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-primary px-4">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-md rounded-2xl border border-white/10
                   bg-white/5 backdrop-blur-xl shadow-2xl shadow-lavender/5 p-8"
            >
                <div className="text-center mb-8">
                    <h1
                        className="text-3xl font-bold tracking-tight"
                        style={{
                            textShadow: "0 0 30px rgba(122,87,219,.45), 0 0 60px rgba(122,87,219,.2)",
                        }}
                    >
                        HS Admin
                    </h1>
                    <p className="text-sm text-neutral-500 mt-1">Portfolio Dashboard</p>
                </div>

                {!auth && (
                    <p className="text-sm text-red-400 text-center mb-4">
                        Authentication service is unavailable.
                    </p>
                )}

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="field-label block mb-1" htmlFor="admin-email">
                            Email
                        </label>
                        <input
                            id="admin-email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@example.com"
                            autoComplete="email"
                            className="field-input field-input-focus w-full"
                        />
                    </div>

                    <div>
                        <label className="field-label block mb-1" htmlFor="admin-pw">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                id="admin-pw"
                                type={showPw ? "text" : "password"}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                autoComplete="current-password"
                                className="field-input field-input-focus w-full pr-12"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPw(!showPw)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 mt-1
                           text-neutral-400 hover:text-white transition-colors text-sm select-none"
                                tabIndex={-1}
                            >
                                {showPw ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        {error && (
                            <motion.p
                                key={shakeKey}
                                initial={{ x: -10, opacity: 0 }}
                                animate={{ x: [0, -6, 6, -4, 4, 0], opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.4 }}
                                className="text-sm text-red-400 text-center"
                            >
                                {error}
                            </motion.p>
                        )}
                    </AnimatePresence>

                    {isLocked && (
                        <p className="text-xs text-amber-400 text-center">
                            Too many attempts. Retry in{" "}
                            <span className="font-mono font-bold">{countdown}s</span>
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading || isLocked || !auth}
                        className="relative w-full py-3 rounded-xl font-semibold text-sm
                       bg-gradient-to-r from-lavender to-royal
                       hover:shadow-lg hover:shadow-lavender/25
                       disabled:opacity-40 disabled:cursor-not-allowed
                       transition-all duration-300 overflow-hidden"
                    >
                        {loading ? (
                            <span className="inline-flex items-center gap-2">
                                <span className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Signing in…
                            </span>
                        ) : isLocked ? (
                            `Locked (${countdown}s)`
                        ) : (
                            "Sign In"
                        )}

                        {!loading && !isLocked && (
                            <span
                                className="absolute inset-0 -translate-x-full animate-[shimmer_2.5s_infinite]
                           bg-gradient-to-r from-transparent via-white/10 to-transparent"
                            />
                        )}
                    </button>
                </form>
            </motion.div>

            <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
        </div>
    );
}

function MessageCard({ msg, index, onMarkRead }) {
    const [expanded, setExpanded] = useState(false);
    const isRead = msg.read === true;

    const handleMarkRead = async (e) => {
        e.stopPropagation();
        if (isRead || !supabase) return;
        try {
            await supabase
                .from("contact_requests")
                .update({ read: true })
                .eq("id", msg.id);
        } catch (err) {
            console.error("Failed to mark as read:", err);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.06 }}
            onClick={() => setExpanded(!expanded)}
            className={`rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5
                  cursor-pointer transition-all duration-200 hover:bg-white/[.07]
                  border-l-4 ${isRead ? "border-l-emerald-500" : "border-l-blue-500"}`}
        >
            <div className="flex items-start justify-between gap-3 mb-2">
                <div className="min-w-0">
                    <p className="font-semibold text-white truncate">{msg.name}</p>
                    <p className="text-xs text-neutral-500 truncate">{msg.email}</p>
                </div>
                {!isRead && (
                    <span className="shrink-0 size-2.5 rounded-full bg-blue-500 mt-1.5" />
                )}
            </div>

            <p
                className={`text-sm text-neutral-300 mb-3 whitespace-pre-wrap break-words ${expanded ? "" : "line-clamp-3"}`}
            >
                {msg.message}
            </p>

            <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="text-xs text-neutral-500">
                    {formatTimestamp(msg.created_at)}
                </span>
                {!isRead && (
                    <button
                        onClick={handleMarkRead}
                        className="text-xs px-3 py-1 rounded-full border border-emerald-500/40
                       text-emerald-400 hover:bg-emerald-500/10 transition-colors"
                    >
                        Mark as Read
                    </button>
                )}
                {isRead && (
                    <span className="text-xs text-emerald-500/70 select-none">✓ Read</span>
                )}
            </div>
        </motion.div>
    );
}

function Dashboard({ user }) {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMessages = useCallback(async () => {
        if (!supabase) {
            setLoading(false);
            return;
        }
        setLoading(true);
        const { data, error } = await supabase
            .from("contact_requests")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Failed to fetch messages:", error);
        } else {
            setMessages(data || []);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchMessages();
    }, [fetchMessages]);

    // Real-time subscription
    useEffect(() => {
        if (!supabase) return;

        const channel = supabase
            .channel("contact_requests_changes")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "contact_requests" },
                () => fetchMessages()
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [fetchMessages]);

    const handleLogout = async () => {
        if (!auth) return;
        try {
            await signOut(auth);
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    const total = messages.length;
    const unread = messages.filter((m) => !m.read).length;
    const today = messages.filter((m) => {
        if (!m.created_at) return false;
        const d = new Date(m.created_at);
        const now = new Date();
        return (
            d.getDate() === now.getDate() &&
            d.getMonth() === now.getMonth() &&
            d.getFullYear() === now.getFullYear()
        );
    }).length;

    return (
        <div className="min-h-screen bg-primary">
            <nav className="sticky top-0 z-40 border-b border-white/10 bg-primary/80 backdrop-blur-lg">
                <div className="max-w-6xl mx-auto flex items-center justify-between px-5 py-4">
                    <h1 className="text-lg font-bold tracking-tight">
                        <span
                            style={{
                                textShadow:
                                    "0 0 20px rgba(122,87,219,.35), 0 0 40px rgba(122,87,219,.15)",
                            }}
                        >
                            HS
                        </span>{" "}
                        Admin Panel
                    </h1>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={fetchMessages}
                            title="Refresh"
                            className="p-2 rounded-lg border border-white/10 text-neutral-400
                         hover:text-white hover:bg-white/5 transition-colors text-sm"
                        >
                            ↻
                        </button>

                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 rounded-lg text-sm font-medium
                         border border-red-500/30 text-red-400
                         hover:bg-red-500/10 hover:shadow-lg hover:shadow-red-500/10
                         transition-all duration-200"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            <main className="max-w-6xl mx-auto px-5 py-8">
                <div className="grid grid-cols-3 gap-4 mb-8">
                    {[
                        { label: "Total Messages", value: total, color: "text-lavender" },
                        { label: "Today", value: today, color: "text-aqua" },
                        { label: "Unread", value: unread, color: "text-coral" },
                    ].map((s) => (
                        <div
                            key={s.label}
                            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 text-center"
                        >
                            <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
                            <p className="text-xs text-neutral-500 mt-1">{s.label}</p>
                        </div>
                    ))}
                </div>

                {!supabase ? (
                    <div className="text-center py-24">
                        <p className="text-xl text-red-400">Database service unavailable</p>
                        <p className="text-sm text-neutral-600 mt-1">
                            Supabase is not configured. Check environment variables.
                        </p>
                    </div>
                ) : loading ? (
                    <div className="grid md:grid-cols-2 gap-4">
                        <SkeletonCard />
                        <SkeletonCard />
                        <SkeletonCard />
                    </div>
                ) : messages.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-24"
                    >
                        <p className="text-5xl mb-4">📭</p>
                        <p className="text-xl text-neutral-400">No messages yet</p>
                        <p className="text-sm text-neutral-600 mt-1">
                            When someone submits the contact form, it will appear here.
                        </p>
                    </motion.div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-4">
                        {messages.map((msg, i) => (
                            <MessageCard key={msg.id} msg={msg} index={i} />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

export default function Admin() {
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    useEffect(() => {
        if (!auth) {
            setAuthLoading(false);
            return;
        }
        const unsub = onAuthStateChanged(auth, (u) => {
            setUser(u);
            setAuthLoading(false);
        });
        return unsub;
    }, []);

    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-primary">
                <span className="size-8 border-3 border-white/20 border-t-lavender rounded-full animate-spin" />
            </div>
        );
    }

    if (!user) {
        return <LoginScreen />;
    }

    return <Dashboard user={user} />;
}
