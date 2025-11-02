"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-[#041226] to-[#020b17] text-gray-100 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-900/10 to-black/30 pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* --- About Header --- */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 mb-6 text-center"
        >
          About AS Innotech Solutions
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto text-center text-gray-300 leading-relaxed mb-8"
        >
          <span className="text-cyan-400 font-semibold">AS Innotech Solutions</span> is a
          next-generation software engineering and DevOps powerhouse committed to turning
          ambitious ideas into scalable, secure, and intelligent digital experiences.{" "}
          <br className="hidden sm:block" />
          Founded in{" "}
          <span className="text-cyan-300 font-semibold">February 2025</span> and headquartered in{" "}
          <span className="text-cyan-300 font-semibold">Bhubaneswar, Odisha, India</span>, our
          company is driven by innovation and excellence. We specialize in designing
          enterprise-grade systems, cloud-native architectures, and user-centric products that
          bridge creativity with cutting-edge technology. Our mission is simple — to empower
          startups and enterprises with reliable, high-performance solutions that accelerate growth,
          inspire transformation, and shape the digital future.
        </motion.p>

        {/* --- Mission / Vision --- */}
        <div className="grid md:grid-cols-2 gap-10 mt-12">
          {/* Mission */}
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-[#02101F]/70 border border-white/10 rounded-2xl p-8 shadow-[0_10px_30px_rgba(0,255,255,0.05)]"
          >
            <h3 className="text-2xl font-semibold text-cyan-300 mb-4">Our Mission</h3>
            <p className="text-gray-300 leading-relaxed">
              At <span className="text-cyan-400 font-semibold">AS Innotech Solutions</span>, we
              deliver enterprise-grade software and cloud platforms built for performance,
              resilience, and seamless user experience. Our team combines expertise in{" "}
              <span className="text-cyan-300">modern web frameworks, microservice architectures,</span>{" "}
              and <span className="text-cyan-300">automated DevOps pipelines</span> to design
              solutions that scale effortlessly and evolve with your business. From backend APIs and
              real-time systems to elegant frontends and secure deployments, we engineer every layer
              of technology to reduce operational overhead, accelerate delivery, and ensure{" "}
              <span className="text-cyan-400">lasting reliability in production environments.</span>
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-[#02101F]/70 border border-white/10 rounded-2xl p-8 shadow-[0_10px_30px_rgba(0,255,255,0.05)]"
          >
            <h3 className="text-2xl font-semibold text-cyan-300 mb-4">Our Vision</h3>
            <p className="text-gray-300 leading-relaxed mt-4">
              Our vision is to empower a digital-first world where every business — from startups to
              enterprises — thrives through innovation, automation, and user-focused design. We aim
              to redefine how software shapes progress by delivering intelligent, cloud-native
              solutions that not only perform but inspire confidence, scalability, and long-term
              impact. At <span className="text-cyan-400 font-semibold">AS Innotech Solutions</span>,
              we envision technology as more than code — it’s a catalyst for growth, creativity, and
              sustainable success.
            </p>
          </motion.div>
        </div>

        <div className="w-full border-t border-white/10 my-16" />

        {/* --- Leadership Section --- */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-3xl md:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 mb-12"
        >
          Our Leadership
        </motion.h2>

        <div className="grid sm:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* CEO */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.03 }}
            className="relative bg-[#02101F]/70 border border-white/10 p-8 rounded-2xl text-center shadow-[0_10px_30px_rgba(0,255,255,0.05)]"
          >
            <div className="mx-auto w-32 h-32 rounded-full overflow-hidden border-2 border-cyan-400/40 shadow-lg mb-5">
              <Image
                src="/images/satyabrata.png"
                alt="Satyabrata Behera"
                width={128}
                height={128}
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold text-cyan-300">Satyabrata Behera</h3>
            <p className="text-gray-400 text-sm mb-3">Founder & CEO</p>
            <p className="text-gray-300 text-sm leading-relaxed">
              A B.Tech graduate from Trident Academy of Technology, Bhubaneswar, Satyabrata is a
              backend and DevOps engineer driving the company’s architecture, microservices, and
              cloud strategy.
            </p>
          </motion.div>

          {/* CFO */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            whileHover={{ scale: 1.03 }}
            className="relative bg-[#02101F]/70 border border-white/10 p-8 rounded-2xl text-center shadow-[0_10px_30px_rgba(0,255,255,0.05)]"
          >
            <div className="mx-auto w-32 h-32 rounded-full overflow-hidden border-2 border-cyan-400/40 shadow-lg mb-5">
              <Image
                src="/images/akash.png"
                alt="Akash Jena"
                width={128}
                height={128}
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold text-cyan-300">Akash Jena</h3>
            <p className="text-gray-400 text-sm mb-3">Co-Founder & CFO</p>
            <p className="text-gray-300 text-sm leading-relaxed">
              A B.Tech graduate from Trident Academy of Technology, Bhubaneswar, Akash manages
              finance and operations, aligning business growth with sustainable strategy.
            </p>
          </motion.div>
        </div>

        {/* --- Final CTA --- */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 text-center max-w-3xl mx-auto"
        >
          <h4 className="text-2xl font-semibold text-cyan-300 mb-3">
            Innovating the future, one line of code at a time.
          </h4>
          <p className="text-gray-400 leading-relaxed mb-6">
            We build secure, maintainable, and delightful software. Let’s partner to turn your idea
            into production-ready systems.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold shadow-md hover:shadow-lg transition"
          >
            Let’s Work Together →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
