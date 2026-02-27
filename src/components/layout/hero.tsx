"use client";

import Link from "next/link";
import { HERO } from "@/lib/siteConfig";

export function Hero() {
  return (
    <div className="mx-auto mt-20 flex max-w-[900px] flex-col items-center px-4 pb-16 text-center sm:mt-24">
      {}
      <h1 className="mb-6 flex flex-col gap-2">
        <span className="font-inter text-[48px] font-medium leading-[1.1] tracking-[-0.02em] text-white sm:text-[64px] lg:text-[76px]">
          {HERO.line1}
        </span>
        <span className="font-inter text-[48px] font-medium leading-[1.1] tracking-[-0.02em] text-white sm:text-[64px] lg:text-[76px]">
          {HERO.line2}
        </span>
        <span className="font-instrument-serif text-[48px] italic leading-[1.1] tracking-[-0.02em] text-white sm:text-[64px] lg:text-[76px]">
          {HERO.line3}
        </span>
      </h1>

      {}
      <p
        className="mb-8 max-w-[613px] opacity-90"
        style={{ fontSize: 18, lineHeight: "26px", color: "#f6f7f9" }}
      >
        {HERO.subtitle}
      </p>

      {}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          href={HERO.ctaPrimaryHref}
          className="rounded-[10px] bg-[#7b39fc] px-6 py-3.5 font-medium text-white transition-opacity hover:opacity-90"
          style={{ fontSize: 16, lineHeight: 1.7 }}
        >
          {HERO.ctaPrimary}
        </Link>
        <Link
          href={HERO.ctaSecondaryHref}
          className="rounded-[10px] border border-white/20 bg-white/5 px-6 py-3.5 font-medium text-[#f6f7f9] transition-opacity hover:bg-white/10"
          style={{ fontSize: 16, lineHeight: 1.7 }}
        >
          {HERO.ctaSecondary}
        </Link>
      </div>
    </div>
  );
}
