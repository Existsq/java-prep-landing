"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Play, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

const stats = [
  { value: "500+", label: "Interview Questions" },
  { value: "50K+", label: "Developers Trained" },
  { value: "92%", label: "Success Rate" },
];

const highlights = [
  "Real questions from Google, Meta, Amazon",
  "AI-powered mock interviews",
  "Personalized learning paths",
];

const codeLines = [
  { indent: 0, content: "public class LRUCache {", type: "code" },
  { indent: 1, content: "private Map<Integer, Node> cache;", type: "code" },
  { indent: 1, content: "private int capacity;", type: "code" },
  { indent: 1, content: "private Node head, tail;", type: "code" },
  { indent: 0, content: "", type: "empty" },
  { indent: 1, content: "public int get(int key) {", type: "code" },
  { indent: 2, content: "if (!cache.containsKey(key))", type: "code" },
  { indent: 3, content: "return -1;", type: "code" },
  { indent: 2, content: "Node node = cache.get(key);", type: "code" },
  { indent: 2, content: "moveToHead(node);", type: "code" },
  { indent: 2, content: "return node.value;", type: "code" },
  { indent: 1, content: "}", type: "code" },
  { indent: 0, content: "}", type: "code" },
];

export function HeroSection() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const lineTimer = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= codeLines.length) {
          clearInterval(lineTimer);
          return prev;
        }
        return prev + 1;
      });
    }, 150);

    return () => clearInterval(lineTimer);
  }, []);

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorTimer);
  }, []);

  return (
    <section className="relative flex items-center overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        {/* Animated glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-white/[0.015] rounded-full blur-3xl animate-pulse [animation-delay:1s]" />
      </div>

      {/* Subtle radial gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left column - Content with staggered animations */}
          <div className="space-y-8">
            {/* Badge */}
            <div 
              className="inline-flex items-center gap-3 px-4 py-2 border border-border bg-card animate-fade-in"
              style={{ animationDelay: "0.1s", animationFillMode: "both" }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-foreground opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-foreground" />
              </span>
              <span className="text-sm font-mono text-muted-foreground">
                Trusted by 50,000+ developers
              </span>
            </div>

            {/* Main heading */}
            <div 
              className="space-y-4 animate-fade-in-up"
              style={{ animationDelay: "0.2s", animationFillMode: "both" }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
                <span className="text-foreground">Crack your</span>
                <br />
                <span className="text-foreground">Java interview.</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
                The most comprehensive platform to prepare for Java developer
                interviews. Practice with real questions, get AI feedback, and
                land your dream job.
              </p>
            </div>

            {/* Highlights with staggered entrance */}
            <ul className="space-y-3">
              {highlights.map((item, i) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-muted-foreground animate-fade-in-left"
                  style={{ animationDelay: `${0.4 + i * 0.1}s`, animationFillMode: "both" }}
                >
                  <CheckCircle2 className="h-5 w-5 text-foreground shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* CTA Buttons */}
            <div 
              className="flex flex-col sm:flex-row items-start gap-4 pt-4 animate-fade-in-up"
              style={{ animationDelay: "0.7s", animationFillMode: "both" }}
            >
              <Button size="lg" className="h-14 px-8 text-base font-medium group">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-14 px-8 text-base font-medium bg-transparent group"
              >
                <Play className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                Watch Demo
              </Button>
            </div>

            {/* Stats with counter animation */}
            <div 
              className="flex items-center gap-8 pt-8 border-t border-border animate-fade-in"
              style={{ animationDelay: "0.9s", animationFillMode: "both" }}
            >
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column - Animated Terminal */}
          <div 
            className="relative lg:pl-8 animate-fade-in-up"
            style={{ animationDelay: "0.3s", animationFillMode: "both" }}
          >
            {/* Terminal window - fixed size */}
            <div className="relative bg-card border border-border overflow-hidden w-full max-w-[520px] mx-auto lg:mx-0">
              {/* Terminal header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-secondary/50">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-muted-foreground/30 hover:bg-red-500/70 transition-colors" />
                  <div className="w-3 h-3 rounded-full bg-muted-foreground/30 hover:bg-yellow-500/70 transition-colors" />
                  <div className="w-3 h-3 rounded-full bg-muted-foreground/30 hover:bg-green-500/70 transition-colors" />
                </div>
                <span className="text-xs font-mono text-muted-foreground">
                  LRUCache.java
                </span>
                <div className="w-16" />
              </div>

              {/* Code content with typing animation */}
              <div className="p-6 font-mono text-sm h-[340px] overflow-hidden">
                {codeLines.map((line, index) => (
                  <div
                    key={index}
                    className={`transition-all duration-300 ${
                      index < visibleLines 
                        ? "opacity-100 translate-y-0" 
                        : "opacity-0 translate-y-2"
                    }`}
                    style={{ paddingLeft: `${line.indent * 16}px` }}
                  >
                    {line.type === "comment" ? (
                      <span className="text-muted-foreground">{line.content}</span>
                    ) : line.type === "empty" ? (
                      <span>&nbsp;</span>
                    ) : (
                      <span className="text-foreground/90">{line.content}</span>
                    )}
                    {index === visibleLines - 1 && visibleLines < codeLines.length && (
                      <span 
                        className={`inline-block w-2 h-4 bg-foreground ml-0.5 -mb-0.5 ${
                          cursorVisible ? "opacity-100" : "opacity-0"
                        }`} 
                      />
                    )}
                  </div>
                ))}
                {visibleLines >= codeLines.length && (
                  <span 
                    className={`inline-block w-2 h-4 bg-foreground ml-0.5 -mb-0.5 ${
                      cursorVisible ? "opacity-100" : "opacity-0"
                    }`} 
                  />
                )}
              </div>

              {/* Bottom bar */}
              <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-secondary/30">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono text-muted-foreground">
                    Difficulty: Medium
                  </span>
                  <span className="text-xs font-mono text-muted-foreground">
                    Topic: Data Structures
                  </span>
                </div>
                <span className="text-xs font-mono text-foreground">
                  Amazon, Google, Meta
                </span>
              </div>
            </div>

            {/* Floating cards with animation */}
            <div 
              className="absolute -bottom-6 -left-6 bg-card border border-border p-4 max-w-[200px] animate-float"
              style={{ animationDelay: "1s" }}
            >
              <div className="text-sm font-medium text-foreground mb-1">
                Next Question
              </div>
              <div className="text-xs text-muted-foreground">
                Binary Tree Level Order Traversal
              </div>
            </div>

            <div 
              className="absolute -top-4 -right-4 bg-card border border-border p-3 animate-float"
              style={{ animationDelay: "1.5s" }}
            >
              <div className="text-xs font-mono text-muted-foreground">Success Rate</div>
              <div className="text-lg font-bold text-foreground">92%</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
