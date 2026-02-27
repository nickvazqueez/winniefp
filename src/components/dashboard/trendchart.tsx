"use client";

import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { DailyEntry } from "@/lib/types";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface TrendChartProps {
  entries: DailyEntry[];
}

interface ChartPoint {
  date: string;
  fullDate: string;
  mood: number;
  focus: number;
  sleep: number;
  productivity: number;
  energy: number;
  entry: DailyEntry;
}

export function TrendChart({ entries }: TrendChartProps) {
  const { data, isLowestDay, restSupportedProductivity } = useMemo(() => {
    const sorted = [...entries].sort((a, b) => a.date.localeCompare(b.date));
    const points: ChartPoint[] = sorted.map((e) => {
      const energy = e.mood + e.focus + e.sleepQuality + e.productivity;
      return {
        date: e.date.slice(5),
        fullDate: e.date,
        mood: e.mood,
        focus: e.focus,
        sleep: e.sleepQuality,
        productivity: e.productivity,
        energy,
        entry: e,
      };
    });

    const minEnergy = Math.min(...points.map((p) => p.energy));
    const isLowest = (idx: number) => points[idx]?.energy === minEnergy;
    const restSupported = (idx: number) => {
      if (idx < 1) return false;
      const prev = points[idx - 1];
      const curr = points[idx];
      return prev.sleep >= 4 && curr.productivity >= 4;
    };

    return {
      data: points,
      isLowestDay: isLowest,
      restSupportedProductivity: restSupported,
    };
  }, [entries]);

  const isEmpty = !data.length;

  return (
    <Card className="h-[260px] sm:h-[300px]">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-slate-100">
            Weekly patterns
          </h2>
          <p className="text-xs text-slate-400">
            How your energy dimensions move together.
          </p>
        </div>
      </div>

      {isEmpty ? (
        <div className="flex h-[200px] items-center justify-center text-xs text-slate-400">
          Log a few days to unlock your first mood map.
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="80%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis dataKey="date" stroke="#9ca3af" fontSize={11} />
            <YAxis
              domain={[1, 5]}
              tickCount={5}
              stroke="#9ca3af"
              fontSize={11}
            />
            <Tooltip
              content={
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (props: any) => (
                  <ChartTooltip
                    {...props}
                    data={data}
                    isLowestDay={isLowestDay}
                    restSupportedProductivity={restSupportedProductivity}
                  />
                )
              }
            />
            <Line
              type="monotone"
              dataKey="mood"
              name="Mood"
              stroke="#f97316"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="focus"
              name="Focus"
              stroke="#22c55e"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="sleep"
              name="Sleep"
              stroke="#38bdf8"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="productivity"
              name="Productivity"
              stroke="#a855f7"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: Array<{ dataKey?: string; name?: string; value?: number }>;
  label?: string;
  data: ChartPoint[];
  isLowestDay: (idx: number) => boolean;
  restSupportedProductivity: (idx: number) => boolean;
}

function ChartTooltip({
  active,
  payload,
  label,
  data,
  isLowestDay,
  restSupportedProductivity,
}: ChartTooltipProps) {
  if (!active || !payload?.length || !label) return null;

  const idx = data.findIndex((d) => d.date === label);
  if (idx < 0) return null;

  const point = data[idx];
  const lowest = isLowestDay(idx);
  const restSupported = restSupportedProductivity(idx);

  return (
    <div
      className="rounded-xl border border-white/10 bg-slate-900/95 px-4 py-3 text-xs shadow-xl backdrop-blur-sm"
      style={{ minWidth: 180 }}
    >
      <p className="mb-2 font-medium text-slate-100">{point.fullDate}</p>
      <div className="space-y-1 text-slate-300">
        {payload.map((p) => (
          <div key={p.dataKey} className="flex justify-between gap-4">
            <span>{p.name}</span>
            <span>{p.value}/5</span>
          </div>
        ))}
      </div>
      {(lowest || restSupported) && (
        <p className="mt-3 border-t border-white/10 pt-3 text-slate-400 italic">
          {lowest &&
            "This was your lowest energy day. What happened here?"}
          {lowest && restSupported && " "}
          {restSupported &&
            "Notice how rest supported your performance."}
        </p>
      )}
    </div>
  );
}
