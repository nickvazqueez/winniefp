"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { HERO } from "@/lib/siteConfig";

export function TypingHero() {
  const [displayText, setDisplayText] = useState("");
  const typingSpeed = 60;

  useEffect(() => {
    const text = `${HERO.line1} ${HERO.line2} ${HERO.line3}`;
    let i = 0;
    const timer = setInterval(() => {
      if (i <= text.length) {
        setDisplayText(text.slice(0, i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, typingSpeed);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto mt-20 flex max-w-[900px] flex-col items-center px-4 pb-16 text-center sm:mt-24"
    >
      <h1 className="mb-6 min-h-[4.5rem] font-inter text-[48px] font-medium leading-[1.1] tracking-[-0.02em] text-white sm:text-[64px] lg:text-[76px]">
        <span className="inline">
          {displayText}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.6, repeat: Infinity }}
            className="ml-0.5 inline-block h-[0.9em] w-0.5 bg-white align-text-bottom"
          />
        </span>
      </h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mb-8 max-w-[613px] opacity-90"
        style={{ fontSize: 18, lineHeight: "26px", color: "#f6f7f9" }}
      >
        {HERO.subtitle}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="flex flex-wrap items-center justify-center gap-4"
      >
        <Link href={HERO.ctaPrimaryHref} className="group">
          <motion.span
            className="inline-flex rounded-[10px] bg-[#7b39fc] px-6 py-3.5 font-medium text-white"
            style={{ fontSize: 16, lineHeight: 1.7 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            {HERO.ctaPrimary}
          </motion.span>
        </Link>
        <Link href={HERO.ctaSecondaryHref} className="group">
          <motion.span
            className="inline-flex rounded-[10px] border border-white/20 bg-white/5 px-6 py-3.5 font-medium text-[#f6f7f9]"
            style={{ fontSize: 16, lineHeight: 1.7 }}
            whileHover={{ scale: 1.04, backgroundColor: "rgba(255,255,255,0.1)" }}
            whileTap={{ scale: 0.96 }}
          >
            {HERO.ctaSecondary}
          </motion.span>
        </Link>
      </motion.div>
    </motion.div>
  );
}
