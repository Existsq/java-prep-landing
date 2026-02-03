"use client";

import { useState } from "react";
import { BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { THEORY_TOPICS } from "@/lib/mock-dashboard";

export function DashboardTheorySection() {
  const [activeTopic, setActiveTopic] = useState("core");
  const activeData = THEORY_TOPICS.find((t) => t.id === activeTopic);

  return (
    <section className="py-8 lg:py-10 border-t border-border">
      <div>
        <div className="mb-6">
          <div className="inline-flex w-fit items-center gap-2 px-3 py-1.5 border border-border bg-card text-xs font-mono text-muted-foreground mb-3">
            <BookOpen className="h-3.5 w-3.5" />
            THEORY
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
            Comprehensive topic coverage
          </h2>
          <p className="text-muted-foreground max-w-xl">
            From core Java fundamentals to advanced system design concepts.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {THEORY_TOPICS.map((topic) => (
            <button
              key={topic.id}
              onClick={() => setActiveTopic(topic.id)}
              className={cn(
                "px-4 py-2.5 font-medium text-sm transition-colors border",
                activeTopic === topic.id
                  ? "bg-foreground text-background border-foreground"
                  : "bg-transparent text-muted-foreground border-border hover:text-foreground hover:border-foreground/50"
              )}
            >
              {topic.label}
            </button>
          ))}
        </div>

        {activeData && (
          <div className="bg-card border border-border p-5 md:p-6 rounded-lg">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-5 pb-5 border-b border-border">
              <div>
                <h3 className="text-xl font-bold text-foreground mb-1">{activeData.label}</h3>
                <p className="text-muted-foreground text-sm">
                  <span className="font-mono text-foreground">{activeData.questions}</span> practice questions available
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <div className="flex items-center gap-3">
                  <div className="h-1 w-32 bg-secondary overflow-hidden">
                    <div className="h-full bg-foreground" style={{ width: "75%" }} />
                  </div>
                  <span className="text-sm text-muted-foreground font-mono">75%</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeData.items.map((item, index) => (
                <div
                  key={item}
                  className="flex items-center gap-4 p-4 bg-secondary/30 border border-border hover:border-foreground/20 transition-colors"
                >
                  <span className="w-8 h-8 bg-secondary flex items-center justify-center text-muted-foreground font-mono text-sm">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-foreground font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
