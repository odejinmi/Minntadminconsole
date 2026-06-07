"use client";

import { useState } from "react";
import { ArrowUp, Mic } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/layout/Logo";

type ChatMessage = {
  id: number;
  role: "user" | "assistant";
  text: string;
};

const ASSISTANT_REPLY =
  "I'm wired up to answer once the assistant backend is connected.";

export function CommandCenterChat(): React.ReactElement {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");

  const send = (): void => {
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      { id: prev.length, role: "user", text },
      { id: prev.length + 1, role: "assistant", text: ASSISTANT_REPLY },
    ]);
    setInput("");
  };

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    send();
  };

  const isEmpty = messages.length === 0;

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto px-6">
        {isEmpty ? (
          <div className="flex h-full items-center justify-center">
            <Logo markOnly className="h-16 text-muted-foreground/20" />
          </div>
        ) : (
          <div className="mx-auto max-w-3xl space-y-4 py-8">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  message.role === "user" ? "justify-end" : "justify-start",
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground",
                  )}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="px-6 pb-8">
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex max-w-3xl items-center gap-3 rounded-2xl border border-border bg-card px-5 py-3 shadow-sm"
        >
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask anything…"
            aria-label="Ask anything"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <button
            type="button"
            aria-label="Voice input"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <Mic className="size-5" />
          </button>
          <button
            type="submit"
            aria-label="Send"
            className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
            disabled={input.trim() === ""}
          >
            <ArrowUp className="size-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
