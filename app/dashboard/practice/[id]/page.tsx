import { Suspense } from "react";
import { PRACTICE_TASKS } from "@/lib/mock-dashboard";
import { PracticeTaskClient } from "./practice-task-client";

export function generateStaticParams() {
  return PRACTICE_TASKS.map((task) => ({ id: task.id }));
}

function PracticeTaskFallback() {
  return (
    <div className="fixed inset-x-0 top-16 bottom-0 z-40 flex items-center justify-center bg-background">
      <p className="text-sm text-muted-foreground">Loading...</p>
    </div>
  );
}

export default function PracticeTaskPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={<PracticeTaskFallback />}>
      <PracticeTaskClient params={params} />
    </Suspense>
  );
}
