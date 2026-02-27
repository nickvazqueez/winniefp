"use client";

import { useState, useMemo, FormEvent } from "react";
import { DailyEntry, MoodLevel } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface MoodFormProps {
  onSubmit: (entry: DailyEntry) => void;
  hasEntries: boolean;
}

const scaleLabels: Record<MoodLevel, string> = {
  1: "Very low",
  2: "Low",
  3: "Neutral",
  4: "Good",
  5: "Excellent",
};

export function MoodForm({ onSubmit, hasEntries }: MoodFormProps) {
  const todayIso = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const [date, setDate] = useState(todayIso);
  const [mood, setMood] = useState<MoodLevel>(3);
  const [focus, setFocus] = useState<MoodLevel>(3);
  const [sleepQuality, setSleepQuality] = useState<MoodLevel>(3);
  const [productivity, setProductivity] = useState<MoodLevel>(3);
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const entry: DailyEntry = {
      id: crypto.randomUUID(),
      date,
      mood,
      focus,
      sleepQuality,
      productivity,
      notes: notes.trim() || undefined,
    };
    onSubmit(entry);
    setTimeout(() => {
      setSaving(false);
      setJustSaved(true);
      setTimeout(() => setJustSaved(false), 2400);
    }, 400);
  };

  const renderScale = (label: string, value: MoodLevel, setValue: (v: MoodLevel) => void) => (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
          {label}
        </p>
        <p className="text-xs text-slate-300">
          {value}/5 · {scaleLabels[value]}
        </p>
      </div>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((n) => {
          const active = n <= value;
          return (
            <button
              key={n}
              type="button"
              onClick={() => setValue(n as MoodLevel)}
              className={`flex-1 rounded-xl border px-2 py-1 text-xs font-medium transition-colors ${
                active
                  ? "border-accent-500/80 bg-accent-500/15 text-accent-200"
                  : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
              }`}
            >
              {n}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <Card className="relative overflow-hidden">
      {!hasEntries && (
        <div className="pointer-events-none absolute inset-x-4 top-4 rounded-2xl border border-dashed border-white/15 bg-gradient-to-r from-white/5 via-transparent to-white/5 px-4 py-3 text-xs text-slate-200">
          <p className="font-medium">
            You haven’t logged any data yet.
          </p>
          <p className="mt-1 text-slate-400">
            Observe first. No judgment – just describe today as honestly as you can.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5 pt-3 sm:pt-0">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-1 pt-6 sm:pt-0">
          <div>
            <h2 className="text-sm font-semibold text-slate-100">
              Today&apos;s reflection
            </h2>
            <p className="text-xs text-slate-400">
              Track how you feel, focus, sleep, and energy.
            </p>
          </div>
          <input
            type="date"
            value={date}
            max={todayIso}
            onChange={(e) => setDate(e.target.value)}
            className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-xs text-slate-100 outline-none focus:border-accent-500/80"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {renderScale("Mood", mood, setMood)}
          {renderScale("Focus", focus, setFocus)}
          {renderScale("Sleep quality", sleepQuality, setSleepQuality)}
          {renderScale("Productivity", productivity, setProductivity)}
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Notes (optional)
          </p>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="What shaped your day? Routines, people, thoughts..."
            rows={3}
            className="w-full resize-none rounded-2xl border border-white/10 bg-black/25 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-accent-500/80 focus:outline-none"
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" loading={saving} disabled={justSaved}>
            {justSaved ? "Day captured." : saving ? "Saving…" : "Save today"}
          </Button>
        </div>
      </form>
    </Card>
  );
}