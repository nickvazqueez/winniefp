"use client";

import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { DailyEntry } from "@/lib/types";

interface WeeklyInsightsProps {
  entries: DailyEntry[];
}

function average(values: number[]) {
  if (!values.length) return 0;
  return values.reduce((a, b) => a + b, 0) / values.length;
}

export function WeeklyInsights({ entries }: WeeklyInsightsProps) {
  const insights = useMemo(() => {
    if (entries.length < 2) return null;
    const sorted = [...entries].sort((a, b) => a.date.localeCompare(b.date));
    const avgMood = average(sorted.map((e) => e.mood));
    const avgFocus = average(sorted.map((e) => e.focus));
    const avgSleep = average(sorted.map((e) => e.sleepQuality));
    const avgProd = average(sorted.map((e) => e.productivity));

    const energyScores = sorted.map((e) => ({
      date: e.date,
      score: e.mood + e.focus + e.sleepQuality + e.productivity,
    }));
    const best = energyScores.reduce((a, b) => (a.score > b.score ? a : b));
    const worst = energyScores.reduce((a, b) => (a.score < b.score ? a : b));

    const sleepProdCorr =
      sorted.length >= 2
        ? sorted
            .slice(1)
            .filter((e, i) => sorted[i].sleepQuality >= 4 && e.productivity >= 4).length
        : 0;

    return {
      avgMood: avgMood.toFixed(1),
      avgFocus: avgFocus.toFixed(1),
      avgSleep: avgSleep.toFixed(1),
      avgProd: avgProd.toFixed(1),
      bestDay: best.date,
      worstDay: worst.date,
      sleepProdDays: sleepProdCorr,
    };
  }, [entries]);

  if (!insights || entries.length < 2) return null;

  return (
    <Card className="flex flex-col gap-4">
      <h3 className="text-sm font-semibold text-slate-100">Weekly insights</h3>
      <ul className="space-y-2 text-xs text-slate-300">
        <li>
          <strong className="text-slate-100">Best energy day:</strong> {insights.bestDay}
        </li>
        <li>
          <strong className="text-slate-100">Lowest energy:</strong> {insights.worstDay}
        </li>
        {insights.sleepProdDays > 0 && (
          <li>
            <strong className="text-slate-100">Rest → performance:</strong>{" "}
            {insights.sleepProdDays} day(s) where good sleep preceded high productivity
          </li>
        )}
      </ul>
    </Card>
  );
}
