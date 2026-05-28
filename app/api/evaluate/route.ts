import Anthropic from "@anthropic-ai/sdk";
import type { NextRequest } from "next/server";

const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 20;
const RATE_WINDOW = 60 * 60 * 1000;

const SYSTEM_PROMPT = `You are a Socratic evaluator: a rigorous, adversarial thinker whose job is to find an idea's weakest points before any work begins. You are not trying to kill ideas — you are trying to make survivors stronger.

Your method: ask one sharp question at a time. Listen carefully to the answers. When an answer reveals a genuine strength, acknowledge it in one sentence and move to the next weakness. When it reveals a gap or assumption, press harder before moving on. Never ask multiple questions in one turn.

You evaluate ideas across six dimensions, but do not announce this framework or name the dimensions as you probe them. Work through them naturally in conversation:
1. Clarity — Is the problem actually specific? Is the solution coherent?
2. Impact — Does solving this matter? To whom, and how much?
3. Effort — What does this realistically cost to build and to sell?
4. Falsifiability — What would prove this idea wrong? Has it been tested?
5. Founder fit — Is this the right person to build this?
6. Viability — Is there a buyer, a budget, a defensible position?

When you have gathered sufficient signal across all six dimensions — typically after 6–10 turns — call the complete_interview tool with your final assessment. Do not keep asking questions once you have enough signal.

Tone: skeptical but constructive. Adversarial in service of clarity, not dismissal. Speak as a direct, thoughtful investor or product partner.

Rules:
— One question per message. Never list questions.
— Do not explain your framework or name what dimension you are testing.
— Do not deliver a verdict or summarize your assessment until you call complete_interview.
— If an answer is vague or evasive, press on that exact point before moving forward.
— If an answer is strong, acknowledge it briefly and immediately probe the next weakness.
— Begin by asking the founder to describe the idea and the problem it solves.`;

const COMPLETE_TOOL: Anthropic.Tool = {
  name: "complete_interview",
  description:
    "Call this when you have gathered sufficient signal across all six dimensions to reach a final assessment. Do not call prematurely.",
  input_schema: {
    type: "object" as const,
    properties: {
      disposition: {
        type: "string",
        enum: ["pursue", "potential", "park", "discard"],
        description:
          "pursue: strong idea, proceed immediately. potential: real idea with specific gaps to close first. park: interesting but wrong time or missing a critical ingredient. discard: fundamental flaws that cannot be resolved by iteration.",
      },
      triage_reasoning: {
        type: "string",
        description:
          "2–3 sentences on why this disposition was reached. Name the strongest signal and the key weakness.",
      },
      growth_observations: {
        type: "string",
        description:
          "1–2 sentences on what specific work would most strengthen this idea, or what the founder should examine before resubmitting. Required unless disposition is discard.",
      },
    },
    required: ["disposition", "triage_reasoning", "growth_observations"],
  },
};

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateMap.get(ip);
  if (!record || now >= record.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return true;
  }
  if (record.count >= RATE_LIMIT) return false;
  record.count++;
  return true;
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (!checkRateLimit(ip)) {
    return new Response(JSON.stringify({ error: "Rate limit exceeded. Try again later." }), {
      status: 429,
      headers: { "Content-Type": "application/json" },
    });
  }

  let messages: Anthropic.MessageParam[];
  try {
    const body = await req.json();
    if (!Array.isArray(body.messages)) throw new Error("messages must be an array");
    messages = body.messages;
  } catch {
    return new Response(JSON.stringify({ error: "Invalid request body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const send = (obj: Record<string, unknown>) =>
        controller.enqueue(encoder.encode(JSON.stringify(obj) + "\n"));

      try {
        const anthropicStream = await client.messages.create({
          model: "claude-sonnet-4-6",
          max_tokens: 1024,
          stream: true,
          system: [
            {
              type: "text" as const,
              text: SYSTEM_PROMPT,
              cache_control: { type: "ephemeral" as const },
            },
          ],
          tools: [COMPLETE_TOOL],
          messages,
        });

        let toolInputBuffer = "";
        let toolName = "";
        let inToolUse = false;

        for await (const event of anthropicStream) {
          if (event.type === "content_block_start") {
            if (event.content_block.type === "tool_use") {
              inToolUse = true;
              toolName = event.content_block.name;
              toolInputBuffer = "";
            }
          } else if (event.type === "content_block_delta") {
            if (event.delta.type === "text_delta") {
              send({ type: "text", delta: event.delta.text });
            } else if (event.delta.type === "input_json_delta" && inToolUse) {
              toolInputBuffer += event.delta.partial_json;
            }
          } else if (event.type === "content_block_stop" && inToolUse) {
            try {
              const input = JSON.parse(toolInputBuffer);
              send({ type: "tool_use", name: toolName, input });
            } catch {
              // malformed tool JSON — skip
            }
            inToolUse = false;
          }
        }

        send({ type: "done" });
      } catch (err) {
        send({ type: "error", message: err instanceof Error ? err.message : "Stream error" });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-Accel-Buffering": "no",
      "Cache-Control": "no-cache",
    },
  });
}
