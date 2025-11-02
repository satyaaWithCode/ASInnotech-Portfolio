"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }).map(() => ({
      width: Math.random() * 5 + 2,
      height: Math.random() * 5 + 2,
      top: Math.random() * 100,
      left: Math.random() * 100,
      duration: Math.random() * 10 + 6,
      delay: Math.random() * 4,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-[90vh] sm:min-h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-gradient-to-b from-[#020b17] via-[#041a33] to-[#020b17] px-4 sm:px-6 lg:px-8"
    >
      {/* Background image */}
      <img
        src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1920&q=80"
        alt="Futuristic tech workspace"
        className="absolute inset-0 w-full h-full object-cover opacity-10"
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <svg
          className="absolute w-full h-full opacity-[0.07]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="#00ffff"
                strokeWidth="0.3"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90" />

      {/* Main Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 w-full max-w-5xl mx-auto"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 drop-shadow-[0_0_15px_rgba(0,255,255,0.3)] leading-snug sm:leading-tight px-2">
          Empowering the Future of Innovation
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-5 text-gray-300 max-w-3xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed px-3"
        >
          At <span className="text-cyan-400 font-semibold">AS Innotech</span>,
          we craft intelligent, scalable, and secure digital solutions that bridge
          imagination and engineering. From cloud-native architectures to modern web
          platforms, we help businesses innovate with confidence and build technology
          that defines tomorrow.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center items-center gap-4 flex-wrap px-2"
        >
          <a
            href="/portfolio"
            className="w-full sm:w-auto px-8 py-3 text-sm sm:text-base bg-gradient-to-r from-cyan-400 to-blue-500 text-dark font-semibold rounded-full shadow-lg hover:shadow-cyan-400/30 hover:scale-105 transition-all text-center"
          >
            Discover Our Solutions
          </a>

          <a
            href="/contact"
            className="w-full sm:w-auto px-8 py-3 text-sm sm:text-base border border-cyan-400 text-cyan-400 rounded-full hover:bg-cyan-400 hover:text-dark transition-all text-center"
          >
            Join Our Community
          </a>
        </motion.div>
      </motion.div>

      {/* Floating particles */}
      <div className="absolute w-full h-full overflow-hidden">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute bg-cyan-400 rounded-full"
            style={{
              width: `${p.width}px`,
              height: `${p.height}px`,
              top: `${p.top}%`,
              left: `${p.left}%`,
            }}
            animate={{
              y: ["0%", "-30%", "0%"],
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
            }}
          />
        ))}
      </div>
    </section>
  );
}
