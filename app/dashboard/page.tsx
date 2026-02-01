import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  BookOpen,
  BarChart3,
  Clock,
  CheckCircle2,
  Play,
} from "lucide-react";

const quickStats = [
  { value: "0", label: "Questions practiced", icon: BookOpen },
  { value: "0", label: "Mock interviews", icon: Play },
  { value: "—", label: "Current streak", icon: BarChart3 },
];

const recentActivity = [
  { title: "Complete your first question", done: false },
  { title: "Take a mock interview", done: false },
  { title: "Review core Java topics", done: false },
];

export default function DashboardPage() {
  return (
    <>
      {/* Same background treatment as landing hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-white/[0.015] rounded-full blur-3xl animate-pulse [animation-delay:1s]" />
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)]" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-16 lg:py-20">
          {/* Welcome block - same typography as hero */}
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
                <Link href="/#features">
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

          {/* Stats row - same as hero stats */}
          <div className="flex items-center gap-8 pt-10 pb-12 border-b border-border animate-fade-in">
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

          {/* Cards grid - same card style as landing */}
          <div className="grid md:grid-cols-2 gap-6 py-12">
            <Card className="border border-border bg-card animate-fade-in-up">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-foreground" />
                  Get started
                </CardTitle>
                <CardDescription>
                  Quick steps to make the most of JavaPrep.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentActivity.map((item, i) => (
                  <div
                    key={item.title}
                    className="flex items-center gap-3 text-sm text-muted-foreground"
                  >
                    <span className="w-6 h-6 rounded-full border border-border bg-secondary/50 flex items-center justify-center text-xs font-mono text-foreground">
                      {i + 1}
                    </span>
                    <span
                      className={
                        item.done
                          ? "text-foreground line-through"
                          : "text-foreground"
                      }
                    >
                      {item.title}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border border-border bg-card animate-fade-in-up">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="h-5 w-5 text-foreground" />
                  Recent activity
                </CardTitle>
                <CardDescription>
                  Your latest practice sessions and progress.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  No activity yet. Start with a question or mock interview to
                  see your progress here.
                </p>
                <Button variant="outline" size="sm" className="mt-4" asChild>
                  <Link href="/#features">Browse topics</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
