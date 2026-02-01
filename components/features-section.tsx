"use client";

import { Code2, Brain, Target, Zap, MessageSquare, BarChart3, ArrowRight, Send, Mic, RefreshCw, ChevronDown, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

const MOCK_CHAT_MESSAGES = [
  { role: "ai" as const, text: "Can you explain the time complexity of your solution and suggest any optimizations?" },
  { role: "user" as const, text: "The current solution has O(n²) time complexity due to nested loops. We could optimize using a HashMap..." },
  { role: "ai" as const, text: "Great thinking! That would bring it down to O(n). What about space complexity?" },
];

function getWords(text: string): string[] {
  return text.split(/\s+/).filter(Boolean);
}

const TYPING_MS_PER_WORD = 80;
const CHAT_WINDOW_HEIGHT = 280;
const PAUSE_BEFORE_THIRD_MSG_MS = 500;

const LEARN_PROGRESS_STEP = 20;

const CONFETTI_COLORS = ["#22c55e", "#eab308", "#f97316", "#ec4899", "#8b5cf6", "#06b6d4"];
const CONFETTI_PARTICLES = Array.from({ length: 14 }, (_, i) => {
  const angle = (i / 14) * 2 * Math.PI;
  const dist = 58 + (i % 3) * 12;
  return {
    x: Math.cos(angle) * dist,
    y: Math.sin(angle) * dist,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
  };
});

type PathPhase = "complete" | "idle" | "painted" | "done";
const INITIAL_PATH_ITEMS: { topic: string; progress: number; phase: PathPhase }[] = [
  { topic: "Arrays & Strings", progress: 100, phase: "complete" },
  { topic: "Hash Tables", progress: 100, phase: "complete" },
  { topic: "Trees & Graphs", progress: 40, phase: "idle" },
  { topic: "Dynamic Programming", progress: 60, phase: "idle" },
  { topic: "System Design", progress: 20, phase: "idle" },
];

export function FeaturesSection() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [visibleWords, setVisibleWords] = useState(0);
  const [animationStarted, setAnimationStarted] = useState(false);
  const chatSectionRef = useRef<HTMLElement>(null);

  const [pathItems, setPathItems] = useState(INITIAL_PATH_ITEMS.map((item) => ({ ...item })));

  const feedbackSectionRef = useRef<HTMLElement>(null);
  const [feedbackInView, setFeedbackInView] = useState(false);
  const [feedbackRingProgress, setFeedbackRingProgress] = useState(0);
  const [feedbackArrowVisible, setFeedbackArrowVisible] = useState(true);
  const [feedbackAnalyzingVisible, setFeedbackAnalyzingVisible] = useState(true);
  const [feedbackReplayCount, setFeedbackReplayCount] = useState(0);
  const FEEDBACK_TARGET_SCORE = 85;
  const FEEDBACK_RING_CIRCUMFERENCE = 2 * Math.PI * 32;

  const currentMessage = MOCK_CHAT_MESSAGES[currentMessageIndex];
  const currentWords = getWords(currentMessage.text);
  const isMessageComplete = visibleWords >= currentWords.length;
  const showInputArea = currentMessageIndex === 0 && isMessageComplete;
  const allDone = currentMessageIndex === 2 && isMessageComplete;

  // Start animation only when the chat section is visible
  useEffect(() => {
    const el = chatSectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setAnimationStarted(true);
      },
      { threshold: 0.2, rootMargin: "0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Real-time Feedback: start ring + number animation when section is in view
  useEffect(() => {
    const el = feedbackSectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setFeedbackInView(true);
      },
      { threshold: 0.2, rootMargin: "0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const shouldRun = feedbackInView || feedbackReplayCount > 0;
    if (!shouldRun) return;
    const duration = 1500;
    const start = performance.now();
    let rafId: number;
    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      const easeOut = 1 - (1 - t) * (1 - t);
      setFeedbackRingProgress(easeOut);
      if (t < 1) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [feedbackInView, feedbackReplayCount]);
  const handleFeedbackReplay = () => {
    setFeedbackRingProgress(0);
    setFeedbackAnalyzingVisible(true);
    setFeedbackArrowVisible(true);
    // Даём один кадр отрисовать progress=0, затем запускаем анимацию заново
    requestAnimationFrame(() => {
      setFeedbackReplayCount((c) => c + 1);
    });
  };

  // Analyzing hangs a bit, then Analyzing and arrow fade out together
  useEffect(() => {
    if (feedbackRingProgress < 1) return;
    const t = setTimeout(() => {
      setFeedbackAnalyzingVisible(false);
      setFeedbackArrowVisible(false);
    }, 400);
    return () => clearTimeout(t);
  }, [feedbackRingProgress]);

  // Typing effect (runs only after section is in view)
  useEffect(() => {
    if (!animationStarted || isMessageComplete) return;
    const t = setTimeout(() => setVisibleWords((w) => w + 1), TYPING_MS_PER_WORD);
    return () => clearTimeout(t);
  }, [animationStarted, currentMessageIndex, visibleWords, isMessageComplete]);

  // After second message (user reply) completes, auto-advance to third message
  useEffect(() => {
    if (!animationStarted || currentMessageIndex !== 1 || !isMessageComplete) return;
    const t = setTimeout(() => {
      setCurrentMessageIndex(2);
      setVisibleWords(0);
    }, PAUSE_BEFORE_THIRD_MSG_MS);
    return () => clearTimeout(t);
  }, [animationStarted, currentMessageIndex, isMessageComplete]);

  const paintedIndex = pathItems.findIndex((item) => item.phase === "painted");
  const firstIdleIndex = pathItems.findIndex((item) => item.phase === "idle");
  const allCompleted = pathItems.every((item) => item.phase === "complete" || item.phase === "done");
  const canLearn = firstIdleIndex !== -1 && paintedIndex === -1;
  const [showConfetti, setShowConfetti] = useState(false);

  // Learn click: +20% for first non-completed topic (skip first two — they are static). Progress stays multiple of 20.
  const handleLearn = () => {
    if (!canLearn) return;
    const i = firstIdleIndex;
    setPathItems((prev) => {
      const next = [...prev];
      const item = next[i];
      const newProgress = Math.min(item.progress + LEARN_PROGRESS_STEP, 100);
      next[i] = {
        ...item,
        progress: newProgress,
        phase: newProgress >= 100 ? ("painted" as PathPhase) : item.phase,
      };
      return next;
    });
  };

  // When painted -> after 600ms set done (green animation finished) + confetti
  useEffect(() => {
    if (paintedIndex === -1) return;
    const t = setTimeout(() => {
      setPathItems((prev) =>
        prev.map((p, i) => (i === paintedIndex ? { ...p, phase: "done" as PathPhase } : p))
      );
      setShowConfetti(true);
    }, 600);
    return () => clearTimeout(t);
  }, [paintedIndex]);

  useEffect(() => {
    if (!showConfetti) return;
    const t = setTimeout(() => setShowConfetti(false), 1400);
    return () => clearTimeout(t);
  }, [showConfetti]);

  const handlePathReplay = () => {
    setPathItems(INITIAL_PATH_ITEMS.map((item) => ({ ...item })));
  };

  const getPathStatus = (item: (typeof pathItems)[0]) => {
    if (item.phase === "complete" || item.phase === "done") return "Completed";
    if (item.phase === "painted") return "In Progress";
    if (item.progress === 0) return "Upcoming";
    return "In Progress";
  };

  const handleSend = () => {
    if (currentMessageIndex !== 0 || !isMessageComplete) return;
    setCurrentMessageIndex(1);
    setVisibleWords(0);
  };

  const handleReplay = () => {
    setCurrentMessageIndex(0);
    setVisibleWords(0);
  };

  return (
    <div className="space-y-0">
      {/* Feature 1: Curated Questions */}
      <section className="py-16 lg:py-20 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-border bg-card text-xs font-mono text-muted-foreground">
                <Code2 className="h-3.5 w-3.5" />
                QUESTION LIBRARY
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                500+ curated questions from top tech companies
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                Practice with real interview questions asked at Google, Amazon, Meta, Microsoft,
                and other top tech companies. Each question includes detailed solutions, time
                complexity analysis, and follow-up questions.
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-foreground" />
                  Questions categorized by topic and difficulty
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-foreground" />
                  Multiple solutions with trade-off analysis
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-foreground" />
                  Company-specific question sets
                </li>
              </ul>
              <Button variant="outline" className="mt-4 bg-transparent">
                Browse Questions
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {/* Visual - Question cards stack */}
            <div className="relative">
              <div className="space-y-4">
                {[
                  { title: "Two Sum", difficulty: "Easy", company: "Amazon", topic: "Arrays" },
                  { title: "LRU Cache", difficulty: "Medium", company: "Google", topic: "Design" },
                  { title: "Merge K Sorted Lists", difficulty: "Hard", company: "Meta", topic: "Heap" },
                ].map((q, i) => (
                  <div
                    key={q.title}
                    className="bg-card border border-border p-5 flex items-center justify-between hover:border-foreground/20 transition-colors"
                    style={{ marginLeft: `${i * 12}px` }}
                  >
                    <div className="space-y-1">
                      <div className="font-medium text-foreground">{q.title}</div>
                      <div className="text-sm text-muted-foreground">{q.topic}</div>
                    </div>
                    <div className="text-right space-y-1">
                      <div className={`text-sm font-mono ${q.difficulty === "Easy" ? "text-foreground/60" :
                          q.difficulty === "Medium" ? "text-foreground/80" :
                            "text-foreground"
                        }`}>
                        {q.difficulty}
                      </div>
                      <div className="text-xs text-muted-foreground">{q.company}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="absolute -bottom-4 left-8 right-8 h-8 bg-card/50 border border-border -z-10" />
              <div className="absolute -bottom-8 left-16 right-16 h-8 bg-card/30 border border-border -z-20" />
            </div>
          </div>
        </div>
      </section>

      {/* Feature 2: AI Mock Interviews */}
      <section
        ref={chatSectionRef}
        className="py-16 lg:py-20 px-6 border-t border-border bg-card/30"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Visual - Chat (fixed height, never shifts; replay slot reserved below) */}
            <div className="order-2 lg:order-1 flex flex-col shrink-0">
              <div
                className="bg-card border border-border overflow-hidden flex flex-col shrink-0"
                style={{
                  height: CHAT_WINDOW_HEIGHT + 44 + 52,
                  minHeight: CHAT_WINDOW_HEIGHT + 44 + 52,
                }}
              >
                <div className="px-4 py-3 border-b border-border flex items-center gap-2 shrink-0 h-11">
                  <Brain className="h-4 w-4 text-foreground" />
                  <span className="text-sm font-medium text-foreground">AI Interviewer</span>
                </div>
                <div
                  className="p-6 space-y-4 overflow-y-auto shrink-0 min-h-0"
                  style={{ height: CHAT_WINDOW_HEIGHT }}
                >
                  {MOCK_CHAT_MESSAGES.map((msg, index) => {
                    const isCurrent = index === currentMessageIndex;
                    const isPast = index < currentMessageIndex;
                    const words = getWords(msg.text);
                    const showBubble = isPast || (isCurrent && visibleWords > 0);
                    if (!showBubble) return null;

                    const displayText = isPast
                      ? msg.text
                      : words.slice(0, visibleWords).join(" ");
                    const showCursor = isCurrent && visibleWords < words.length;

                    return (
                      <div
                        key={index}
                        className={`flex gap-3 animate-fade-in ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                      >
                        {msg.role === "ai" ? (
                          <div className="w-8 h-8 bg-secondary flex items-center justify-center shrink-0">
                            <Brain className="h-4 w-4 text-muted-foreground" />
                          </div>
                        ) : (
                          <div className="w-8 h-8 bg-foreground flex items-center justify-center shrink-0">
                            <span className="text-xs font-bold text-background">You</span>
                          </div>
                        )}
                        <div
                          className={`p-3 text-sm text-foreground ${
                            msg.role === "user"
                              ? "bg-secondary/50 border border-border"
                              : "bg-secondary"
                          }`}
                        >
                          {displayText}
                          {showCursor && (
                            <span className="inline-block w-2 h-4 ml-0.5 -mb-0.5 bg-foreground animate-pulse" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="px-4 py-3 border-t border-border shrink-0 bg-card h-[52px] flex items-center gap-2 min-h-[52px]">
                  <input
                    type="text"
                    disabled
                    placeholder="Type your answer..."
                    className="flex-1 h-9 px-3 rounded-md border border-border bg-secondary/50 text-sm text-muted-foreground placeholder:text-muted-foreground/70 cursor-not-allowed"
                    readOnly
                    tabIndex={-1}
                    aria-readonly
                  />
                  <div className="relative shrink-0 flex flex-col items-center">
                    <Button
                      size="icon"
                      variant="outline"
                      className={`h-9 w-9 relative ${showInputArea ? "btn-send-shine cursor-pointer" : ""} ${!showInputArea ? "cursor-not-allowed" : ""}`}
                      onClick={handleSend}
                      type="button"
                      disabled={!showInputArea}
                    >
                      <Send className="h-4 w-4 relative z-10" />
                    </Button>
                  </div>
                  <Button
                    size="icon"
                    variant="outline"
                    className="shrink-0 h-9 w-9"
                    type="button"
                    disabled
                    aria-label="Voice input"
                  >
                    <Mic className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="px-4 flex items-center gap-2 shrink-0 h-7 min-h-7">
                <div className="flex-1 min-w-0" />
                <div className="w-9 flex justify-center items-center">
                  <span
                    className={`flex items-center gap-1 text-xs font-medium text-muted-foreground/80 -translate-x-[19px] transition-opacity duration-300 ${showInputArea ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                    aria-hidden
                  >
                    Press
                    <ChevronDown className="h-3.5 w-3.5 rotate-180" />
                  </span>
                </div>
                <div className="w-9 shrink-0" />
              </div>
              <div className="mt-1 h-6 flex items-center justify-center shrink-0">
                {allDone ? (
                  <button
                    type="button"
                    onClick={handleReplay}
                    className="flex items-center justify-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors animate-fade-in"
                    aria-label="Replay demo"
                  >
                    <span>Replay</span>
                    <RefreshCw className="h-3.5 w-3.5 opacity-100" />
                  </button>
                ) : null}
              </div>
            </div>

            <div className="space-y-6 order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-border bg-card text-xs font-mono text-muted-foreground">
                <Brain className="h-3.5 w-3.5" />
                AI MOCK INTERVIEWS
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                Practice with an AI that interviews like a human
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                Our AI interviewer simulates real interview scenarios, asks follow-up questions,
                provides hints when you&apos;re stuck, and gives detailed feedback on your communication
                and problem-solving approach.
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-foreground" />
                  Realistic conversational interview experience
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-foreground" />
                  Adaptive difficulty based on your responses
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-foreground" />
                  Detailed post-interview analysis
                </li>
              </ul>
              <Button variant="outline" className="mt-4 bg-transparent">
                Try Mock Interview
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 3: Personalized Learning */}
      <section className="py-16 lg:py-20 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-border bg-card text-xs font-mono text-muted-foreground">
                <Target className="h-3.5 w-3.5" />
                PERSONALIZED PATHS
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                A learning path tailored to your goals
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                Take an assessment to identify your strengths and weaknesses. We&apos;ll create
                a personalized study plan that focuses on the topics you need to master,
                with a timeline based on your target interview date.
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-foreground" />
                  Skill gap analysis and recommendations
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-foreground" />
                  Daily practice goals and reminders
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-foreground" />
                  Progress tracking across all topics
                </li>
              </ul>
              <Button variant="outline" className="mt-4 bg-transparent">
                Take Assessment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {/* Visual - Learning path: Learn button (hidden when all done), fixed-height slot so card doesn't move */}
            <div className="relative flex flex-col gap-4">
              <div className="relative self-center min-h-[52px] flex items-center justify-center">
                {!allCompleted && (
                  <>
                    {showConfetti && (
                      <div
                        className="absolute inset-0 flex items-center justify-center pointer-events-none min-w-[140px] min-h-[48px] -m-2"
                        aria-hidden
                      >
                        {CONFETTI_PARTICLES.map((p, i) => (
                          <div
                            key={i}
                            className="confetti-particle"
                            style={{
                              backgroundColor: p.color,
                              ["--cx" as string]: `${p.x}px`,
                              ["--cy" as string]: `${p.y}px`,
                            }}
                          />
                        ))}
                      </div>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-transparent"
                      onClick={handleLearn}
                      disabled={!canLearn}
                    >
                      <BookOpen className="h-4 w-4" />
                      Learn
                    </Button>
                  </>
                )}
              </div>
              <div className="bg-card border border-border p-6 rounded-none">
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-medium text-foreground">Your Learning Path</span>
                    <span className="text-sm text-muted-foreground">Week 3 of 8</span>
                  </div>
                  <div className="space-y-4">
                    {pathItems.map((item) => (
                      <div key={item.topic} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className={item.progress > 0 ? "text-foreground" : "text-muted-foreground"}>
                            {item.topic}
                          </span>
                          <span className="text-muted-foreground text-xs">{getPathStatus(item)}</span>
                        </div>
                        <div className="h-1.5 bg-secondary overflow-hidden">
                          <div
                            className="h-full bg-foreground transition-all duration-300 ease-out relative"
                            style={{ width: `${item.progress}%` }}
                          >
                            {(item.phase === "complete" || item.phase === "painted" || item.phase === "done") && (
                              <div
                                className={`absolute inset-0 bg-green-500 origin-left ${item.phase === "painted" ? "animate-trees-green-paint" : "w-full"}`}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
              </div>
              <div className="mt-1 h-6 min-h-6 flex items-center justify-center shrink-0">
                {allCompleted ? (
                  <button
                    type="button"
                    onClick={handlePathReplay}
                    className="flex items-center justify-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors animate-fade-in"
                    aria-label="Replay learning path"
                  >
                    <span>Replay</span>
                    <RefreshCw className="h-3.5 w-3.5 opacity-100" />
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 4: Real-time Feedback - Eye-catching design */}
      <section ref={feedbackSectionRef} className="py-16 lg:py-20 px-6 border-t border-border bg-card/30 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-foreground/[0.02] rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-foreground/[0.02] rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Visual - Enhanced Code Analysis Terminal */}
            <div className="order-2 lg:order-1">
              <div className="relative max-w-[520px] mx-auto">
                <div className="relative bg-card border border-border overflow-hidden">
                  {/* Terminal header — title centered and fixed; status has fixed width so title doesn't shift */}
                  <div className="relative flex items-center px-4 py-3 border-b border-border bg-secondary/50">
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="w-3 h-3 rounded-full bg-muted-foreground/30 hover:bg-red-500/70 transition-colors" />
                      <div className="w-3 h-3 rounded-full bg-muted-foreground/30 hover:bg-yellow-500/70 transition-colors" />
                      <div className="w-3 h-3 rounded-full bg-muted-foreground/30 hover:bg-green-500/70 transition-colors" />
                    </div>
                    <span className="absolute left-1/2 -translate-x-1/2 text-xs font-mono text-muted-foreground pointer-events-none">
                      analysis.java
                    </span>
                    <div className="relative z-10 w-[7.5rem] shrink-0 flex items-center justify-end gap-2 overflow-visible ml-auto">
                      {/* Analyzing: smooth collapse when hidden */}
                      <span
                        className={`shrink-0 overflow-hidden text-xs font-mono text-muted-foreground/70 transition-[max-width,opacity] duration-700 ease-in-out ${
                          feedbackRingProgress >= 1 && !feedbackAnalyzingVisible ? "max-w-0 opacity-0" : "max-w-[100px] opacity-100"
                        }`}
                        aria-hidden={feedbackRingProgress >= 1 && !feedbackAnalyzingVisible}
                      >
                        Analyzing
                      </span>
                      {/* Arrow + Done: smooth slide-in when progress >= 1, Arrow smooth collapse when hidden */}
                      <span
                        className={`shrink-0 flex items-center gap-2 overflow-hidden transition-[max-width,opacity] duration-700 ease-in-out ${
                          feedbackRingProgress >= 1 ? "max-w-[4.5rem] opacity-100" : "max-w-0 opacity-0"
                        }`}
                        aria-hidden={feedbackRingProgress < 1}
                      >
                        <span
                          className={`shrink-0 overflow-hidden transition-[max-width,opacity] duration-700 ease-in-out ${
                            feedbackArrowVisible ? "max-w-[1.5rem] opacity-100" : "max-w-0 opacity-0"
                          }`}
                          aria-hidden={!feedbackArrowVisible}
                        >
                          <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />
                        </span>
                        <span className="shrink-0 text-xs font-mono text-green-500">Done</span>
                      </span>
                    </div>
                  </div>

                  {/* Code snippet — same style as hero code window */}
                  <div className="p-6 font-mono text-sm bg-background/50 border-b border-border">
                    <div className="flex">
                      <div className="text-muted-foreground/50 select-none pr-4 text-right w-8 shrink-0">
                        {[1, 2, 3, 4, 5, 6, 7].map(n => <div key={n}>{n}</div>)}
                      </div>
                      <div className="text-foreground/90 overflow-hidden">
                        <div><span className="text-foreground">public int</span> findMax(<span className="text-foreground">int</span>[] arr) {'{'}</div>
                        <div><span className="text-foreground ml-2">int</span> max = arr[0];</div>
                        <div><span className="text-foreground ml-2">for</span> (<span className="text-foreground">int</span> n : arr) {'{'}</div>
                        <div><span className="text-foreground ml-6">if</span> (n {'>'} max) max = n;</div>
                        <div><span className="text-foreground ml-2"></span>{'}'}</div>
                        <div><span className="text-foreground ml-2">return</span> max;</div>
                        <div><span className="text-foreground"></span>{'}'}</div>
                      </div>
                    </div>
                  </div>

                  {/* Analysis results with visual metrics */}
                  <div className="p-5 space-y-5">
                    {/* Score ring — clockwise fill + number count-up */}
                    <div className="flex items-center gap-5">
                      <div className="relative w-20 h-20 shrink-0">
                        <svg className="w-20 h-20 -rotate-90" aria-hidden>
                          <circle cx="40" cy="40" r="32" className="fill-none stroke-secondary" strokeWidth="6" />
                          <circle
                            key={feedbackReplayCount}
                            cx="40" cy="40" r="32"
                            className="fill-none stroke-foreground"
                            strokeWidth="6"
                            strokeDasharray={FEEDBACK_RING_CIRCUMFERENCE}
                            strokeDashoffset={FEEDBACK_RING_CIRCUMFERENCE * (1 - (FEEDBACK_TARGET_SCORE / 100) * feedbackRingProgress)}
                            strokeLinecap="butt"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span key={feedbackReplayCount} className="text-xl font-bold text-foreground tabular-nums">
                            {Math.round(FEEDBACK_TARGET_SCORE * feedbackRingProgress)}
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="text-lg font-medium text-foreground">Excellent Solution</div>
                        <div className="text-sm text-muted-foreground">Optimal time complexity achieved</div>
                      </div>
                    </div>

                    {/* Metrics grid */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-secondary/50 p-3 text-center">
                        <div className="text-xs text-muted-foreground mb-1">TIME</div>
                        <div className="text-lg font-mono font-bold text-foreground">O(n)</div>
                      </div>
                      <div className="bg-secondary/50 p-3 text-center">
                        <div className="text-xs text-muted-foreground mb-1">SPACE</div>
                        <div className="text-lg font-mono font-bold text-foreground">O(1)</div>
                      </div>
                      <div className="bg-secondary/50 p-3 text-center">
                        <div className="text-xs text-muted-foreground mb-1">TESTS</div>
                        <div className="text-lg font-mono font-bold text-foreground">12/12</div>
                      </div>
                    </div>

                    {/* Feedback items */}
                    {/* <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-3 p-2 bg-foreground/5 border-l-2 border-foreground">
                        <Zap className="w-4 h-4 text-foreground mt-0.5 shrink-0" />
                        <span className="text-foreground/80">Linear scan - efficient for unsorted arrays</span>
                      </div>
                      <div className="flex items-start gap-3 p-2 bg-foreground/5 border-l-2 border-foreground/50">
                        <MessageSquare className="w-4 h-4 text-foreground/70 mt-0.5 shrink-0" />
                        <span className="text-foreground/60">Consider edge case: empty array input</span>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
              <div className="mt-4 h-6 min-h-6 flex items-center justify-center shrink-0">
                {feedbackRingProgress >= 1 ? (
                  <button
                    type="button"
                    onClick={handleFeedbackReplay}
                    className="flex items-center justify-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors animate-fade-in"
                    aria-label="Replay analysis demo"
                  >
                    <span>Replay</span>
                    <RefreshCw className="h-3.5 w-3.5 opacity-100" />
                  </button>
                ) : null}
              </div>
            </div>

            <div className="space-y-6 order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-border bg-card text-xs font-mono text-muted-foreground">
                <Zap className="h-3.5 w-3.5" />
                REAL-TIME FEEDBACK
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                Instant analysis of your code
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                Get immediate feedback on your solutions including time and space complexity
                analysis, code quality suggestions, and optimization tips. Learn not just
                what works, but how to write better code.
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-foreground" />
                  Automatic complexity analysis
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-foreground" />
                  Code style and best practices
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-foreground" />
                  Edge case detection
                </li>
              </ul>
              <Button variant="outline" className="mt-4 bg-transparent">
                See Example
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
