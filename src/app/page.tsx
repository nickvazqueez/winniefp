"use client";

import { useState, useEffect, useMemo } from "react";
import { Navbar } from "@/components/layout/navbar";
import { TypingHero } from "@/components/layout/typing-hero";
import { StatsSection } from "@/components/layout/stats-section";
import { PlatformSection } from "@/components/layout/platform-section";
import { DataSection } from "@/components/layout/data-section";
import { ThemeToggle } from "@/components/ui/themetoggle";
import { AnimatedSection } from "@/components/ui/animated-section";
import { MoodForm } from "@/components/dashboard/moodform";
import { StatsRow } from "@/components/dashboard/statsrow";
import { TrendChart } from "@/components/dashboard/trendchart";
import { SuggestionsPanel } from "@/components/dashboard/suggestionspanel";
import { WeeklyInsights } from "@/components/dashboard/weekly-insights";
import { ExportButton } from "@/components/dashboard/export-button";
import { DailyEntry } from "@/lib/types";
import { sampleEntries } from "@/lib/sampleData";

export default function HomePage() {
  const [entries, setEntries] = useState<DailyEntry[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("winnie.entries");
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as DailyEntry[];
        if (Array.isArray(parsed)) setEntries(parsed);
        else setEntries(sampleEntries);
      } catch {
        setEntries(sampleEntries);
      }
    } else {
      setEntries(sampleEntries);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem("winnie.entries", JSON.stringify(entries));
  }, [entries, hydrated]);

  const handleAddEntry = (entry: DailyEntry) => {
    setEntries((prev) => {
      const next = [...prev.filter((e) => e.date !== entry.date), entry];
      return next.sort((a, b) => a.date.localeCompare(b.date));
    });
  };

  const dynamicStats = useMemo(() => {
    const daysLogged = entries.length;
    const avgMood =
      daysLogged > 0
        ? (entries.reduce((s, e) => s + e.mood, 0) / daysLogged).toFixed(1)
        : "–";
    const avgFocus =
      daysLogged > 0
        ? (entries.reduce((s, e) => s + e.focus, 0) / daysLogged).toFixed(1)
        : "–";
    const focusPct =
      daysLogged > 0 ? `${Math.round((parseFloat(avgFocus) / 5) * 100)}%` : "0%";
    return [
      { value: String(daysLogged), label: "Days Logged", sublabel: "Total entries" },
      { value: avgMood, label: "Avg Mood", sublabel: "Out of 5" },
      { value: focusPct, label: "Focus Score", sublabel: "Weekly average" },
    ];
  }, [entries]);

  if (!hydrated) {
    return (
      <>
        <Navbar />
        <div className="mx-auto mt-24 flex max-w-[900px] flex-col items-center gap-6 px-4">
          <div className="h-48 w-full max-w-[500px] animate-pulse rounded-lg bg-white/10" />
          <div className="h-10 w-64 animate-pulse rounded bg-white/5" />
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <TypingHero />

      <AnimatedSection delay={0.1}>
        <StatsSection stats={dynamicStats} />
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <PlatformSection />
      </AnimatedSection>

      <section
        id="dashboard"
        className="border-b border-white/[0.08] py-16 lg:py-24"
      >
        <AnimatedSection>
          <div className="mx-auto max-w-[1200px] px-4 sm:px-8 lg:px-[120px]">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/60">
                Your dashboard
              </p>
              <div className="flex items-center gap-3">
                <ExportButton entries={entries} />
                <ThemeToggle />
              </div>
            </div>

            <section
              id="patterns"
              className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]"
            >
              <MoodForm onSubmit={handleAddEntry} hasEntries={entries.length > 0} />
              <div id="suggestions" className="space-y-4">
                <SuggestionsPanel entries={entries} />
                <WeeklyInsights entries={entries} />
              </div>
            </section>

            <div className="mt-6">
              <StatsRow entries={entries} />
            </div>
            <div className="mt-6">
              <TrendChart entries={entries} />
            </div>
          </div>
        </AnimatedSection>
      </section>

      <AnimatedSection>
        <DataSection stat={String(entries.length)} />
      </AnimatedSection>

      <footer id="contact" className="py-12 text-center">
        <p className="text-sm text-white/50">
          © {new Date().getFullYear()} winnie. All rights reserved.
        </p>
        <a
          href="https://github.com/nickvazqueez"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-xs text-white/40 transition-colors hover:text-white/70"
        >
          GitHub
        </a>
      </footer>
    </>
  );
}
