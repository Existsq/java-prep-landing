import { PRACTICE_TASKS } from "@/lib/mock-dashboard";
import { PracticeTaskClient } from "./practice-task-client";

export function generateStaticParams() {
  return PRACTICE_TASKS.map((task) => ({ id: task.id }));
}

export default function PracticeTaskPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return <PracticeTaskClient params={params} />;
}
