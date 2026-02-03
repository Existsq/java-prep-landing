import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  BarChart3,
  Play,
  Brain,
  Crown,
  MessageSquarePlus,
} from "lucide-react";
import { DashboardTheorySection } from "@/components/dashboard-theory-section";
import { PRACTICE_TASKS } from "@/lib/mock-dashboard";
import { cn } from "@/lib/utils";

const quickStats = [
  { value: "0", label: "Questions practiced", icon: BookOpen },
  { value: "0", label: "Mock interviews", icon: Play },
  { value: "—", label: "Current streak", icon: BarChart3 },
];

/** Mock list of user's interview sessions; empty = show "Start new" */
const MOCK_INTERVIEW_CHATS: { id: string; title: string }[] = [];

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

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-10 lg:py-12">
          {/* Header: greeting + stats */}
          <div className="flex flex-wrap items-end justify-between gap-6 pb-6 border-b border-border animate-fade-in-up">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                Welcome back
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Overview of your practice and progress.
              </p>
            </div>
            <div className="inline-flex items-center gap-3 px-4 py-3 border border-border bg-card">
              <Crown className="h-5 w-5 text-foreground" />
              <span className="text-sm font-medium text-foreground">Current plan:</span>
              <span className="text-sm font-mono text-muted-foreground">Pro (Paid)</span>
            </div>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap items-center gap-8 pt-6 pb-2 animate-fade-in">
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

          {/* Theory section */}
          <DashboardTheorySection />

          {/* Practice section */}
          <section id="practice" className="py-8 lg:py-10 border-t border-border">
            <div>
              <div className="mb-6">
                <div className="inline-flex w-fit items-center gap-2 px-3 py-1.5 border border-border bg-card text-xs font-mono text-muted-foreground mb-3">
                  <Play className="h-3.5 w-3.5" />
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
                  <Link href={`/dashboard/practice/${PRACTICE_TASKS[0].id}?list=1`}>
                    View All
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          {/* AI Mock Interview section */}
          <section className="py-8 lg:py-10 border-t border-border bg-card/30">
            <div>
              <div className="grid lg:grid-cols-2 gap-8 items-stretch">
                <div className="flex flex-col justify-center">
                  <div className="inline-flex w-fit items-center gap-2 px-3 py-1.5 border border-border bg-card text-xs font-mono text-muted-foreground mb-3">
                    <Brain className="h-3.5 w-3.5" />
                    AI MOCK INTERVIEW
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-foreground leading-tight mb-2">
                    Practice with an AI interviewer
                  </h2>
                  <p className="text-sm text-muted-foreground max-w-md mb-4">
                    Set up your preferences and run a mock interview. Start a new one or continue from the list.
                  </p>
                  <Button variant="outline" className="bg-transparent w-fit" asChild>
                    <Link href="/dashboard/mock-interview" className="gap-2">
                      <MessageSquarePlus className="h-4 w-4" />
                      Start new interview
                    </Link>
                  </Button>
                </div>

                {/* Chat list panel */}
                <div className="bg-card border border-border flex flex-col min-h-[200px]">
                  <div className="px-4 py-3 border-b border-border flex items-center justify-between shrink-0">
                    <span className="text-sm font-medium text-foreground">My interviews</span>
                  </div>
                  {MOCK_INTERVIEW_CHATS.length > 0 ? (
                    <ul className="flex-1 p-2 overflow-y-auto min-h-[160px]">
                      {MOCK_INTERVIEW_CHATS.map((chat) => (
                        <li key={chat.id}>
                          <Link
                            href={`/dashboard/mock-interview/session`}
                            className="block px-3 py-2.5 text-sm text-foreground border border-border rounded-lg mb-2 hover:border-foreground/30 hover:bg-secondary/30 transition-colors"
                          >
                            {chat.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="flex-1 p-4 flex flex-col items-center justify-center min-h-[160px]">
                      <p className="text-sm text-muted-foreground mb-3">No interviews yet</p>
                      <Button variant="outline" size="sm" className="gap-2" asChild>
                        <Link href="/dashboard/mock-interview">
                          <MessageSquarePlus className="h-4 w-4" />
                          Start new
                        </Link>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
