"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BackToTop({ threshold = 300 }) {
  const [visible, setVisible] = useState(false);
  const [nearFooter, setNearFooter] = useState(false);
  const rippleRef = useRef(null);

  // show/hide based on scroll
  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > threshold);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  // detect footer presence/visibility to lift the button above it
  useEffect(() => {
    const footer = document.querySelector("footer") || document.getElementById("footer");
    if (!footer) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // when footer intersects viewport, mark nearFooter true
          setNearFooter(entry.isIntersecting);
        });
      },
      { root: null, threshold: 0, rootMargin: "0px" }
    );

    obs.observe(footer);
    return () => obs.disconnect();
  }, []);

  // inject keyframes once
  useEffect(() => {
    if (document.getElementById("back-to-top-animations")) return;
    const style = document.createElement("style");
    style.id = "back-to-top-animations";
    style.innerHTML = `
      @keyframes btt-pulse {
        0% { box-shadow: 0 6px 22px rgba(6,182,212,0.12), 0 0 0 0 rgba(6,182,212,0.06); }
        50% { box-shadow: 0 10px 40px rgba(6,182,212,0.14), 0 0 30px 6px rgba(6,182,212,0.03); }
        100% { box-shadow: 0 6px 22px rgba(6,182,212,0.12), 0 0 0 0 rgba(6,182,212,0.06); }
      }

      @keyframes btt-ripple {
        0% { transform: scale(0.2); opacity: 0.55; }
        70% { transform: scale(1.6); opacity: 0.12; }
        100% { transform: scale(1.9); opacity: 0; }
      }

      .btt-ripple {
        position: absolute;
        border-radius: 999px;
        background: rgba(255,255,255,0.12);
        pointer-events: none;
        transform-origin: center;
      }
    `;
    document.head.appendChild(style);
  }, []);

  function scrollToTop(e) {
    // ripple
    createRipple(e);

    if ("scrollBehavior" in document.documentElement.style) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      let pos = window.scrollY;
      const step = () => {
        pos -= Math.max(10, pos / 8);
        window.scrollTo(0, Math.max(0, Math.floor(pos)));
        if (pos > 0) requestAnimationFrame(step);
      };
      step();
    }
  }

  function createRipple(e) {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const span = document.createElement("span");
    span.className = "btt-ripple";
    span.style.width = `${size}px`;
    span.style.height = `${size}px`;
    span.style.left = `${x}px`;
    span.style.top = `${y}px`;
    span.style.opacity = "0.6";
    span.style.animation = "btt-ripple 700ms ease-out forwards";
    btn.appendChild(span);

    // cleanup
    setTimeout(() => {
      span.remove();
    }, 800);
  }

  // dynamic bottom offset: lift higher when near footer
  const bottomOffset = nearFooter ? 120 : 24;

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 18, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.92 }}
          transition={{ duration: 0.26, ease: "easeOut" }}
          onClick={scrollToTop}
          aria-label="Scroll to top"
          title="Back to top"
          style={{
            // position controlled by tailwind classes below + dynamic bottom offset
            bottom: `${bottomOffset}px`,
            // gradient + glass effect
            background: "linear-gradient(135deg, rgba(6,182,212,1), rgba(79,70,229,1))",
            color: "#041226",
            boxShadow:
              "0 18px 50px rgba(6,182,212,0.10), inset 0 -3px 10px rgba(255,255,255,0.06)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            border: "1px solid rgba(255,255,255,0.06)",
            animation: "btt-pulse 3.2s ease-in-out infinite",
          }}
          className="fixed right-4 sm:right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-cyan-300/40"
        >
          {/* Outer neon ring */}
          <span
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "999px",
              padding: 2,
              background:
                "linear-gradient(180deg, rgba(6,182,212,0.06), rgba(79,70,229,0.04))",
              WebkitMask:
                "-webkit-radial-gradient(white, black)",
            }}
          />

          {/* Arrow (animates on hover via tailwind classes below) */}
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
            initial={{ y: 0 }}
            whileHover={{ y: -2, rotate: -6 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative z-10 transform"
          >
            <path d="M12 19V6" stroke="#041226" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6 12l6-6 6 6" stroke="#041226" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
