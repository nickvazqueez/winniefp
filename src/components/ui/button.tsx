/**
 * Button – botão reutilizável (primary, ghost).
 * Usa transições CSS para evitar conflito Framer Motion + HTML attributes.
 */
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "ghost";
  loading?: boolean;
}

export function Button({ children, variant = "primary", loading, className, ...rest }: ButtonProps) {
  const base =
    "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/80 disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.96] hover:scale-[1.02]";

  const styles =
    variant === "primary"
      ? "bg-accent-600 text-white hover:bg-accent-500"
      : "border border-white/10 bg-white/5 text-slate-100 hover:bg-white/10";

  return (
    <button
      className={`${base} ${styles} ${className ?? ""}`}
      disabled={loading}
      {...rest}
    >
      {loading && (
        <span className="h-3 w-3 animate-spin rounded-full border-2 border-white/30 border-t-transparent" />
      )}
      {children}
    </button>
  );
}
