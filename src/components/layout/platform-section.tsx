"use client";

import { motion } from "framer-motion";
import { PLATFORM_SECTION } from "@/lib/siteConfig";

export function PlatformSection() {
  return (
    <section className="border-b border-white/[0.08] py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-8 lg:px-[120px]">
        <h2 className="mb-6 text-2xl font-semibold text-white sm:text-3xl">
          {PLATFORM_SECTION.title}
        </h2>
        <p
          className="mb-10 max-w-[720px] opacity-90"
          style={{ fontSize: 18, lineHeight: "28px", color: "#f6f7f9" }}
        >
          {PLATFORM_SECTION.description}
        </p>
        {/* Bullets – edite em siteConfig */}
        <ul className="flex flex-wrap gap-4">
          {PLATFORM_SECTION.bullets.map((bullet, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ x: 4 }}
              className="flex cursor-default items-center gap-2 text-white/90 before:size-1.5 before:rounded-full before:bg-[#7b39fc]"
            >
              {bullet}
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
