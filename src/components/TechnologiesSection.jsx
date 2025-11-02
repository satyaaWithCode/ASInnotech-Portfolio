"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * TechnologiesSection.jsx
 * - Responsive, stylish technology logos grid
 * - Hover animations using Framer Motion
 * - Optional marquee (auto-scrolling) featured row
 *
 * Usage:
 *  <TechnologiesSection />
 *
 * Replace `logo` urls with your own images (put them in /public/logos/ and use "/logos/xxx.png")
 */

export default function TechnologiesSection({ useMarquee = false }) {
  // curated tech list - replace `logo` values with your hosted images if you have them
const techs = [
  { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "Spring Boot", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
  { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Express", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
  { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "Postgres", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "Kubernetes", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
  { name: "AWS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg" },
  { name: "Github Actions", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
  { name: "Redis", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
  { name: "Nginx", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg" },
  { name: "Microservices", logo: "https://cdn-icons-png.flaticon.com/512/10334/10334670.png" },
  { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "React Native", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
];

  // Featured logos for marquee (simple subset)
  const featured = [
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aws/aws-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  ];

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // avoid SSR mismatch for animations
    setMounted(true);
  }, []);

  return (
    <section id="technologies" className="py-20 bg-gradient-to-b from-[#041226] to-[#02101B] text-gray-200">
      <div className="container mx-auto px-6">
        <h2 className="text-center text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-6 drop-shadow-[0_10px_30px_rgba(0,255,255,0.06)]">
          Technologies We Have Worked On
        </h2>

        <p className="text-center text-gray-300 max-w-2xl mx-auto mb-10">
          Our stack spans backend, cloud, DevOps, and frontend technologies — we choose the right tools for reliability and speed.
        </p>

        {/* marquee featured row (optional) */}
        {useMarquee && mounted && (
          <div className="mb-8">
            <div className="overflow-hidden rounded-2xl bg-[#021826]/40 p-6 border border-white/6">
              <div
                className="flex gap-10 items-center"
                style={{ animation: "tech-marquee 20s linear infinite" }}
                onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = "paused")}
                onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = "running")}
              >
                {[...featured, ...featured].map((url, i) => (
                  <div key={i} className="w-40 h-16 flex items-center justify-center flex-shrink-0">
                    <img src={url} alt={`tech-${i}`} className="max-h-12 object-contain opacity-90" loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* grid of techs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {techs.map((t, i) => (
            <motion.div
              key={t.name + i}
              whileHover={{ scale: 1.04, translateY: -6 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="flex flex-col items-center gap-3 bg-[#02151C]/40 rounded-xl p-4 border border-white/6 shadow-[0_8px_24px_rgba(2,12,23,0.4)]"
            >
              <div className="w-20 h-12 flex items-center justify-center">
                {/* prefer local logo: put file in public/logos/<lowercase-name>.svg and replace src */}
                <img
                  src={t.logo}
                  alt={t.name}
                  className="max-h-12 object-contain"
                  loading="lazy"
                  onError={(e) => {
                    // fallback to a seeded placeholder image
                    e.currentTarget.src = `https://picsum.photos/seed/${encodeURIComponent(t.name)}/240/96`;
                  }}
                />
              </div>

              <div className="text-center">
                <h4 className="text-sm font-semibold text-white">{t.name}</h4>
                <p className="text-xs text-gray-400 mt-1 hidden md:block">Trusted in production-grade projects</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes tech-marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
