import { PRACTICE_TASKS } from "@/lib/mock-dashboard";
import { PracticeTaskClient } from "./practice-task-client";

export function generateStaticParams() {
  return PRACTICE_TASKS.map((task) => ({ id: task.id }));
}

export default async function PracticeTaskPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <PracticeTaskClient id={id} />;
}
