"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Brain, Send, ArrowLeft } from "lucide-react";

type MessageRole = "ai" | "user";

type Message = {
  id: string;
  role: MessageRole;
  text: string;
};

const MOCK_AI_REPLIES = [
  "That's a great starting point. Can you walk me through the main challenges you faced in that project?",
  "Thanks for sharing. How would you approach optimizing the performance of that system?",
  "Good answer. Let's switch to a technical question: how do you handle concurrency in Java?",
  "I see. What design patterns do you find most useful in your day-to-day work?",
  "We have time for one more. Tell me about a time you had to debug a difficult production issue.",
];

const INITIAL_AI_MESSAGE: Message = {
  id: "0",
  role: "ai",
  text: "Hello! I'm your AI interviewer. Let's start with a short intro — tell me about a recent project you worked on and your role in it.",
};

export default function MockInterviewPage() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_AI_MESSAGE]);
  const [input, setInput] = useState("");
  const [isAiTyping, setIsAiTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const replyIndexRef = useRef(0);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isAiTyping]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || isAiTyping) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      text: trimmed,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsAiTyping(true);

    const reply =
      MOCK_AI_REPLIES[replyIndexRef.current % MOCK_AI_REPLIES.length];
    replyIndexRef.current += 1;

    setTimeout(() => {
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        role: "ai",
        text: reply,
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsAiTyping(false);
    }, 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-background">
      {/* Header */}
      <header className="shrink-0 border-b border-border bg-card">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="gap-2" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4 text-foreground" />
              <span className="text-sm font-medium text-foreground">
                AI Interviewer
              </span>
            </div>
          </div>
          <Button variant="outline" size="sm" className="text-muted-foreground" asChild>
            <Link href="/dashboard">End interview</Link>
          </Button>
        </div>
      </header>

      {/* Messages */}
      <ScrollArea className="flex-1 p-6">
        <div className="max-w-2xl mx-auto space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 animate-fade-in ${
                msg.role === "user" ? "flex-row-reverse" : ""
              }`}
            >
              {msg.role === "ai" ? (
                <div className="w-8 h-8 bg-secondary flex items-center justify-center shrink-0 rounded">
                  <Brain className="h-4 w-4 text-muted-foreground" />
                </div>
              ) : (
                <div className="w-8 h-8 bg-foreground flex items-center justify-center shrink-0 rounded">
                  <span className="text-xs font-bold text-background">You</span>
                </div>
              )}
              <div
                className={`p-3 text-sm text-foreground max-w-[85%] ${
                  msg.role === "user"
                    ? "bg-secondary/50 border border-border"
                    : "bg-secondary"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isAiTyping && (
            <div className="flex gap-3 animate-fade-in">
              <div className="w-8 h-8 bg-secondary flex items-center justify-center shrink-0 rounded">
                <Brain className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="p-3 text-sm text-muted-foreground bg-secondary">
                <span className="inline-block w-2 h-4 bg-foreground animate-pulse" />
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="shrink-0 border-t border-border bg-card p-4">
        <div className="max-w-2xl mx-auto flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your answer..."
            className="flex-1 h-10 px-3 rounded-md border border-border bg-secondary/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
          />
          <Button
            size="icon"
            variant="outline"
            className="h-10 w-10 shrink-0"
            onClick={handleSend}
            type="button"
            disabled={!input.trim() || isAiTyping}
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
