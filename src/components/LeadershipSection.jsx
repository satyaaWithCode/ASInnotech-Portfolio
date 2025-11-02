"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function LeadershipSection() {
  const leaders = [
    {
      name: "Akash Jena",
      title: "Co-Founder & CFO",
      degree: "B.Tech — Trident Academy of Technology, Bhubaneswar",
      bio: "Strategic thinker managing financial growth and partnerships, ensuring long-term success for AS Innotech.",
      image: "/images/akash.png",
    },

       {
      name: "Satyabrata Behera",
      title: "Founder & CEO",
      degree: "B.Tech — Trident Academy of Technology, Bhubaneswar",
      bio: "A visionary backend and DevOps engineer leading innovation with modern web, cloud, and AI-driven solutions.",
      image: "/images/satyabrata.png",
    },
  ];

  return (
    <section
      id="leadership"
      className="py-24 bg-gradient-to-b from-[#041226] to-[#020b17] relative overflow-hidden"
    >
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 mb-3">
            Our Leadership
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            AS Innotech Solutions was founded by engineering graduates from{" "}
            <span className="text-cyan-400">
              Trident Academy of Technology, Bhubaneswar
            </span>. Their shared vision is to build scalable and secure digital
            ecosystems for modern businesses.
          </p>
        </motion.div>

        {/* Leadership Cards */}
        <div className="grid sm:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {leaders.map((leader, index) => (
            <motion.div
              key={leader.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{
                scale: 1.05,
                rotate: 0.8,
                transition: { type: "spring", stiffness: 200 },
              }}
              className="relative rounded-2xl bg-[#02101F]/80 border border-white/10 p-8 shadow-[0_10px_30px_rgba(0,255,255,0.05)] hover:shadow-[0_10px_40px_rgba(0,255,255,0.2)] transition-all"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden ring-2 ring-cyan-400/20 shadow-lg mb-4">
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    width={128}
                    height={128}
                    className="object-cover"
                    priority
                  />
                </div>
                <h3 className="text-xl font-semibold text-cyan-300">
                  {leader.name}
                </h3>
                <p className="text-sm text-gray-400">{leader.title}</p>
                <p className="text-xs text-gray-500 mt-2 italic">{leader.degree}</p>
                <p className="mt-3 text-sm text-gray-300 leading-relaxed max-w-sm">
                  {leader.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
