"use client";

import { motion } from "framer-motion";

/**
 * Portfolio Section — AS Innotech Solutions
 * Responsive grid, tilt on desktop, polished CTA band placed lower.
 */

export default function PortfolioSection() {
  const projects = [
    {
      title: "Books Finder",
      tag: "Modern Book Search App",
      img: "/images/booksfinder.png",
      url: "https://942p45-5173.csb.app/",
    },
    {
      title: "Weather Now",
      tag: "Real-Time Weather Experience",
      img: "/images/weather-now.png",
      url: "https://qk5nwq-5173.csb.app/",
    },
    {
      title: "CodeBloom LMS",
      tag: "Smart Learning Management Platform",
      img: "/images/codebloom.png",
      url: "https://satyaa-lms-app.netlify.app/",
    },
    {
      title: "Dishcovery Recipe App",
      tag: "AI-Powered Food Search & Discovery",
      img: "/images/dishcovery.png",
      url: "https://6906516ad20c4af625320a45--dishcovery-recipe.netlify.app/",
    },
    {
      title: "Earthquake Visualizer Dashboard",
      tag: "Interactive Real-Time Seismic Visualization",
      img: "/images/earthquake-visualizer.png",
      url: "https://690655a06c45b1f839663099--earthquake-visualizer-dashboard.netlify.app/",
    },
    {
      title: "Satyaa PG Web App",
      tag: "Property Management & PG Booking Platform",
      img: "/images/satyaa-pg.png",
      url: "https://satyaa-pg.netlify.app/",
    },
  ];

  // Mouse tilt helper (desktop pointers). Safe no-op on touch devices.
  const handlePointer = (e, card) => {
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = (y / rect.height - 0.5) * -8;
    const rotateY = (x / rect.width - 0.5) * 10;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    card.style.transition = "transform 0.08s linear";
  };

  return (
    <section
      id="portfolio"
      className="py-20 md:py-24 pb-36 bg-gradient-to-b from-[#041226] to-[#020b17] text-gray-100 overflow-hidden"
    >
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-extrabold mb-6 md:mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400"
        >
          Our Work & Solutions
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-center text-gray-400 max-w-3xl mx-auto mb-10 md:mb-12"
        >
          Explore some of our latest client and in-house projects — modern, responsive,
          and production-ready digital solutions built with care.
        </motion.p>

        {/* Projects Grid */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {projects.map((p) => (
            <motion.article
              key={p.title}
              variants={{
                hidden: { opacity: 0, y: 28 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
              }}
              className="group relative rounded-2xl overflow-hidden border border-white/8 bg-gradient-to-br from-[#071a2d]/80 to-[#020b17]/60 shadow-[0_10px_40px_rgba(0,0,0,0.6)] transition-all duration-300"
              onPointerMove={(e) => {
                // Only enable tilt on pointer devices (desktop). Touch devices will ignore.
                if (e.pointerType === "mouse" || e.pointerType === "pen") {
                  handlePointer(e, e.currentTarget);
                }
              }}
              onPointerLeave={(e) => {
                e.currentTarget.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
                e.currentTarget.style.transition = "transform 0.6s cubic-bezier(0.16,1,0.3,1)";
              }}
            >
              {/* Image area (responsive) */}
              <div className="relative h-44 sm:h-52 md:h-56 lg:h-64 overflow-hidden">
                <motion.img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-full object-cover brightness-90 group-hover:brightness-100 transition-all duration-500"
                  whileHover={{ scale: 1.04 }}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute -bottom-6 -right-6 w-36 h-36 rounded-full bg-cyan-600/6 blur-3xl pointer-events-none" />
              </div>

              {/* Content */}
              <div className="p-5 md:p-6 relative z-10">
                <p className="text-xs md:text-sm text-cyan-300 font-semibold">{p.tag}</p>
                <h3 className="text-lg md:text-xl font-bold text-white mt-2">{p.title}</h3>

                <p className="text-sm text-gray-300 mt-3 leading-relaxed min-h-[3.1rem]">
                  A modern {p.tag.toLowerCase()} crafted with robust architecture, strong UX,
                  and production-ready deployment patterns.
                </p>

                <div className="mt-5 flex flex-col sm:flex-row items-center sm:justify-between gap-3">
                  <motion.a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 6, boxShadow: "0 10px 30px rgba(6,182,212,0.18)" }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black text-sm font-semibold shadow-md"
                  >
                    View Project →
                  </motion.a>

                  <div className="flex items-center gap-4">
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-gray-400 hover:text-cyan-300 transition"
                    >
                      Live Demo
                    </a>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-gray-400 hover:text-cyan-300 transition hidden md:inline"
                    >
                      Open
                    </a>
                  </div>
                </div>
              </div>

              {/* Hover glow overlay */}
              <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.45 }}
                style={{
                  background:
                    "linear-gradient(120deg, rgba(6,182,212,0.06), rgba(59,130,246,0.04), rgba(147,51,234,0.04))",
                  mixBlendMode: "screen",
                }}
              />
            </motion.article>
          ))}
        </motion.div>

        {/* ===== CTA BAND (moved lower, responsive) ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-12 md:mt-16 lg:mt-20 text-center"
        >
          <div className="mx-auto max-w-xl bg-gradient-to-b from-[#041a2a]/20 to-transparent rounded-2xl px-6 py-8 md:py-10 shadow-inner">
            <h3 className="text-lg md:text-xl font-semibold text-cyan-300 mb-2">
              Have a project in mind?
            </h3>
            <p className="text-gray-400 max-w-xl mx-auto mb-6">
              Whether you’re a startup or an enterprise, we can help design, build, and deploy
              production-ready applications — crafted for scalability, speed, and success.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold shadow-lg hover:scale-105 transition"
            >
              Let’s Collaborate →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
