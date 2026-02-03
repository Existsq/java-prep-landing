"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PRACTICE_TASKS, type PracticeTask } from "@/lib/mock-dashboard";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

const TOPICS = Array.from(
  new Set(PRACTICE_TASKS.map((t) => t.topic))
).sort();
const DIFFICULTIES = ["Easy", "Medium", "Hard"] as const;

function filterTasks(
  tasks: PracticeTask[],
  search: string,
  topic: string,
  difficulty: string
): PracticeTask[] {
  return tasks.filter((task) => {
    const matchSearch =
      !search.trim() ||
      task.title.toLowerCase().includes(search.toLowerCase().trim()) ||
      task.topic.toLowerCase().includes(search.toLowerCase().trim()) ||
      task.company.toLowerCase().includes(search.toLowerCase().trim());
    const matchTopic = !topic || task.topic === topic;
    const matchDifficulty = !difficulty || task.difficulty === difficulty;
    return matchSearch && matchTopic && matchDifficulty;
  });
}

export function PracticeTaskListSidebar({
  open,
  onOpenChange,
  currentTaskId,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentTaskId: string;
}) {
  const [search, setSearch] = useState("");
  const [topic, setTopic] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("");

  const filtered = useMemo(
    () => filterTasks(PRACTICE_TASKS, search, topic, difficulty),
    [search, topic, difficulty]
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full max-w-md sm:max-w-md flex flex-col p-0 gap-0"
      >
        <SheetHeader className="p-4 pb-0 pr-12 shrink-0">
          <SheetTitle className="text-lg">Question library</SheetTitle>
        </SheetHeader>

        {/* Search + filters */}
        <div className="p-4 space-y-3 shrink-0 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by title, topic, company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Select value={topic || "all"} onValueChange={(v) => setTopic(v === "all" ? "" : v)}>
              <SelectTrigger className="w-[130px] h-8 text-xs">
                <SelectValue placeholder="Topic" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All topics</SelectItem>
                {TOPICS.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={difficulty || "all"} onValueChange={(v) => setDifficulty(v === "all" ? "" : v)}>
              <SelectTrigger className="w-[120px] h-8 text-xs">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {DIFFICULTIES.map((d) => (
                  <SelectItem key={d} value={d}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Task list */}
        <ScrollArea className="flex-1 min-h-0">
          <div className="p-3 space-y-1">
            {filtered.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 text-center">
                No tasks match your filters.
              </p>
            ) : (
              filtered.map((task) => (
                <Link
                  key={task.id}
                  href={`/dashboard/practice/${task.id}`}
                  onClick={() => onOpenChange(false)}
                  className={cn(
                    "block rounded-lg border p-3 transition-colors",
                    task.id === currentTaskId
                      ? "border-foreground/40 bg-secondary/80"
                      : "border-border bg-card hover:border-foreground/20 hover:bg-card/80"
                  )}
                >
                  <div className="font-medium text-foreground text-sm truncate">
                    {task.title}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {task.topic} · {task.company}
                  </div>
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
              ))
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
