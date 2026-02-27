"use client";

import { useState } from "react";
import { DailyEntry } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface SuggestionsPanelProps {
  entries: DailyEntry[];
}

export function SuggestionsPanel({ entries }: SuggestionsPanelProps) {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const hasEnoughData = entries.length >= 3;

  const requestSuggestions = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entries }),
      });
      if (!res.ok) throw new Error("Failed to fetch insights");
      const data = await res.json();
      setSuggestions(data.suggestions ?? []);
    } catch (e: any) {
      setError("Something went wrong while generating insights.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="flex flex-col gap-3 backdrop-blur-xl backdrop-saturate-150">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h2 className="text-sm font-semibold text-slate-100">
            Gentle suggestions
          </h2>
          <p className="text-xs text-slate-400">
            Small experiments based on your last days.
          </p>
        </div>
        <Button
          variant="ghost"
          onClick={requestSuggestions}
          disabled={!hasEnoughData}
          loading={loading}
        >
          Refresh
        </Button>
      </div>

      {!hasEnoughData && (
        <p className="text-xs text-slate-400">
          Log at least three days and we&apos;ll start surfacing patterns for you.
        </p>
      )}

      {error && <p className="text-xs text-red-400">{error}</p>}

      {loading && (
        <div className="space-y-2 text-xs text-slate-400">
          <div className="h-2.5 w-2/3 animate-pulse rounded-full bg-white/10" />
          <div className="h-2.5 w-1/2 animate-pulse rounded-full bg-white/10" />
          <div className="h-2.5 w-4/5 animate-pulse rounded-full bg-white/10" />
        </div>
      )}

      {!loading && suggestions && suggestions.length > 0 && (
        <ul className="space-y-2 text-xs text-slate-200">
          {suggestions.map((s, i) => (
            <li key={i} className="flex gap-2">
              <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-accent-500" />
              <span>{s}</span>
            </li>
          ))}
        </ul>
      )}

      {!loading && !suggestions && hasEnoughData && (
        <p className="text-xs text-slate-400">
          When you&apos;re ready, hit “Refresh” and we&apos;ll generate your first set of suggestions.
        </p>
      )}
    </Card>
  );
}