


"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone } from "lucide-react";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [sending, setSending] = useState(false);
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState(null);

  async function handleCopyEmail() {
    try {
      await navigator.clipboard.writeText("asinnotechsolutions@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message: msg }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setName("");
        setEmail("");
        setMsg("");
        setToast({ type: "success", msg: "Message sent — we will contact you soon." });
      } else {
        setToast({ type: "error", msg: "Failed to send — try again later." });
      }
    } catch {
      setToast({ type: "error", msg: "Network error — try again later." });
    } finally {
      setSending(false);
      setTimeout(() => setToast(null), 3800);
    }
  }

  return (
    <section
      id="contact"
      className="relative z-20 pt-20 pb-32 bg-gradient-to-b from-[#020b17] to-[#041226] overflow-visible"
      style={{ transform: "translateZ(0)" }}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-12 max-w-5xl">
        {/* Title */}
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

        {/* Card wrapper */}
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

                {/* Buttons + inline toast container */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-3">
                  <div className="flex items-center gap-3 w-full sm:w-auto">
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

                    {/* Inline toast */}
                    <div className="w-full sm:w-auto">
                      <AnimatePresence>
                        {toast && (
                          <motion.div
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -6 }}
                            transition={{ duration: 0.28 }}
                            role="status"
                            aria-live="polite"
                            className={`mt-3 sm:mt-0 sm:ml-3 inline-flex items-center px-3 py-2 rounded-full text-sm font-medium shadow-sm ${
                              toast.type === "success"
                                ? "bg-emerald-500/95 text-white"
                                : "bg-rose-500/95 text-white"
                            }`}
                          >
                            <span className="truncate">{toast.msg}</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="inline-flex items-center gap-2 px-3 py-2 border border-white/6 rounded-full bg-white/3 text-sm text-gray-100 hover:bg-white/6 transition w-full sm:w-auto justify-center"
                    >
                      <Mail className="w-4 h-4 text-cyan-300" />
                      <span className="truncate">asinnotechsolutions@gmail.com</span>
                    </button>
                    {copied && (
                      <span className="text-sm text-cyan-300 text-center w-full sm:w-auto">
                        Copied
                      </span>
                    )}
                  </div>
                </div>
              </motion.form>

              {/* Sidebar */}
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
                        <span className="text-sm text-gray-100">
                          asinnotechsolutions@gmail.com
                        </span>
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
                    <p className="text-sm text-gray-300 mt-2">
                      Mon — Fri: 9:30am — 6:30pm IST
                    </p>
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
