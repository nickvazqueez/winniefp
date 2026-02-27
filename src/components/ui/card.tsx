/**
 * Card – container com borda e glow no hover.
 * Altere: cores do glow, blur, borda em className.
 */
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ transition: { duration: 0.2 } }}
      className={`group rounded-2xl border border-white/[0.08] bg-white/[0.04] p-4 backdrop-blur-xl sm:p-5 ring-1 ring-white/5 hover:ring-white/10 hover:shadow-[0_0_40px_-8px_rgba(123,57,252,0.3)] transition-all duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
}