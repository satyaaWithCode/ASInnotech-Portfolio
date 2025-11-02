"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Mail,
  ExternalLink,
  MapPin,
  Phone,
} from "lucide-react";

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const companyEmail = "asinnotechsolutions@gmail.com";

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(companyEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  }

  function subscribe(e) {
    e.preventDefault();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3000);
  }

  return (
    <footer className="relative bg-gradient-to-t from-[#02101B] via-[#031729] to-transparent pt-20 pb-12 text-gray-200">
      {/* decorative wave */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-x-0 -top-28 pointer-events-none overflow-hidden"
        style={{ height: 220 }}
      >
        <svg className="w-full h-full" viewBox="0 0 1440 220" preserveAspectRatio="none">
          <defs>
            <linearGradient id="footerGradLarge" x1="0" x2="1">
              <stop offset="0%" stopColor="#052532" stopOpacity="0.78" />
              <stop offset="50%" stopColor="#002239" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#010917" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          <path
            d="M0,100 C250,170 480,30 720,100 C980,170 1200,60 1440,110 L1440,0 L0,0 Z"
            fill="url(#footerGradLarge)"
            className="opacity-95"
          />
        </svg>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 items-start"
        >
          {/* Brand */}
          <div className="space-y-5">
            <motion.div
              whileHover={{ scale: 1.03, rotate: 1.5 }}
              transition={{ type: "spring", stiffness: 220 }}
              className="inline-flex items-center gap-4"
            >
              <div className="w-20 h-20 rounded-xl flex items-center justify-center bg-gradient-to-br from-cyan-500 to-indigo-600 shadow-[0_12px_40px_rgba(12,76,110,0.45)] border border-white/8 overflow-hidden">
                <img
                  src="/logo.png"
                  alt="AS Innotech"
                  className="w-12 h-12 object-contain"
                />
              </div>

              <div>
                <h3 className="text-2xl md:text-3xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">
                  AS Innotech
                </h3>
                <p className="text-sm md:text-base text-gray-400 mt-1">
                  Solutions — Web • Cloud • DevOps
                </p>
              </div>
            </motion.div>

            <p className="text-base text-gray-300 max-w-md">
              We build secure, production-grade software — from resilient backend systems
              to beautiful frontends and automated cloud pipelines.
            </p>

            <div className="flex items-center gap-4 mt-3">
              <a
                href="/contact"
                className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold shadow hover:scale-105 transition"
              >
                Let's talk <ExternalLink className="w-5 h-5" />
              </a>

              <button
                onClick={copyEmail}
                className="inline-flex items-center gap-3 px-4 py-3 rounded-full border border-white/8 bg-black/20 text-sm hover:bg-white/5 transition relative"
                aria-label="Copy email"
              >
                <Mail className="w-5 h-5 text-cyan-300" />
                <span className="font-medium">{companyEmail}</span>
                {copied && (
                  <motion.span
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.18 }}
                    className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded text-sm bg-white/10"
                  >
                    Copied!
                  </motion.span>
                )}
              </button>
            </div>
          </div>

          {/* Newsletter */}
          <div className="col-span-1 md:col-span-2 flex flex-col items-center">
            <h4 className="text-cyan-300 font-semibold mb-3 text-lg md:text-xl">
              Stay in the loop
            </h4>

            <form
              onSubmit={subscribe}
              className="w-full max-w-2xl bg-gradient-to-b from-white/3 to-transparent border border-white/6 rounded-2xl px-6 py-4 shadow-inner flex gap-3"
            >
              <input
                type="email"
                aria-label="Your email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent placeholder:text-gray-400 outline-none text-sm md:text-base text-white py-3"
                required
              />
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="rounded-full px-6 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold text-sm md:text-base"
              >
                {subscribed ? "Subscribed ✓" : "Subscribe"}
              </motion.button>
            </form>

            <p className="text-xs md:text-sm text-gray-400 mt-4 max-w-2xl text-center">
              Join our newsletter for product updates, case studies and engineering tips — no spam.
            </p>
          </div>

          {/* Social & Contact Info */}
          <div className="flex flex-col items-end gap-5">
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/in/as-innotech-solutions-2a524637b"
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-full inline-flex items-center justify-center bg-white/4 border border-white/6 hover:bg-gradient-to-r hover:from-cyan-400 hover:to-blue-500 transition"
                title="LinkedIn"
              >
                <Linkedin className="w-6 h-6 text-cyan-300" />
              </a>

              <a
                href="https://github.com/asinnotechsolutions"
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-full inline-flex items-center justify-center bg-white/4 border border-white/6 hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-900 transition"
                title="GitHub"
              >
                <Github className="w-6 h-6 text-cyan-300" />
              </a>

              <a
                href="https://x.com/asinnotech"
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-full inline-flex items-center justify-center bg-white/4 border border-white/6 hover:bg-gradient-to-r hover:from-sky-400 hover:to-indigo-500 transition"
                title="Twitter"
              >
                <Twitter className="w-6 h-6 text-cyan-300" />
              </a>

              <a
                href="https://www.instagram.com/asinnotech_solutions/"
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-full inline-flex items-center justify-center bg-white/4 border border-white/6 hover:bg-gradient-to-r hover:from-pink-400 hover:to-yellow-400 transition"
                title="Instagram"
              >
                <Instagram className="w-6 h-6 text-cyan-300" />
              </a>
            </div>

            {/* Office + Numbers */}
            <div className="text-right">
              <p className="text-sm text-gray-300 font-medium">Office</p>

              {/* Location */}
              <div className="flex items-center justify-end gap-2">
                <MapPin className="w-4 h-4 text-cyan-300" />
                <p className="text-sm text-gray-400">Bhubaneswar, Odisha — India</p>
              </div>

              {/* Phone Numbers */}
              <div className="mt-3 flex flex-col items-end gap-1">
                <a
                  href="tel: +91 7606949967"
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-cyan-300 transition"
                >
                  <Phone className="w-4 h-4 text-cyan-300" /> +91 7606949967
                </a>
                <a
                  href="tel:+91 7735525279"
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-cyan-300 transition"
                >
                  <Phone className="w-4 h-4 text-cyan-300" /> +91 7735525279
                </a>
              </div>

              <a
                href="/privacy"
                className="text-sm text-gray-400 hover:text-cyan-300 inline-block mt-3 underline-offset-2"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </motion.div>

        {/* copyright */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-10 border-t border-white/6 pt-8 text-center text-sm md:text-base text-gray-400"
        >
          <p>
            © {new Date().getFullYear()} AS Innotech Solutions. All rights reserved.
            Copying of site materials is possible with the consent of the copyright holder.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
