"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * IndustriesSection.jsx
 * - Shows a grid of industries
 * - Each card fetches a small illustrative image from picsum
 * - Replace with your own images or icons for production
 */

const BASE = "https://picsum.photos/seed";

const industriesSeed = [
  { title: "Banking", seed: "banking" },
  { title: "Telecom", seed: "telecom" },
  { title: "Life Sciences & Pharma", seed: "pharma" },
  { title: "Healthcare", seed: "healthcare" },
  { title: "Financial Services", seed: "financial" },
  { title: "Retail", seed: "retail" },
  { title: "Travel", seed: "travel" },
  { title: "Insurance", seed: "insurance" },
  { title: "Manufacturing", seed: "manufacturing" },
  { title: "Energy & Utilities", seed: "energy" },
    { title: "Cloud & DevOps", seed: "cloud-devops" },
  { title: "AI & Machine Learning", seed: "ai-ml" },
];

export default function IndustriesSection() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // generate image URLs from seed quickly (no external fetch required)
    const arr = industriesSeed.map((it, i) => ({
      ...it,
      img: `${BASE}/${encodeURIComponent(it.seed)}/400/240`,
      id: `ind-${i}`,
    }));

    // small delay to give loading skeleton feel (remove in production)
    const t = setTimeout(() => {
      setItems(arr);
      setLoading(false);
    }, 450);

    return () => clearTimeout(t);
  }, []);

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center text-3xl md:text-4xl font-extrabold text-white mb-8"
        >
          Industries we cater to
        </motion.h2>

        <div className="bg-gradient-to-r from-blue-900/80 to-cyan-900/80 rounded-2xl p-6 shadow-xl border border-cyan-500/10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {loading
              ? Array.from({ length: industriesSeed.length }).map((_, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-xl border border-white/6 bg-white/2 animate-pulse h-36"
                  />
                ))
              : items.map((it, idx) => (
                  <motion.div
                    key={it.id}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ scale: 1.03 }}
                    className="rounded-xl overflow-hidden bg-[#02111A]/60 border border-white/6 shadow-sm"
                  >
                    <div className="flex items-stretch gap-0">
                      <div className="w-32 flex-shrink-0 bg-gradient-to-br from-cyan-700/10 to-blue-900/10 p-4 flex items-center justify-center">
                        <img
                          src={it.img}
                          alt={it.title}
                          className="w-full h-20 object-cover rounded"
                          loading="lazy"
                        />
                      </div>

                      <div className="p-4 flex-1">
                        <h4 className="text-white font-semibold mb-1">{it.title}</h4>
                        <p className="text-sm text-gray-300">
                          Solutions and services for {it.title.toLowerCase()} — strategy,
                          implementation, and managed engineering.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
          </div>
        </div>
      </div>
    </section>
  );
}
