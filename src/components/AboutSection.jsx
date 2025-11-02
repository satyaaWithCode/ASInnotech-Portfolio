"use client";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section className="py-24 bg-[#050f1f] relative" id="about">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 pointer-events-none" />
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-cyan-400 mb-4">Who We Are</h2>
       
       <p className="text-gray-300 leading-relaxed">
  At <span className="text-cyan-400 font-semibold">AS Innotech Solutions</span>, we deliver 
  end-to-end digital products built with innovation, quality, and performance at the core. 
  Our mission is to bridge creativity and technology — transforming ideas into scalable, secure, 
  and high-performing applications that drive business success.
</p>

<p className="mt-4 text-gray-400">
  We focus on building cutting-edge <span className="text-cyan-300 font-medium">web, cloud, and DevOps</span> 
  solutions that empower startups and enterprises to scale smarter and faster. From backend microservices 
  to modern responsive UIs, we ensure every project delivers excellence — both technically and experientially.
</p>

<p className="mt-4 text-gray-400">
  Our team consists of passionate engineers and creative problem-solvers who believe in designing 
  sustainable, future-ready solutions. We leverage technologies like <span className="text-blue-400 font-medium">
  Java, Spring Boot, React.js, Next.js, Docker, Kubernetes, and AWS</span> to craft digital ecosystems that are 
  both reliable and high-performing.
</p>

<p className="mt-4 text-gray-400">
  At AS Innotech, we don’t just build software — we build partnerships. Every product we develop is shaped 
  by collaboration, innovation, and a relentless pursuit of quality. Whether it’s optimizing workflows, 
  modernizing legacy systems, or launching new digital platforms, we make technology work smarter for you.
</p>

<p className="mt-4 text-gray-400 italic">
  “Empowering businesses through technology, creativity, and innovation — that’s what defines us.”
</p>

        </motion.div>

        <motion.div
          initial={{ x: 60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-cyan-400/10 blur-3xl rounded-3xl" />
          <img
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"
            alt="About"
            className="relative rounded-2xl shadow-lg border border-white/10"
          />
        </motion.div>
      </div>
    </section>
  );
}
