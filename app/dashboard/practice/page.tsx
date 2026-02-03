import { redirect } from "next/navigation";
import { PRACTICE_TASKS } from "@/lib/mock-dashboard";

export default function PracticeListPage() {
  redirect(`/dashboard/practice/${PRACTICE_TASKS[0].id}?list=1`);
}
