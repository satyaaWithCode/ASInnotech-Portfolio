


"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone } from "lucide-react";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [msg, setMsg] = useState("");
  const [sending, setSending] = useState(false);
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState(null); // { type, msg }
  const toastTimer = useRef(null);

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  function showToast(type, message, duration = 3200) {
    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
      toastTimer.current = null;
    }
    setToast({ type, msg: message });
    toastTimer.current = setTimeout(() => setToast(null), duration);
  }

  async function handleCopyEmail() {
    try {
      await navigator.clipboard.writeText("asinnotechsolutions@gmail.com");
      setCopied(true);
      showToast("success", "Email copied to clipboard");
      setTimeout(() => setCopied(false), 1600);
    } catch {
      showToast("error", "Unable to copy email");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message: msg }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && (data.ok || data.success || data.status === "ok")) {
        setName("");
        setEmail("");
        setPhone("");
        setMsg("");
        showToast("success", "Message sent — we will contact you soon.");
      } else {
        const serverMsg = data?.msg || "Failed to send — try again later.";
        showToast("error", serverMsg);
      }
    } catch {
      showToast("error", "Network error — try again later.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section
      id="contact"
      className="relative z-20 pt-20 pb-32 bg-gradient-to-b from-[#020b17] to-[#041226] overflow-visible"
      style={{ transform: "translateZ(0)" }}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-12 max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 mb-4"
        >
          Contact Us
        </motion.h2>

        <p className="text-center text-gray-300 max-w-2xl mx-auto mb-10 text-sm sm:text-base px-2">
          Have a project, question or want to work together? Send a quick message — we’ll reply
          within 24–48 hours.
        </p>

        <div className="mx-auto w-full">
          <div className="mx-auto bg-[#02101F]/80 border border-white/6 rounded-2xl p-4 sm:p-6 md:p-8 shadow-[0_18px_60px_rgba(2,10,23,0.6)]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
              {/* Form */}
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.55 }}
                className="w-full"
              >
                <label className="block mb-4">
                  <span className="text-sm text-gray-300">Your Name</span>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    className="mt-2 w-full rounded-md bg-[#011528] border border-white/6 px-4 py-3 text-gray-100 text-sm sm:text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 transition"
                    required
                  />
                </label>

                <label className="block mb-4">
                  <span className="text-sm text-gray-300">Email</span>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    type="email"
                    required
                    className="mt-2 w-full rounded-md bg-[#011528] border border-white/6 px-4 py-3 text-gray-100 text-sm sm:text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 transition"
                  />
                </label>

                <label className="block mb-4">
                  <span className="text-sm text-gray-300">Phone Number</span>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 9876543210"
                    type="tel"
                    pattern="[0-9+\\- ()]{7,20}"
                    className="mt-2 w-full rounded-md bg-[#011528] border border-white/6 px-4 py-3 text-gray-100 text-sm sm:text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 transition"
                  />
                </label>

                <label className="block mb-6">
                  <span className="text-sm text-gray-300">Message</span>
                  <motion.textarea
                    whileFocus={{ scale: 1.01 }}
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    placeholder="Tell us about the project..."
                    rows={6}
                    required
                    className="mt-2 w-full rounded-md bg-[#011528] border border-white/6 px-4 py-3 text-gray-100 text-sm sm:text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 transition resize-none"
                  />
                </label>

                {/* === Layout that keeps send+gmail in a vertical column AND shows toast to the right on md+ screens === */}
                <div className="flex flex-col md:flex-row items-center md:items-start md:justify-start gap-4">
                  {/* Left column: send button + gmail (stacked) */}
                  <div className="flex flex-col items-center md:items-start gap-2">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      type="submit"
                      disabled={sending}
                      className="inline-flex justify-center items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold text-sm sm:text-base shadow-md hover:shadow-lg transition disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {sending ? (
                        <>
                          <span className="inline-block w-4 h-4 border-2 border-cyan-800 border-t-transparent rounded-full animate-spin"></span>
                          Sending...
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </motion.button>

                    {/* Gmail button placed under send button */}
                    <div className="mt-2">
                      <button
                        type="button"
                        onClick={handleCopyEmail}
                        className="inline-flex items-center gap-2 px-3 py-2 border border-white/6 rounded-full bg-white/3 text-sm text-gray-100 hover:bg-white/6 transition"
                      >
                        <Mail className="w-4 h-4 text-cyan-300" />
                        <span className="truncate">asinnotechsolutions@gmail.com</span>
                      </button>
                      {copied && (
                        <span className="text-sm text-cyan-300 ml-3 hidden sm:inline">Copied</span>
                      )}
                    </div>
                  </div>

                  {/* Right area: toast — positioned to the right on md+, below on small */}
                  <div className="w-full md:w-auto flex justify-center md:justify-start">
                    <AnimatePresence>
                      {toast && (
                        <motion.div
                          key={toast.msg}
                          initial={{ opacity: 0, x: 6, y: -6 }}
                          animate={{ opacity: 1, x: 0, y: 0 }}
                          exit={{ opacity: 0, x: 6, y: -6 }}
                          transition={{ duration: 0.28 }}
                          className={`px-4 py-2 rounded-full text-sm font-medium shadow-sm ${
                            toast.type === "success" ? "bg-emerald-500/95 text-white" : "bg-rose-500/95 text-white"
                          }`}
                          role="status"
                          aria-live="polite"
                        >
                          {toast.msg}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

              </motion.form>

              {/* Sidebar (unchanged) */}
              <motion.aside
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.55 }}
                className="w-full"
              >
                <div className="bg-[#011528]/30 border border-white/6 rounded-xl p-5 md:p-6 h-full flex flex-col gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-white">Office</h4>
                    <p className="text-sm text-gray-300 mt-2 leading-relaxed">
                      AS Innotech Solutions<br />
                      Bhubaneswar, Odisha — India
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white">Quick Contact</h4>
                    <div className="mt-3 flex flex-col gap-2">
                      <a
                        href="mailto:asinnotechsolutions@gmail.com"
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/3 border border-white/6 hover:bg-white/6 transition justify-center sm:justify-start"
                      >
                        <Mail className="w-4 h-4 text-cyan-300" />
                        <span className="text-sm text-gray-100">asinnotechsolutions@gmail.com</span>
                      </a>

                      <a
                        href="tel:+91 7606949967"
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/3 border border-white/6 hover:bg-white/6 transition justify-center sm:justify-start"
                      >
                        <Phone className="w-4 h-4 text-cyan-300" />
                        <span className="text-sm text-gray-100">+91 7606949967</span>
                      </a>

                      <a
                        href="tel:+91 7735525279"
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/3 border border-white/6 hover:bg-white/6 transition justify-center sm:justify-start"
                      >
                        <Phone className="w-4 h-4 text-cyan-300" />
                        <span className="text-sm text-gray-100">+91 7735525279</span>
                      </a>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white">Working Hours</h4>
                    <p className="text-sm text-gray-300 mt-2">Mon — Fri: 9:30am — 6:30pm IST</p>
                  </div>

                  <div className="mt-auto text-sm text-gray-400">
                    <p className="leading-relaxed text-center sm:text-left">
                      Prefer a call? Submit the form and we'll get back to confirm a time.
                    </p>
                  </div>
                </div>
              </motion.aside>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
