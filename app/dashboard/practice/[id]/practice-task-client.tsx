"use client";

import Link from "next/link";
import { use, useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PracticeTaskListSidebar } from "@/components/practice-task-list-sidebar";
import { List, Play, Send, Zap } from "lucide-react";
import { getPracticeTaskDetail } from "@/lib/mock-practice";

type RunStatus = "idle" | "running" | "done";

export function PracticeTaskClient({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const searchParams = useSearchParams();
  const initialOpenList = searchParams.get("list") === "1";

  const task = useMemo(() => getPracticeTaskDetail(id), [id]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [code, setCode] = useState(task?.starterCode ?? "");
  const [runStatus, setRunStatus] = useState<RunStatus>("idle");

  useEffect(() => {
    if (initialOpenList) setSidebarOpen(true);
  }, [initialOpenList]);

  if (!task) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <p className="text-muted-foreground">Task not found.</p>
        <Button variant="outline" className="mt-4" asChild>
          <Link href="/dashboard#practice">Back to Practice</Link>
        </Button>
      </div>
    );
  }

  const lineCount = code.split("\n").length;
  const lineNumbers = Array.from({ length: Math.max(lineCount, 1) }, (_, i) => i + 1);

  const handleRun = () => {
    setRunStatus("running");
    setTimeout(() => setRunStatus("done"), 1500);
  };

  return (
    <div className="fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col overflow-hidden bg-background">
      {/* Top bar: title + open list */}
      <div className="border-b border-border bg-card px-4 py-3 flex items-center gap-4 shrink-0">
        <div className="flex-1 min-w-0">
          <h1 className="font-semibold text-foreground truncate">{task.title}</h1>
          <p className="text-xs text-muted-foreground">
            {task.topic} · {task.difficulty} · {task.company}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 shrink-0"
          onClick={() => setSidebarOpen(true)}
        >
          <List className="h-4 w-4" />
          All tasks
        </Button>
      </div>

      <PracticeTaskListSidebar
        open={sidebarOpen}
        onOpenChange={setSidebarOpen}
        currentTaskId={id}
      />

      <ResizablePanelGroup
        direction="horizontal"
        className="flex-1 min-h-0"
      >
        {/* Left: Description */}
        <ResizablePanel defaultSize={30} minSize={20} maxSize={50}>
          <div className="h-full flex flex-col border-r border-border bg-card">
            <div className="px-4 py-3 border-b border-border text-sm font-medium text-foreground shrink-0">
              Description
            </div>
            <ScrollArea className="flex-1 p-4">
              <div className="text-sm text-foreground space-y-4 pr-4">
                <p className="whitespace-pre-wrap text-muted-foreground leading-relaxed">
                  {task.description}
                </p>
                <div>
                  <div className="font-medium text-foreground mb-2">Examples</div>
                  {task.examples.map((ex, i) => (
                    <div key={i} className="mb-4 p-3 bg-secondary/50 border border-border text-sm">
                      <div className="text-muted-foreground mb-1">
                        <span className="font-mono text-foreground">Input:</span> {ex.input}
                      </div>
                      <div className="text-muted-foreground">
                        <span className="font-mono text-foreground">Output:</span> {ex.output}
                      </div>
                      {ex.explanation && (
                        <div className="text-muted-foreground mt-2 text-xs">
                          {ex.explanation}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </ScrollArea>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Center: Code editor */}
        <ResizablePanel defaultSize={45} minSize={30}>
          <div className="h-full flex flex-col border-r border-border bg-card">
            <div className="px-4 py-3 border-b border-border flex items-center justify-between shrink-0">
              <span className="text-sm font-mono text-muted-foreground">Solution.java</span>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-2"
                  onClick={handleRun}
                  disabled={runStatus === "running"}
                >
                  <Play className="h-4 w-4" />
                  Run
                </Button>
                <Button
                  size="sm"
                  variant="default"
                  className="gap-2"
                  onClick={handleRun}
                  disabled={runStatus === "running"}
                >
                  <Send className="h-4 w-4" />
                  Submit
                </Button>
              </div>
            </div>
            <div className="flex-1 flex min-h-0 font-mono text-sm bg-background/50">
              <div className="text-muted-foreground/50 select-none py-3 pr-4 text-right w-8 shrink-0 border-r border-border">
                {lineNumbers.map((n) => (
                  <div key={n}>{n}</div>
                ))}
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="flex-1 min-w-0 p-4 py-3 text-foreground/90 bg-transparent resize-none focus:outline-none focus:ring-0 font-mono text-sm leading-relaxed"
                spellCheck={false}
              />
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Right: Results */}
        <ResizablePanel defaultSize={25} minSize={20} maxSize={40}>
          <div className="h-full flex flex-col bg-card">
            <div className="px-4 py-3 border-b border-border flex items-center gap-2 shrink-0">
              <Zap className="h-4 w-4 text-foreground" />
              <span className="text-sm font-medium text-foreground">Results</span>
            </div>
            <ScrollArea className="flex-1 p-4">
              {runStatus === "idle" && (
                <p className="text-sm text-muted-foreground">
                  Run or submit your code to see results here.
                </p>
              )}
              {runStatus === "running" && (
                <div className="text-sm text-muted-foreground animate-pulse">
                  Running...
                </div>
              )}
              {runStatus === "done" && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-center gap-3">
                    <div className="text-lg font-medium text-green-600 dark:text-green-400">
                      Accepted
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Excellent Solution — Optimal time complexity achieved
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-secondary/50 p-3 text-center">
                      <div className="text-xs text-muted-foreground mb-1">TIME</div>
                      <div className="text-sm font-mono font-bold text-foreground">O(n)</div>
                    </div>
                    <div className="bg-secondary/50 p-3 text-center">
                      <div className="text-xs text-muted-foreground mb-1">SPACE</div>
                      <div className="text-sm font-mono font-bold text-foreground">O(1)</div>
                    </div>
                    <div className="bg-secondary/50 p-3 text-center">
                      <div className="text-xs text-muted-foreground mb-1">TESTS</div>
                      <div className="text-sm font-mono font-bold text-foreground">12/12</div>
                    </div>
                  </div>
                </div>
              )}
            </ScrollArea>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
