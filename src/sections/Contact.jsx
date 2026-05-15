import { useState, useRef } from "react";
import Alert from "../components/Alert";
import { Particles } from "../components/Particles";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { supabase } from "../lib/supabase";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 2000;
const RATE_LIMIT_MS = 30000;

function sanitize(str) {
  return str.replace(/[<>]/g, "").trim();
}

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.1, once: true });
  const lastSubmitRef = useRef(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showAlertMessage = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const now = Date.now();
    if (now - lastSubmitRef.current < RATE_LIMIT_MS) {
      showAlertMessage("danger", "Please wait before sending another message.");
      return;
    }

    const name = sanitize(formData.name);
    const email = sanitize(formData.email);
    const message = sanitize(formData.message);

    if (!name || name.length > MAX_NAME_LENGTH) {
      showAlertMessage("danger", "Please enter a valid name.");
      return;
    }
    if (!EMAIL_REGEX.test(email) || email.length > MAX_EMAIL_LENGTH) {
      showAlertMessage("danger", "Please enter a valid email.");
      return;
    }
    if (!message || message.length > MAX_MESSAGE_LENGTH) {
      showAlertMessage("danger", `Message must be under ${MAX_MESSAGE_LENGTH} characters.`);
      return;
    }

    if (!supabase) {
      showAlertMessage("danger", "Contact service is currently unavailable.");
      return;
    }

    setIsLoading(true);
    lastSubmitRef.current = now;

    try {
      const { error } = await supabase.from("contact_requests").insert([
        { name, email, message },
      ]);

      if (error) throw error;

      showAlertMessage("success", "Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error(error);
      showAlertMessage("danger", "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="relative flex items-center c-space section-spacing">
      <Particles
        className="absolute inset-0 z-50"
        quantity={100}
        ease={80}
        color={"#ffffff"}
        refresh
      />
      {showAlert && <Alert type={alertType} text={alertMessage} />}
      <div
        ref={sectionRef}
        className={`flex flex-col items-center justify-center max-w-md p-5 mx-auto border border-white/10 rounded-2xl bg-primary scroll-reveal ${isVisible ? "visible" : ""}`}
      >
        <div className="flex flex-col items-start w-full gap-5 mb-10">
          <h2 className="text-heading"> Lets Talk </h2>
          <p className="font-normal text-neutral-400">
            Whether You're Looking to build a new Website, or a Existing
            Platform, or to bring a project to life, <br /> I'm here to help.
          </p>
        </div>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="name" className="field-label">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="field-input field-input-focus"
              placeholder="Shrey"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              maxLength={MAX_NAME_LENGTH}
              required
            />
          </div>

          <div className="mb-5">
            <label htmlFor="email" className="field-label">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="field-input field-input-focus"
              placeholder="shrey@gmail.com"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              maxLength={MAX_EMAIL_LENGTH}
              required
            />
          </div>

          <div className="mb-5">
            <label htmlFor="message" className="field-label">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="field-input field-input-focus"
              placeholder="Share your thoughts"
              value={formData.message}
              onChange={handleChange}
              maxLength={MAX_MESSAGE_LENGTH}
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-1 py-3 text-center rounded-md cursor-pointer bg-radial from-lavender hover-animation disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {!isLoading ? "Send" : "Sending..."}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
