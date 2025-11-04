

"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 w-full z-50 backdrop-blur-lg transition-all duration-700 overflow-visible ${
          scrolled
            ? "bg-[#020b17]/85 border-b border-cyan-400/20 shadow-[0_0_25px_rgba(0,255,255,0.12)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 md:px-10 py-3 sm:py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group relative">
            <motion.div
              className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-transparent border border-cyan-400/40 shadow-[0_0_15px_rgba(0,255,255,0.15)]"
              whileHover={{
                scale: 1.12,
                rotate: 3,
                boxShadow: "0 0 30px rgba(0,255,255,0.12)",
              }}
              animate={{
                boxShadow: [
                  "0 0 12px rgba(0,255,255,0.12)",
                  "0 0 22px rgba(0,255,255,0.18)",
                  "0 0 12px rgba(0,255,255,0.12)",
                ],
              }}
              transition={{
                repeat: Infinity,
                repeatType: "mirror",
                duration: 4,
              }}
            >
              <motion.span
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-30 blur-md"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
              />
              <motion.img
                src="/logo.png"
                alt="AS Innotech Logo"
                className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 relative z-10"
                whileHover={{ scale: 1.15 }}
                transition={{ type: "spring", stiffness: 220 }}
              />
            </motion.div>

            <div>
              <motion.h1
                className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 text-lg sm:text-xl font-extrabold tracking-wide leading-tight drop-shadow-[0_0_8px_rgba(0,255,255,0.1)]"
                whileHover={{ scale: 1.03 }}
              >
                AS Innotech
              </motion.h1>
              <p className="text-[9px] sm:text-[10px] md:text-[11px] text-gray-400 tracking-widest font-semibold group-hover:text-cyan-300 transition-all duration-300">
                SOLUTIONS
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6 lg:gap-10">
            {links.map((link) => (
              <motion.div
                key={link.name}
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 250 }}
              >
                <Link
                  href={link.href}
                  className="relative text-gray-300 text-sm lg:text-base font-medium group transition-all"
                >
                  <span className="relative z-10 group-hover:text-cyan-400">
                    {link.name}
                  </span>
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300 rounded-full" />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.08 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative px-5 sm:px-6 py-2 sm:py-2.5 font-semibold rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-black shadow-[0_0_18px_rgba(0,255,255,0.12)] overflow-hidden text-sm sm:text-base"
            >
              <span className="relative z-10">Let’s Talk</span>
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-30"
                animate={{ x: ["-100%", "100%"] }}
                transition={{
                  repeat: Infinity,
                  duration: 2.8,
                  ease: "linear",
                }}
              />
            </motion.a>

            {/* Feedback button opens modal */}
            <button
              onClick={() => setFeedbackOpen(true)}
              className="px-4 py-2 rounded-full bg-white/6 border border-cyan-400/20 text-sm text-gray-100 hover:bg-white/10 transition"
              aria-haspopup="dialog"
            >
              Give Feedback
            </button>
          </div>

        
{/* Mobile Toggle (moved beside the round logo) */}
<button
  onClick={() => setMenuOpen((s) => !s)}
  aria-label={menuOpen ? "Close menu" : "Open menu"}
  className="md:hidden absolute left-75 top-4 text-cyan-400 focus:outline-none p-2 rounded-lg w-9 h-9 flex items-center justify-center z-50"
>
  <span className="sr-only">{menuOpen ? "Close" : "Open"} menu</span>

  {menuOpen ? (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 6L18 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 18L18 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ) : (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="5.5" r="1.6" fill="currentColor" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" />
      <circle cx="12" cy="18.5" r="1.6" fill="currentColor" />
    </svg>
  )}
</button>


        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.32 }}
              className="md:hidden bg-[#020b17]/95 backdrop-blur-xl border-t border-cyan-400/8"
            >
              <div className="flex flex-col items-center py-6 space-y-5">
                {links.map((link) => (
                  <motion.div
                    key={link.name}
                    whileHover={{ scale: 1.04 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="text-gray-300 text-base sm:text-lg font-medium hover:text-cyan-400 transition"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}

                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  className="px-8 py-2 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-black font-semibold shadow-lg text-sm sm:text-base"
                  onClick={() => setMenuOpen(false)}
                >
                  Let’s Talk
                </motion.a>

                <button
                  onClick={() => {
                    setFeedbackOpen(true);
                    setMenuOpen(false);
                  }}
                  className="px-6 py-2 rounded-full bg-white/6 border border-cyan-400/20 text-sm text-gray-100 hover:bg-white/10 transition"
                >
                  Give Feedback
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <FeedbackModal open={feedbackOpen} onClose={() => setFeedbackOpen(false)} />
    </>
  );
}

/* === Feedback Modal Component === */
function FeedbackModal({ open, onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState(null);
  const backdropRef = useRef(null);

  useEffect(() => {
    if (open) {
      setName("");
      setEmail("");
      setRating(5);
      setMessage("");
      setNotice(null);
      document.body.style.overflow = "hidden";
    } else document.body.style.overflow = "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    setNotice(null);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, rating, message }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setNotice({ type: "success", msg: "Thanks! Your feedback was submitted." });
        setTimeout(() => {
          setNotice(null);
          onClose();
        }, 1400);
      } else {
        setNotice({ type: "error", msg: data?.error || "Failed to submit feedback." });
      }
    } catch {
      setNotice({ type: "error", msg: "Network error. Try again later." });
    } finally {
      setSending(false);
    }
  }

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[99998] flex items-center justify-center"
        ref={backdropRef}
        onMouseDown={(e) => e.target === backdropRef.current && onClose()}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        <motion.div
          key="panel"
          initial={{ y: -12, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -12, opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.22 }}
          className="relative z-[99999] w-full max-w-xl mx-4 bg-[#02101F]/95 border border-white/6 rounded-2xl p-6 sm:p-8 shadow-[0_30px_120px_rgba(0,0,0,0.6)]"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-white">Share your feedback</h3>
              <p className="text-sm text-gray-300 mt-1">Tell us what you liked and what we can improve.</p>
            </div>

            <button
              onClick={onClose}
              aria-label="Close feedback"
              className="text-gray-300 hover:text-white rounded-md p-1"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="block">
                <span className="text-sm text-gray-300">Name</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name (optional)"
                  className="mt-1 w-full rounded-md bg-[#011528] border border-white/6 px-3 py-2 text-gray-100 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
                />
              </label>
              <label className="block">
                <span className="text-sm text-gray-300">Email</span>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com (optional)"
                  type="email"
                  className="mt-1 w-full rounded-md bg-[#011528] border border-white/6 px-3 py-2 text-gray-100 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
                />
              </label>
            </div>

            <label className="block">
              <span className="text-sm text-gray-300">Rating</span>
              <div className="mt-1 flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setRating(i)}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                      rating === i ? "bg-cyan-400 text-black" : "bg-white/5 text-gray-200"
                    }`}
                  >
                    {i}★
                  </button>
                ))}
              </div>
            </label>

            <label className="block">
              <span className="text-sm text-gray-300">Message</span>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                placeholder="Short note about your experience..."
                className="mt-1 w-full rounded-md bg-[#011528] border border-white/6 px-3 py-2 text-gray-100 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 resize-none"
              />
            </label>

            {/* 🔄 Spinner-enhanced button */}
            <div className="flex items-center justify-between gap-3">
              <button
                type="submit"
                disabled={sending}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold text-sm shadow hover:shadow-lg transition disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {sending ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-cyan-800 border-t-transparent rounded-full animate-spin"></span>
                    Sending...
                  </>
                ) : (
                  "Submit Feedback"
                )}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="px-3 py-2 rounded-full bg-white/5 text-sm text-gray-200 hover:bg-white/6 transition"
              >
                Cancel
              </button>
            </div>

            {notice && (
              <div
                role="status"
                className={`mt-2 inline-block px-3 py-2 rounded-md text-sm ${
                  notice.type === "success" ? "bg-emerald-500/95 text-white" : "bg-rose-500/95 text-white"
                }`}
              >
                {notice.msg}
              </div>
            )}
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
