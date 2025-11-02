"use client";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Books Finder",
    tag: "Modern Book Search App",
    img: "/images/booksfinder.png",
    link: "https://942p45-5173.csb.app/",
  },
  {
    title: "Weather Now",
    tag: "Real-Time Weather Experience",
    img: "/images/weather-now.png",
    link: "https://qk5nwq-5173.csb.app/",
  },
  {
    title: "CodeBloom LMS",
    tag: "Smart Learning Management Platform",
    img: "/images/codebloom.png",
    link: "https://satyaa-lms-app.netlify.app/",
  },
  {
    title: "Dishcovery Recipe App",
    tag: "AI-Powered Food Search & Discovery",
    img: "/images/dishcovery.png",
    link: "https://6906516ad20c4af625320a45--dishcovery-recipe.netlify.app/",
  },
  {
    title: "Earthquake Visualizer Dashboard",
    tag: "Interactive Real-Time Seismic Data Visualization",
    img: "/images/earthquake-visualizer.png",
    link: "https://690655a06c45b1f839663099--earthquake-visualizer-dashboard.netlify.app/",
  },
  {
    title: "Satyaa PG Web App",
    tag: "Property Management & PG Booking Platform",
    img: "/images/satyaa-pg.png",
    link: "https://satyaa-pg.netlify.app/",
  },
];

export default function PortfolioSection() {
  return (
    <section
      className="py-24 bg-gradient-to-b from-[#041226] via-[#020b17] to-[#020b17]"
      id="work"
    >
      <div className="container mx-auto px-6">
        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-extrabold text-center mb-14 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 drop-shadow-[0_0_15px_rgba(0,255,255,0.3)]"
        >
          Our Work & Solutions
        </motion.h2>

        {/* Project Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((p, i) => (
            <motion.a
              key={i}
              href={p.link}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.7 }}
              whileHover={{ scale: 1.05 }}
              className="group relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#071a33] to-[#0a1f3f] border border-cyan-400/10 hover:border-cyan-400/40 shadow-[0_0_20px_rgba(0,255,255,0.08)] hover:shadow-[0_0_35px_rgba(0,255,255,0.25)] transition-all duration-500 cursor-pointer"
            >
              {/* Project Image */}
              <div className="relative">
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-56 object-cover opacity-90 group-hover:opacity-100 transition-all duration-500"
                />

                {/* Overlay Glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-70 transition-all duration-500"></div>

                {/* Shine Animation */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 rotate-45"
                  animate={{ x: ["-200%", "200%"] }}
                  transition={{
                    repeat: Infinity,
                    duration: 3.5,
                    ease: "easeInOut",
                  }}
                />
              </div>

              {/* Project Info */}
              <div className="relative z-10 p-6 text-center">
                <p className="text-sm text-cyan-400 mb-1">{p.tag}</p>
                <h3 className="text-xl font-bold text-white mb-3">{p.title}</h3>
                <motion.span
                  whileHover={{ x: 4 }}
                  className="inline-flex items-center gap-1 text-cyan-300 text-sm font-medium group-hover:text-cyan-400 transition"
                >
                  View Project →  
                </motion.span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
