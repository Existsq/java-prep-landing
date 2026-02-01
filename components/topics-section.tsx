"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const topics = [
  {
    id: "core",
    label: "Core Java",
    questions: 120,
    items: ["OOP Concepts", "Collections Framework", "Exception Handling", "Multithreading", "JVM Internals"],
  },
  {
    id: "advanced",
    label: "Advanced Java",
    questions: 85,
    items: ["Generics", "Lambda Expressions", "Streams API", "Reflection", "Annotations"],
  },
  {
    id: "spring",
    label: "Spring Framework",
    questions: 95,
    items: ["Spring Boot", "Spring MVC", "Spring Security", "Spring Data JPA", "Microservices"],
  },
  {
    id: "dsa",
    label: "Data Structures",
    questions: 150,
    items: ["Arrays & Strings", "LinkedLists", "Trees & Graphs", "Dynamic Programming", "Sorting & Searching"],
  },
  {
    id: "design",
    label: "System Design",
    questions: 45,
    items: ["Design Patterns", "Scalability", "Database Design", "API Design", "Distributed Systems"],
  },
];

export function TopicsSection() {
  const [activeTopic, setActiveTopic] = useState("core");
  const activeData = topics.find((t) => t.id === activeTopic);

  return (
    <section className="py-16 lg:py-20 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-border bg-card text-xs font-mono text-muted-foreground mb-6">
            TOPICS
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Comprehensive topic coverage
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From core Java fundamentals to advanced system design concepts.
          </p>
        </div>

        {/* Topic tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {topics.map((topic) => (
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

        {/* Active topic content */}
        {activeData && (
          <div className="bg-card border border-border p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-8 border-b border-border">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">{activeData.label}</h3>
                <p className="text-muted-foreground">
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

            {/* Topic items */}
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
