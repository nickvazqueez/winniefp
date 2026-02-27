import { Card } from "@/components/ui/card";
import { DailyEntry } from "@/lib/types";

interface StatsRowProps {
  entries: DailyEntry[];
}

function average(values: number[]) {
  if (!values.length) return 0;
  return values.reduce((a, b) => a + b, 0) / values.length;
}

export function StatsRow({ entries }: StatsRowProps) {
  const avgMood = average(entries.map((e) => e.mood));
  const avgFocus = average(entries.map((e) => e.focus));
  const avgSleep = average(entries.map((e) => e.sleepQuality));
  const avgProductivity = average(entries.map((e) => e.productivity));

  const cards = [
    { label: "Mood", value: avgMood, tone: "How you feel" },
    { label: "Focus", value: avgFocus, tone: "How present you are" },
    { label: "Sleep", value: avgSleep, tone: "How you rest" },
    { label: "Productivity", value: avgProductivity, tone: "How you move" },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((c) => (
        <Card key={c.label} className="flex flex-col gap-2">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            {c.label}
          </p>
          <p className="text-2xl font-semibold text-slate-50">
            {c.value ? c.value.toFixed(1) : "–"}
            <span className="ml-1 text-xs text-slate-400">/5</span>
          </p>
          <p className="text-xs text-slate-400">{c.tone}</p>
        </Card>
      ))}
    </div>
  );
}