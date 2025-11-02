"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Code,
  Database,
  Cloud,
  ShieldCheck,
  Cpu,
  Layers,
  Globe,
  Lock,
  Github,
  Linkedin,
  Twitter,
  Mail,
  Briefcase,
} from "lucide-react";

export default function ServicesSection() {
  const services = [
    {
      title: "Java & Spring Boot Development",
      description:
        "High-performance backend systems using Java, Spring Boot, and Microservices with a focus on scalability and maintainability.",
      icon: <Code className="w-10 sm:w-12 h-10 sm:h-12" />,
      gradient: "from-cyan-600/10 to-blue-800/6",
      color: "text-cyan-300",
      query: "Java Spring Boot microservices tech stack",
    },
    {
      title: "Microservices & Kafka Integration",
      description:
        "Resilient, event-driven architectures with Apache Kafka, Docker, and Kubernetes for distributed, real-time applications.",
      icon: <Layers className="w-10 sm:w-12 h-10 sm:h-12" />,
      gradient: "from-purple-700/8 to-violet-700/8",
      color: "text-violet-300",
      query: "microservices kafka kubernetes docker tech stack",
    },
    {
      title: "Cloud & DevOps Automation",
      description:
        "AWS, Azure, and CI/CD pipelines with Docker, Jenkins, and GitHub Actions — automating scalable cloud deployments.",
      icon: <Cloud className="w-10 sm:w-12 h-10 sm:h-12" />,
      gradient: "from-sky-600/8 to-indigo-800/6",
      color: "text-blue-300",
      query: "cloud devops ci cd aws azure docker tech stack",
    },
    {
      title: "React & Next.js Frontend Engineering",
      description:
        "Modern, responsive, and lightning-fast frontends using React.js, Next.js, and Tailwind CSS with pixel-perfect UI/UX.",
      icon: <Globe className="w-10 sm:w-12 h-10 sm:h-12" />,
      gradient: "from-cyan-500/8 to-sky-700/6",
      color: "text-sky-300",
      query: "react next.js tailwind frontend tech stack",
    },
    {
      title: "Database & API Design",
      description:
        "Optimized database design with MongoDB, MySQL, and RESTful APIs ensuring seamless communication and performance.",
      icon: <Database className="w-10 sm:w-12 h-10 sm:h-12" />,
      gradient: "from-emerald-600/8 to-green-800/6",
      color: "text-emerald-300",
      query: "mongodb mysql rest api design best practices",
    },
    {
      title: "Security & Authentication",
      description:
        "Enterprise-grade authentication using JWT, OAuth2, Okta, and Spring Security with role-based access control.",
      icon: <ShieldCheck className="w-10 sm:w-12 h-10 sm:h-12" />,
      gradient: "from-rose-600/8 to-pink-800/6",
      color: "text-rose-300",
      query: "jwt oauth2 okta spring security best practices",
    },
    {
      title: "Performance Optimization",
      description:
        "Profiling, caching, and monitoring systems using Spring Actuator, Redis, and Prometheus to achieve peak performance.",
      icon: <Cpu className="w-10 sm:w-12 h-10 sm:h-12" />,
      gradient: "from-yellow-600/8 to-orange-800/6",
      color: "text-amber-300",
      query: "performance optimization spring actuator redis prometheus",
    },
    {
      title: "API Gateway & Secure Communication",
      description:
        "Spring Cloud Gateway, WebFlux, and secure API routing with JWT validation for reactive and high-performance systems.",
      icon: <Lock className="w-10 sm:w-12 h-10 sm:h-12" />,
      gradient: "from-teal-600/8 to-cyan-800/6",
      color: "text-teal-300",
      query: "spring cloud gateway webflux api gateway best practices",
    },
    {
      title: "Freelancing & Remote Project Collaboration",
      description:
        "End-to-end software development for startups and businesses — full-stack freelancing solutions with clear communication and milestone delivery.",
      icon: <Briefcase className="w-10 sm:w-12 h-10 sm:h-12" />,
      gradient: "from-teal-600/10 to-emerald-700/10",
      color: "text-emerald-300",
      query:
        "freelance full stack developer remote project collaboration software development",
    },
  ];

  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText("asinnotechsolutions@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  }

  function openGoogleSearch(q) {
    window.open(`https://www.google.com/search?q=${encodeURIComponent(q)}`, "_blank");
  }

  return (
    <section
      id="services"
      className="py-20 sm:py-24 bg-gradient-to-b from-[#041a33] via-[#020b17] to-[#020b17] text-gray-100"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center text-3xl sm:text-4xl md:text-5xl font-extrabold mb-10 sm:mb-12 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500"
        >
          Our Expertise & Services
        </motion.h2>

        {/* Responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{
                scale: 1.04,
                rotate: 0.5,
                transition: { type: "spring", stiffness: 180 },
              }}
              className="relative rounded-2xl overflow-hidden group"
            >
              <div
                className={`relative p-6 sm:p-8 rounded-2xl border border-white/6 bg-gradient-to-br ${service.gradient} shadow-[inset_0_-30px_60px_rgba(0,0,0,0.6)]`}
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 flex items-center justify-center rounded-lg bg-black/20 border border-white/6">
                  <div className={`${service.color}`}>{service.icon}</div>
                </div>

                <h3
                  className={`text-lg sm:text-xl font-semibold text-center mb-2 ${service.color}`}
                >
                  {service.title}
                </h3>

                <p className="text-sm sm:text-base text-gray-300 text-center mb-4 leading-relaxed">
                  {service.description}
                </p>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
                  <motion.button
                    onClick={() => openGoogleSearch(service.query)}
                    whileHover={{ x: 6 }}
                    className="px-5 py-2.5 rounded-full text-black bg-gradient-to-r from-cyan-400 to-blue-500 font-semibold text-sm sm:text-base shadow-lg w-full sm:w-auto"
                  >
                    Learn more →
                  </motion.button>
                  <a
                    href="#contact"
                    className="text-xs sm:text-sm text-gray-300 hover:underline"
                  >
                    Contact us
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom contact/social row */}
        <div className="mt-12 sm:mt-16 pt-10 border-t border-white/5">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              <p className="text-sm sm:text-base text-gray-100">Connect with us:</p>
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href="https://www.linkedin.com/in/as-innotech-solutions-2a524637b"
                  target="_blank"
                  rel="noreferrer"
                  className="group w-9 sm:w-10 h-9 sm:h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-gradient-to-r hover:from-cyan-400 hover:to-blue-500 transition"
                >
                  <Linkedin className="w-4 sm:w-5 h-4 sm:h-5 text-cyan-300 group-hover:text-white" />
                </a>
                <a
                  href="https://github.com/asinnotechsolutions"
                  target="_blank"
                  rel="noreferrer"
                  className="group w-9 sm:w-10 h-9 sm:h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-900 transition"
                >
                  <Github className="w-4 sm:w-5 h-4 sm:h-5 text-cyan-300 group-hover:text-white" />
                </a>
                <a
                  href="https://x.com/asinnotech"
                  target="_blank"
                  rel="noreferrer"
                  className="group w-9 sm:w-10 h-9 sm:h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-gradient-to-r hover:from-sky-400 hover:to-indigo-500 transition"
                >
                  <Twitter className="w-4 sm:w-5 h-4 sm:h-5 text-cyan-300 group-hover:text-white" />
                </a>

                <button
                  onClick={copyEmail}
                  className="group relative inline-flex items-center gap-2 px-3 py-2 border rounded-full bg-white/5 border-white/10 hover:bg-white/10 transition text-xs sm:text-sm"
                >
                  <Mail className="w-4 h-4 text-cyan-300 group-hover:text-white" />
                  <span className="truncate max-w-[140px] sm:max-w-none text-gray-200">
                    asinnotechsolutions@gmail.com
                  </span>
                  {copied && (
                    <motion.span
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-black/80 text-xs text-white"
                    >
                      Copied!
                    </motion.span>
                  )}
                </button>
              </div>
            </div>

            <div className="text-xs sm:text-sm text-gray-400">
              <span className="block">Want a quick chat?</span>
              <a
                href="/contact"
                className="inline-block mt-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold shadow hover:scale-105 transition"
              >
                Schedule a call
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
