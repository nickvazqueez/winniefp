"use client";

import { DATA_SECTION } from "@/lib/siteConfig";

interface DataSectionProps {
  stat?: string;
}

export function DataSection({ stat }: DataSectionProps) {
  return (
    <section className="border-b border-white/[0.08] py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-8 lg:px-[120px]">
        <p className="mb-8 text-sm font-medium uppercase tracking-[0.2em] text-white/50">
          {DATA_SECTION.indicator}
        </p>
        <h2 className="mb-6 text-2xl font-semibold text-white sm:text-3xl">
          {DATA_SECTION.title}
        </h2>
        {}
        <p className="text-[48px] font-semibold tracking-tight text-white sm:text-[64px]">
          {stat ?? DATA_SECTION.stat}
        </p>
        <p className="mt-2 text-sm font-medium text-white/90">
          {DATA_SECTION.statLabel}
        </p>
        <p
          className="mt-6 max-w-[640px] opacity-90"
          style={{ fontSize: 16, lineHeight: "26px", color: "#e4e4e7" }}
        >
          {DATA_SECTION.description}
        </p>
      </div>
    </section>
  );
}
