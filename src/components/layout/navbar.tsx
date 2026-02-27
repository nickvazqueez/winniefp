"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/ui/themetoggle";
import { SITE, NAV_LINKS, NAV_CTA, LOGO_IMAGE_URL, GITHUB_URL } from "@/lib/siteConfig";

export function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex h-[102px] flex-row items-center justify-between border-b border-white/[0.08] px-4 py-4 sm:px-8 lg:px-[120px]"
    >
      <div className="flex items-center gap-8 lg:gap-[80px]">
        <Link href="/" className="font-medium text-white transition-opacity hover:opacity-90">
          {LOGO_IMAGE_URL ? (
            <Image src={LOGO_IMAGE_URL} alt={SITE.name} width={134} height={25} priority />
          ) : (
            <span className="text-[15px] font-semibold uppercase tracking-[0.2em] text-white">
              {SITE.name}
            </span>
          )}
        </Link>
        <div className="hidden items-center gap-2.5 sm:flex">
          {NAV_LINKS.map((link, i) => (
            <motion.div key={link.href} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 * i }}>
              <Link
                href={link.href}
                className="px-2.5 py-1 font-medium text-white transition-colors hover:text-white/80"
                style={{ fontSize: 14, lineHeight: "22px" }}
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/10"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
        </a>
        <Link href="#dashboard" className="group">
          <motion.span
            className="inline-block rounded-lg bg-[#7b39fc] px-4 py-2 font-semibold text-[#fafafa] shadow-[0px_4px_16px_rgba(23,23,23,0.04)]"
            style={{ fontSize: 14, lineHeight: "22px" }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {NAV_CTA}
          </motion.span>
        </Link>
      </div>
    </motion.nav>
  );
}
