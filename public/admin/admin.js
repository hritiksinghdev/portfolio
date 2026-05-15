import { supabase } from './supabaseClient.js';

document.addEventListener('DOMContentLoaded', () => {
    const elements = {
        overlay: document.getElementById('loadingOverlay'),
        login: document.getElementById('loginContainer'),
        dashboard: document.getElementById('dashboardContainer'),
        form: document.getElementById('loginForm'),
        email: document.getElementById('email'),
        password: document.getElementById('password'),
        error: document.getElementById('loginError'),
        loginBtn: document.getElementById('loginBtn'),
        logoutBtn: document.getElementById('logoutBtn'),
        refreshBtn: document.getElementById('refreshBtn'),
        tableBody: document.getElementById('tableBody'),
        emptyState: document.getElementById('emptyState'),
        requestsTable: document.getElementById('requestsTable')
    };

    // 1. Initial Authentication Check
    checkSession();

    // 2. Listen for Auth State Changes
    supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
            showDashboard();
            fetchData();
        } else if (event === 'SIGNED_OUT') {
            showLogin();
        }
    });

    async function checkSession() {
        try {
            const { data: { session }, error } = await supabase.auth.getSession();

            if (error) {
                throw error;
            }

            if (session) {
                showDashboard();
                fetchData();
            } else {
                showLogin();
            }
        } catch (error) {
            console.error('Session check failed:', error.message);
            showLogin();
        }
    }

    // 3. Login Flow
    elements.form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const emailStr = elements.email.value.trim();
        const passwordStr = elements.password.value;

        elements.error.textContent = '';
        elements.loginBtn.disabled = true;
        elements.loginBtn.textContent = 'Signing in...';

        const { error } = await supabase.auth.signInWithPassword({
            email: emailStr,
            password: passwordStr,
        });

        if (error) {
            elements.error.textContent = error.message;
            elements.loginBtn.disabled = false;
            elements.loginBtn.textContent = 'Sign In';
        } else {
            elements.loginBtn.disabled = false;
            elements.loginBtn.textContent = 'Sign In';
            elements.form.reset();
            // successful login triggers onAuthStateChange -> showDashboard
        }
    });

    // 4. Logout Flow
    elements.logoutBtn.addEventListener('click', async () => {
        elements.logoutBtn.disabled = true;
        elements.logoutBtn.textContent = 'Logging out...';
        await supabase.auth.signOut();
        elements.logoutBtn.disabled = false;
        elements.logoutBtn.textContent = 'Log out';
    });

    // 5. Data Fetching
    elements.refreshBtn.addEventListener('click', fetchData);

    async function fetchData() {
        elements.refreshBtn.textContent = 'Refreshing...';
        elements.refreshBtn.disabled = true;

        // Assumes table is named 'contact_requests'
        const { data, error } = await supabase
            .from('contact_requests')
            .select('*')
            .order('created_at', { ascending: false });

        elements.refreshBtn.textContent = 'Refresh Data';
        elements.refreshBtn.disabled = false;

        if (error) {
            console.error('Error fetching data:', error.message);
            // Optional: Handle error gracefully in the UI
            return;
        }

        renderTable(data);
    }

    // 6. Data Rendering
    function renderTable(data) {
        elements.tableBody.innerHTML = '';

        if (!data || data.length === 0) {
            elements.requestsTable.style.display = 'none';
            elements.emptyState.style.display = 'block';
            return;
        }

        elements.requestsTable.style.display = 'table';
        elements.emptyState.style.display = 'none';

        data.forEach(item => {
            const tr = document.createElement('tr');

            // Fallbacks in case table schema differs slightly
            const id = item.id || '-';
            const name = item.name || item.full_name || 'N/A';
            const email = item.email || 'N/A';
            const service = item.service || item.subject || 'N/A';
            const message = item.message || '-';

            let dateStr = '-';
            if (item.created_at) {
                const d = new Date(item.created_at);
                dateStr = d.toLocaleDateString(undefined, {
                    year: 'numeric', month: 'short', day: 'numeric'
                });
            }

            // Truncate message for UI
            const truncatedMessage = message.length > 50 ? message.substring(0, 50) + '...' : message;

            tr.innerHTML = `
        <td style="color: var(--text-muted);">${escapeHTML(String(id))}</td>
        <td class="td-name">${escapeHTML(name)}</td>
        <td class="td-email">${escapeHTML(email)}</td>
        <td><span class="badge ${service !== 'N/A' ? 'badge-primary' : 'badge-gray'}">${escapeHTML(service)}</span></td>
        <td class="td-message" title="${escapeHTML(message)}">${escapeHTML(truncatedMessage)}</td>
        <td class="td-date">${escapeHTML(dateStr)}</td>
      `;

            elements.tableBody.appendChild(tr);
        });
    }

    // 7. Utility functions
    function escapeHTML(str) {
        if (!str) return '';
        return str.replace(/[&<>'"]/g,
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }

    function showLogin() {
        elements.overlay.style.display = 'none';
        elements.dashboard.style.display = 'none';
        elements.login.style.display = 'flex';
    }

    function showDashboard() {
        elements.overlay.style.display = 'none';
        elements.login.style.display = 'none';
        elements.dashboard.style.display = 'flex';
    }
});
