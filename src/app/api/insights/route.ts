import { NextRequest, NextResponse } from "next/server";
import { DailyEntry } from "@/lib/types";

function validateEntries(data: unknown): DailyEntry[] | null {
  if (!Array.isArray(data)) return null;
  const entries: DailyEntry[] = [];
  for (const item of data.slice(0, 30)) {
    if (
      typeof item === "object" &&
      item !== null &&
      typeof (item as any).date === "string" &&
      typeof (item as any).mood === "number" &&
      typeof (item as any).focus === "number" &&
      typeof (item as any).sleepQuality === "number" &&
      typeof (item as any).productivity === "number" &&
      [1, 2, 3, 4, 5].includes((item as any).mood) &&
      [1, 2, 3, 4, 5].includes((item as any).focus) &&
      [1, 2, 3, 4, 5].includes((item as any).sleepQuality) &&
      [1, 2, 3, 4, 5].includes((item as any).productivity)
    ) {
      entries.push({
        id: String((item as any).id ?? crypto.randomUUID()),
        date: String((item as any).date).slice(0, 10),
        mood: (item as any).mood as 1 | 2 | 3 | 4 | 5,
        focus: (item as any).focus as 1 | 2 | 3 | 4 | 5,
        sleepQuality: (item as any).sleepQuality as 1 | 2 | 3 | 4 | 5,
        productivity: (item as any).productivity as 1 | 2 | 3 | 4 | 5,
        notes: typeof (item as any).notes === "string" ? (item as any).notes.slice(0, 500) : undefined,
      });
    }
  }
  return entries.length > 0 ? entries : null;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const entries = validateEntries(body?.entries);
    if (!entries || entries.length < 3) {
      return NextResponse.json(
        { suggestions: ["Log at least 3 days to generate insights."] },
        { status: 400 }
      );
    }

    const key = process.env.OPENAI_API_KEY;
    if (!key) {
      return NextResponse.json(
        {
          suggestions: [
            "This feature is not available because i'm a beginner dev :p.",
            ,
          ],
        },
        { status: 200 }
      );
    }

    const summary = entries
      .slice(-7)
      .map(
        (e) =>
          `Date ${e.date}: mood ${e.mood}/5, focus ${e.focus}/5, sleep ${e.sleepQuality}/5, productivity ${e.productivity}/5. Notes: ${e.notes || "no notes"}.`
      )
      .join("\n");

    const prompt = `You are an emotional intelligence coach. The user tracks mood, focus, sleep quality and productivity from 1-5.
Based on the last days, suggest 3-5 small, compassionate experiments they can try this week.
Avoid toxic positivity and be very concrete.

Data:
${summary}`;

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You coach with warmth and clarity." },
          { role: "user", content: prompt },
        ],
      }),
    });

    if (!res.ok) throw new Error("OpenAI request failed");

    const json = await res.json();
    const text: string = json.choices?.[0]?.message?.content ?? "";
    const suggestions = text
      .split(/\n+/)
      .map((s: string) => s.replace(/^\d+[\).\s-]*/, "").trim())
      .filter(Boolean)
      .slice(0, 5);

    return NextResponse.json({ suggestions });
  } catch {
    return NextResponse.json(
      {
        suggestions: [
          "We couldn't generate AI insights right now. Take a breath and notice one small thing that improved your day recently.",
        ],
      },
      { status: 200 }
    );
  }
}
