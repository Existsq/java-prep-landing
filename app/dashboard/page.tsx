import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BookOpen,
  BarChart3,
  Play,
  Brain,
  Crown,
} from "lucide-react";
import { DashboardTheorySection } from "@/components/dashboard-theory-section";
import { PRACTICE_TASKS } from "@/lib/mock-dashboard";
import { cn } from "@/lib/utils";

const quickStats = [
  { value: "0", label: "Questions practiced", icon: BookOpen },
  { value: "0", label: "Mock interviews", icon: Play },
  { value: "—", label: "Current streak", icon: BarChart3 },
];

export default function DashboardPage() {
  return (
    <>
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-white/[0.015] rounded-full blur-3xl animate-pulse [animation-delay:1s]" />
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)]" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-16 lg:py-20">
          {/* Welcome block */}
          <div className="space-y-6 animate-fade-in-up">
            <div className="inline-flex items-center gap-3 px-4 py-2 border border-border bg-card rounded-lg">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-foreground opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-foreground" />
              </span>
              <span className="text-sm font-mono text-muted-foreground">
                Dashboard
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-foreground">
                Welcome back.
              </h1>
              <p className="text-xl text-muted-foreground max-w-xl leading-relaxed">
                Pick up where you left off. Practice questions, run mock
                interviews, and track your progress.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-4 pt-2">
              <Button size="lg" className="h-12 px-6 text-base font-medium group" asChild>
                <Link href="/dashboard#practice">
                  Start practicing
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-12 px-6 text-base font-medium bg-transparent"
                asChild
              >
                <Link href="/#pricing">View plans</Link>
              </Button>
            </div>
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-8 pt-10 pb-8 border-b border-border animate-fade-in">
            {quickStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg border border-border bg-card flex items-center justify-center">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Subscription placeholder */}
          <div className="py-8 border-b border-border">
            <div className="inline-flex items-center gap-3 px-4 py-3 border border-border bg-card rounded-lg">
              <Crown className="h-5 w-5 text-foreground" />
              <span className="text-sm font-medium text-foreground">Current plan:</span>
              <span className="text-sm font-mono text-muted-foreground">Pro (Paid)</span>
            </div>
          </div>

          {/* Theory section */}
          <DashboardTheorySection />

          {/* Practice section */}
          <section id="practice" className="py-12 lg:py-16 border-t border-border">
            <div>
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-border bg-card text-xs font-mono text-muted-foreground mb-3">
                  PRACTICE
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                  Question library
                </h2>
                <p className="text-muted-foreground max-w-xl">
                  Solve curated questions from top tech companies.
                </p>
              </div>

              <div className="max-w-4xl">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-h-[220px] overflow-y-auto pr-1">
                  {PRACTICE_TASKS.map((task) => (
                    <Link
                      key={task.id}
                      href={`/dashboard/practice/${task.id}`}
                      className="block bg-card border border-border rounded-lg p-3 hover:border-foreground/20 transition-colors"
                    >
                      <div className="font-medium text-foreground text-sm truncate" title={task.title}>
                        {task.title}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">{task.topic}</div>
                      <div
                        className={cn(
                          "text-xs font-mono mt-1",
                          task.difficulty === "Easy" && "text-foreground/60",
                          task.difficulty === "Medium" && "text-foreground/80",
                          task.difficulty === "Hard" && "text-foreground"
                        )}
                      >
                        {task.difficulty}
                      </div>
                    </Link>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="mt-4" asChild>
                  <Link href="/dashboard/practice">View All</Link>
                </Button>
              </div>
            </div>
          </section>

          {/* AI Mock Interview section */}
          <section className="py-12 lg:py-16 border-t border-border bg-card/30">
            <div>
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-border bg-card text-xs font-mono text-muted-foreground">
                    <Brain className="h-3.5 w-3.5" />
                    AI MOCK INTERVIEW
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
                    Practice with an AI that interviews like a human
                  </h2>
                  <p className="text-muted-foreground leading-relaxed max-w-lg">
                    Our AI interviewer simulates real interview scenarios, asks follow-up questions,
                    provides hints when you&apos;re stuck, and gives detailed feedback on your communication
                    and problem-solving approach.
                  </p>
                  <Button variant="outline" className="bg-transparent" asChild>
                    <Link href="/dashboard/mock-interview">
                      Start mock interview
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                {/* Preview card - chat mock */}
                <div className="bg-card border border-border overflow-hidden">
                  <div className="px-4 py-3 border-b border-border flex items-center gap-2">
                    <Brain className="h-4 w-4 text-foreground" />
                    <span className="text-sm font-medium text-foreground">AI Interviewer</span>
                  </div>
                  <div className="p-4 space-y-4 min-h-[140px]">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-secondary flex items-center justify-center shrink-0">
                        <Brain className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="p-3 text-sm text-foreground bg-secondary max-w-[80%]">
                        Hello! Let&apos;s start with a short intro. Tell me about a recent project you worked on.
                      </div>
                    </div>
                    <div className="flex gap-3 flex-row-reverse">
                      <div className="w-8 h-8 bg-foreground flex items-center justify-center shrink-0">
                        <span className="text-xs font-bold text-background">You</span>
                      </div>
                      <div className="p-3 text-sm text-foreground bg-secondary/50 border border-border max-w-[80%]">
                        I led the migration to Java 17...
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
