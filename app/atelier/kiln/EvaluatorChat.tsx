"use client";

import { useEffect, useRef, useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type Summary = {
  disposition: "pursue" | "potential" | "park" | "discard";
  triage_reasoning: string;
  growth_observations?: string;
};

const SEED_MESSAGE = "I have a new idea I'd like to triage.";
const MAX_USER_TURNS = 10;

const DISPOSITION_LABEL: Record<Summary["disposition"], string> = {
  pursue: "Pursue",
  potential: "Potential",
  park: "Park",
  discard: "Discard",
};

const DISPOSITION_COLOR: Record<Summary["disposition"], string> = {
  pursue: "text-[var(--color-fg)] border-[var(--color-border-strong)]",
  potential: "text-[var(--color-fg-muted)] border-[var(--color-border-strong)]",
  park: "text-[var(--color-fg-muted)] border-[var(--color-border)]",
  discard: "text-[var(--color-fg-subtle)] border-[var(--color-border)]",
};

function TypingIndicator() {
  return (
    <div className="flex items-center gap-[5px] py-1" aria-label="Claude is responding">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="block w-[5px] h-[5px] rounded-full bg-[var(--color-fg-subtle)]"
          style={{
            animation: "evaluator-dot-pulse 1.2s ease-in-out infinite",
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
    </div>
  );
}

function SummaryCard({ summary }: { summary: Summary }) {
  return (
    <div className="mx-3 mb-3 rounded border border-[var(--color-border-strong)] bg-[var(--color-bg-elevated)] p-4">
      <div className="flex items-center gap-3 mb-3">
        <span className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-[var(--color-fg-muted)]">
          Evaluation complete
        </span>
        <span
          className={`font-mono text-[11px] font-medium tracking-[0.12em] uppercase border rounded px-2 py-0.5 ${DISPOSITION_COLOR[summary.disposition]}`}
        >
          {DISPOSITION_LABEL[summary.disposition]}
        </span>
      </div>
      <p className="text-sm leading-relaxed text-[var(--color-fg-muted)] mb-0">
        {summary.triage_reasoning}
      </p>
      {summary.growth_observations && (
        <p className="text-sm leading-relaxed text-[var(--color-fg-subtle)] mt-2 pt-2 border-t border-[var(--color-border)]">
          {summary.growth_observations}
        </p>
      )}
    </div>
  );
}

export default function EvaluatorChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [streamingText, setStreamingText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [userTurns, setUserTurns] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const seeded = useRef(false);

  const scrollToBottom = () => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingText]);

  const callApi = async (history: Message[]) => {
    setIsStreaming(true);
    setStreamingText("");
    setError(null);

    try {
      const res = await fetch("/api/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { error?: string }).error ?? `Request failed: ${res.status}`);
      }

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      let fullText = "";
      let toolResult: { name: string; input: Summary } | null = null;

      outer: while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        const lines = buf.split("\n");
        buf = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.trim()) continue;
          try {
            const event = JSON.parse(line) as {
              type: string;
              delta?: string;
              name?: string;
              input?: Summary;
              message?: string;
            };
            if (event.type === "text") {
              fullText += event.delta;
              setStreamingText(fullText);
            } else if (event.type === "tool_use" && event.name === "complete_interview") {
              toolResult = { name: event.name, input: event.input! };
            } else if (event.type === "done") {
              break outer;
            } else if (event.type === "error") {
              throw new Error(event.message ?? "Stream error");
            }
          } catch (parseErr) {
            if (parseErr instanceof SyntaxError) continue;
            throw parseErr;
          }
        }
      }

      const next: Message[] = fullText
        ? [...history, { role: "assistant" as const, content: fullText }]
        : [...history];

      setMessages(next);
      setStreamingText("");

      if (toolResult) {
        setSummary(toolResult.input);
        setIsComplete(true);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStreamingText("");
    } finally {
      setIsStreaming(false);
    }
  };

  useEffect(() => {
    if (seeded.current) return;
    seeded.current = true;
    callApi([{ role: "user", content: SEED_MESSAGE }]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = inputValue.trim();
    if (!text || isStreaming || isComplete) return;

    const newTurns = userTurns + 1;
    setUserTurns(newTurns);
    setInputValue("");

    const newHistory: Message[] = [...messages, { role: "user", content: text }];
    setMessages(newHistory);
    callApi(newHistory);

    if (newTurns >= MAX_USER_TURNS) {
      setIsComplete(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  const allMessages = messages;
  const showStreamingBubble = isStreaming && streamingText;
  const showTypingDots = isStreaming && !streamingText;

  const inputDisabled = isStreaming || isComplete;
  const submitDisabled = inputDisabled || !inputValue.trim();

  return (
    <>
      <style>{`
        @keyframes evaluator-dot-pulse {
          0%, 80%, 100% { opacity: 0.25; transform: scale(0.8); }
          40% { opacity: 1; transform: scale(1); }
        }
      `}</style>

      <div
        className="relative flex flex-col rounded border border-[var(--color-border)] bg-[var(--color-bg-elevated)] overflow-hidden"
        style={{ height: "500px" }}
        aria-label="Evaluator chat"
      >
        {/* Message thread */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto overscroll-contain px-3 py-4 space-y-3"
          style={{ scrollbarGutter: "stable" }}
        >
          {/* Skip seed message display — show only Claude's responses and subsequent turns */}
          {allMessages.map((msg, i) => {
            const isSeed = i === 0 && msg.role === "user" && msg.content === SEED_MESSAGE;
            if (isSeed) return null;
            return (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={
                    msg.role === "user"
                      ? "max-w-[80%] rounded bg-[var(--color-bg)] border border-[var(--color-border-strong)] px-3 py-2 text-sm leading-relaxed text-[var(--color-fg)]"
                      : "max-w-[90%] text-sm leading-relaxed text-[var(--color-fg-muted)]"
                  }
                >
                  {msg.content}
                </div>
              </div>
            );
          })}

          {/* Streaming assistant bubble */}
          {showStreamingBubble && (
            <div className="flex justify-start">
              <div className="max-w-[90%] text-sm leading-relaxed text-[var(--color-fg-muted)]">
                {streamingText}
              </div>
            </div>
          )}

          {/* Typing indicator */}
          {showTypingDots && (
            <div className="flex justify-start">
              <TypingIndicator />
            </div>
          )}
        </div>

        {/* Summary card — shown above input when interview completes */}
        {summary && <SummaryCard summary={summary} />}

        {/* Session complete message (hit turn limit without tool call) */}
        {isComplete && !summary && (
          <div className="mx-3 mb-3 rounded border border-[var(--color-border)] px-3 py-2">
            <span className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-[var(--color-fg-subtle)]">
              Session complete
            </span>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="mx-3 mb-1">
            <p className="text-sm text-[var(--color-fg-subtle)]">{error}</p>
          </div>
        )}

        {/* Input */}
        <div className="border-t border-[var(--color-border)] px-3 py-3">
          <form onSubmit={handleSubmit} className="flex items-end gap-2">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={inputDisabled}
              placeholder={
                isComplete ? "Session complete" : "Describe your idea…"
              }
              rows={1}
              className="flex-1 resize-none rounded border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-base sm:text-sm leading-relaxed text-[var(--color-fg)] placeholder:text-[var(--color-fg-subtle)] focus:outline-none focus:border-[var(--color-border-strong)] disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ maxHeight: "120px", overflowY: "auto" }}
            />
            <button
              type="submit"
              disabled={submitDisabled}
              className="flex-none rounded border border-[var(--color-border-strong)] bg-[var(--color-bg)] px-3 py-2 font-mono text-[11px] font-medium tracking-[0.1em] uppercase text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-fg)] hover:border-[var(--color-fg)] disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
