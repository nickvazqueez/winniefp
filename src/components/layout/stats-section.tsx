"use client";

import { motion } from "framer-motion";
import { STATS, SECTION_INDICATOR } from "@/lib/siteConfig";

interface StatsSectionProps {
  stats?: Array<{ value: string; label: string; sublabel?: string }>;
}

export function StatsSection({ stats = [...STATS] }: StatsSectionProps) {
  return (
    <section className="border-b border-white/[0.08] py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-8 lg:px-[120px]">
        {}
        <p className="mb-8 text-sm font-medium uppercase tracking-[0.2em] text-white/50">
          {SECTION_INDICATOR}
        </p>

        {}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              whileHover={{ y: -4 }}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-colors hover:bg-white/[0.04]"
            >
              <p className="text-[40px] font-semibold tracking-tight text-white sm:text-[48px] lg:text-[56px]">
                {stat.value}
              </p>
              <p className="mt-2 text-sm font-medium text-white/90">
                {stat.label}
              </p>
              {stat.sublabel && (
                <p className="mt-1 text-xs text-white/50">{stat.sublabel}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
