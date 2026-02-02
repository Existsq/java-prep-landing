import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PRACTICE_TASKS } from "@/lib/mock-dashboard";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PracticeListPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <Button variant="ghost" size="sm" className="gap-2 mb-4" asChild>
          <Link href="/dashboard#practice">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
          Question library
        </h1>
        <p className="text-muted-foreground">
          All practice questions from top tech companies.
        </p>
      </div>

      <div className="space-y-3">
        {PRACTICE_TASKS.map((task) => (
          <Link
            key={task.id}
            href={`/dashboard/practice/${task.id}`}
            className="block bg-card border border-border rounded-lg p-4 hover:border-foreground/20 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="font-medium text-foreground">{task.title}</div>
                <div className="text-sm text-muted-foreground">{task.topic}</div>
              </div>
              <div className="text-right space-y-1">
                <div
                  className={cn(
                    "text-sm font-mono",
                    task.difficulty === "Easy" && "text-foreground/60",
                    task.difficulty === "Medium" && "text-foreground/80",
                    task.difficulty === "Hard" && "text-foreground"
                  )}
                >
                  {task.difficulty}
                </div>
                <div className="text-xs text-muted-foreground">{task.company}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
