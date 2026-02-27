export const SITE = {
  name: "Winnie",
  tagline: "Emotional Intelligence Dashboard",
} as const;

export const NAV_LINKS = [
  { label: "Dashboard", href: "#dashboard" },
  { label: "Patterns", href: "#patterns" },
  { label: "Suggestions", href: "#suggestions" },
  { label: "Contact", href: "#contact" },
] as const;

export const NAV_CTA = "Start tracking";

export const HERO = {
  line1: "Observe",
  line2: "Understand",
  line3: "Your patterns.",
  subtitle:
    "A quiet space to track mood, focus, sleep, and productivity — without judgment. Notice what shapes your energy.",
  ctaPrimary: "Start tracking free",
  ctaPrimaryHref: "#dashboard",
  ctaSecondary: "See your patterns",
  ctaSecondaryHref: "#patterns",
} as const;

export const STATS = [
  { value: "7", label: "Days Logged", sublabel: "This week" },
  { value: "4.2", label: "Avg Mood", sublabel: "Out of 5" },
  { value: "82%", label: "Focus Score", sublabel: "Weekly average" },
] as const;


export const SECTION_INDICATOR = "05/05";

export const PLATFORM_SECTION = {
  title: "Decoding Emotional Patterns for Better Mental Clarity",
  description:
    "Through the application of state-of-the-art insights, winnie navigates your mood, focus, sleep, and productivity data to unravel patterns. Our platform helps you notice what shapes your energy — without judgment.",
  bullets: [
    "Mood & Energy Tracking",
    "Sleep Quality Insights",
    "Focus & Productivity Patterns",
  ] as const,
};

export const DATA_SECTION = {
  indicator: "01/02",
  title: "Your Data, Your Insights",
  stat: "0",
  statLabel: "Days to start building your clarity",
  description:
    "Track mood, focus, sleep quality, and productivity. Each entry adds a piece to your personal clarity map — observe before you judge.",
} as const;


export const LOGO_IMAGE_URL: string | null = null;

export const BACKGROUND_VIDEO_URL: string | null =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260215_121759_424f8e9c-d8bd-4974-9567-52709dfb6842.mp4";

export const BRAND_COLOR = "#7b39fc";

export const GITHUB_URL = "https://github.com/nickvazqueez";
