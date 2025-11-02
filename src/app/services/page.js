"use client";

import { motion } from "framer-motion";

export default function ServicesSection() {
  const services = [
    {
      title: "Web App Development",
      desc:
        "Responsive, high-performance, and SEO-friendly web applications built using React.js, Next.js, and TypeScript with stunning UI/UX design.",
      tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      color: "from-cyan-500/10 to-blue-800/10",
    },
    {
      title: "Backend APIs",
      desc:
        "Robust and scalable REST & GraphQL APIs powered by Node.js, Express, MongoDB, or Spring Boot — designed for high availability.",
      tech: ["Node.js", "Express", "MongoDB", "Spring Boot"],
      color: "from-green-500/10 to-emerald-800/10",
    },
    {
      title: "Cloud & DevOps",
      desc:
        "Cloud-native deployments using Docker, Kubernetes, Terraform, and AWS. CI/CD automation with Jenkins & GitHub Actions.",
      tech: ["AWS", "Docker", "Kubernetes", "Terraform"],
      color: "from-sky-500/10 to-indigo-800/10",
    },
    {
      title: "Microservices & Kafka",
      desc:
        "Reactive, distributed systems with Kafka, WebFlux, gRPC, and resilient microservice communication for modern cloud architecture.",
      tech: ["Kafka", "WebFlux", "gRPC", "Spring Cloud"],
      color: "from-purple-600/10 to-violet-800/10",
    },
    {
      title: "Security & Auth",
      desc:
        "Enterprise-grade authentication and authorization using JWT, OAuth2, Okta, and Spring Security with role-based access control.",
      tech: ["JWT", "OAuth2", "Okta", "Spring Security"],
      color: "from-rose-600/10 to-pink-900/10",
    },
    {
      title: "Performance & Monitoring",
      desc:
        "Optimization with Redis, Prometheus, Grafana, and advanced caching for maximum speed and system observability.",
      tech: ["Redis", "Prometheus", "Grafana", "Nginx"],
      color: "from-yellow-500/10 to-orange-900/10",
    },
    {
      title: "Freelancing & Collaboration",
      desc:
        "End-to-end software development for startups — project-based freelancing, clear communication, and milestone delivery.",
      tech: ["Remote", "Full-stack", "PM Tools", "Agile"],
      color: "from-teal-500/10 to-cyan-800/10",
    },
    {
      title: "API Gateway & Secure Routing",
      desc:
        "Secure API routing with Spring Cloud Gateway, JWT validation, throttling, and real-time WebSocket management.",
      tech: ["Spring Cloud", "JWT", "API Gateway", "WebSocket"],
      color: "from-cyan-700/10 to-blue-900/10",
    },
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-[#041226] to-[#020b17] text-gray-100 overflow-hidden">
      {/* floating gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-900/10 to-black/40 pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 mb-12"
        >
          Our Services
        </motion.h1>

        {/* Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{
                scale: 1.05,
                rotate: 0.5,
                boxShadow: "0 0 30px rgba(6,182,212,0.3)",
              }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
              }}
              className={`relative p-6 rounded-2xl border border-white/10 bg-gradient-to-br ${s.color} hover:border-cyan-400/30 transition-all duration-500 group shadow-[0_10px_30px_rgba(0,0,0,0.4)]`}
            >
              {/* Animated border glow */}
              <motion.div
                className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-cyan-400/20 to-blue-500/20 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500"
              ></motion.div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-xl font-semibold text-cyan-300 mb-2">
                  {s.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  {s.desc}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {s.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] px-2 py-1 bg-white/5 border border-white/10 rounded-full text-gray-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Learn More */}
                <motion.a
                  href="https://www.google.com/search?q=AS+Innotech+Solutions"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{
                    x: 5,
                    boxShadow: "0 4px 15px rgba(6,182,212,0.4)",
                  }}
                  className="inline-block mt-5 text-sm font-semibold text-cyan-300 hover:text-cyan-200"
                >
                  Learn more →
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-16 text-center"
        >
          <h2 className="text-2xl font-semibold text-cyan-300 mb-4">
            Need something custom?
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-6">
            We provide tailored software solutions — whether it's a full-stack application,
            automation setup, or DevOps optimization. Let's collaborate and bring your idea to life.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold shadow-lg hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] transition"
          >
            Get in Touch →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
