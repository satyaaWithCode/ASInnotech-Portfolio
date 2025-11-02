"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

/**
 * TrustedBy.jsx
 * - Fetches partner images from picsum and shows a horizontal auto-scroll carousel
 * - Replace picsum URLs with your real partner logos when available
 */

export default function TrustedBy({ count = 8 }) {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const trackRef = useRef(null);

  useEffect(() => {
    async function fetchLogos() {
      try {
        const res = await fetch(`https://picsum.photos/v2/list?limit=${count}`);
        const data = await res.json();
        // map to usable small images
        const logos = data.map((item, i) => ({
          id: item.id,
          url: `https://picsum.photos/id/${item.id}/300/90`, // fixed size logo-like image
          alt: item.author || `Partner ${i + 1}`,
        }));
        setPartners(logos);
      } catch (e) {
        // fallback: generate placeholder seeds
        const logos = Array.from({ length: count }).map((_, i) => ({
          id: `p-${i}`,
          url: `https://picsum.photos/seed/partner-${i}/300/90`,
          alt: `Partner ${i + 1}`,
        }));
        setPartners(logos);
      } finally {
        setLoading(false);
      }
    }
    fetchLogos();
  }, [count]);

  // marquee animation with CSS keyframes handled by tailwind utilities below
  return (
    <section className="py-12">
      <div className="container mx-auto px-6">
        <h3 className="text-center text-2xl md:text-3xl font-bold text-white mb-6">
          Trusted By
        </h3>

        <div className="relative">
          <div className="mx-auto max-w-5xl">
            <div className="rounded-2xl bg-[#031827]/50 p-6 border border-white/6">
              {loading ? (
                <div className="flex items-center justify-between gap-4">
                  {Array.from({ length: count }).map((_, i) => (
                    <div
                      key={i}
                      className="h-10 w-36 bg-gradient-to-r from-white/6 to-white/3 rounded animate-pulse"
                    />
                  ))}
                </div>
              ) : (
                // marquee wrapper
                <div
                  className="overflow-hidden"
                  onMouseEnter={() => (trackRef.current.style.animationPlayState = "paused")}
                  onMouseLeave={() => (trackRef.current.style.animationPlayState = "running")}
                >
                  <div
                    ref={trackRef}
                    className="flex gap-8 items-center"
                    style={{
                      // CSS marquee using animation role; repeats images twice for seamless loop
                      animation: "marquee 18s linear infinite",
                    }}
                  >
                    {/* duplicate sequence to make a seamless loop */}
                    {[...partners, ...partners].map((p, idx) => (
                      <div
                        key={`${p.id}-${idx}`}
                        className="flex-shrink-0 w-36 h-12 flex items-center justify-center"
                      >
                        <img
                          src={p.url}
                          alt={p.alt}
                          className="max-w-full max-h-12 object-contain opacity-90 hover:opacity-100 transition"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* marquee keyframes (scoped) */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
