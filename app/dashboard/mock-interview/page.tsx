"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Brain, ArrowLeft, ArrowRight, Check } from "lucide-react";
import {
  MOCK_INTERVIEW_SETUP_STEPS,
  type SetupAnswers,
  type SetupQuestion,
  type SetupAnswer,
} from "@/lib/mock-interview-setup";
import { cn } from "@/lib/utils";

/** Returns step index that contains the given question id */
function getStepIndexForQuestion(questionId: string): number {
  const idx = MOCK_INTERVIEW_SETUP_STEPS.findIndex((step) =>
    step.questions.some((q) => q.id === questionId)
  );
  return idx >= 0 ? idx : 0;
}

/** Get label for selected answer id from a question */
function getAnswerLabel(question: SetupQuestion, answerId: string): string {
  const opt = question.options.find((o) => o.id === answerId);
  return opt?.label ?? answerId;
}

/** Build list of { question, answer label, stepIndex } for Ready step */
function getSummaryItems(answers: SetupAnswers): { questionLabel: string; answerLabel: string; questionId: string; stepIndex: number }[] {
  const items: { questionLabel: string; answerLabel: string; questionId: string; stepIndex: number }[] = [];
  for (const step of MOCK_INTERVIEW_SETUP_STEPS) {
    if (step.questions.length === 0) continue;
    for (const q of step.questions) {
      const answerId = answers[q.id];
      if (!answerId) continue;
      const stepIndex = getStepIndexForQuestion(q.id);
      items.push({
        questionLabel: q.question,
        answerLabel: getAnswerLabel(q, answerId),
        questionId: q.id,
        stepIndex,
      });
    }
  }
  return items;
}

export default function MockInterviewSetupPage() {
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<SetupAnswers>({});

  const step = MOCK_INTERVIEW_SETUP_STEPS[stepIndex];
  const isLastStep = stepIndex === MOCK_INTERVIEW_SETUP_STEPS.length - 1;
  const isReadyStep = step.questions.length === 0;

  const currentStepAnswersComplete = step.questions.every((q) => answers[q.id]);
  const canProceed = isReadyStep || currentStepAnswersComplete;

  const handleSelect = (questionId: string, answerId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answerId }));
  };

  const handleNext = () => {
    if (isReadyStep) {
      router.push("/dashboard/mock-interview/session");
      return;
    }
    if (stepIndex < MOCK_INTERVIEW_SETUP_STEPS.length - 1) {
      setStepIndex((i) => i + 1);
    }
  };

  const handleBack = () => {
    if (stepIndex > 0) setStepIndex((i) => i - 1);
  };

  const handleEditSetting = (targetStepIndex: number) => {
    setStepIndex(targetStepIndex);
  };

  const summaryItems = getSummaryItems(answers);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col">
      {/* Header */}
      <header className="shrink-0 border-b border-border bg-card">
        <div className="flex items-center justify-between px-4 py-3 max-w-3xl mx-auto">
          <Button variant="ghost" size="sm" className="gap-2" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <Brain className="h-4 w-4 text-foreground" />
            <span className="text-sm font-medium text-foreground">
              Set up mock interview
            </span>
          </div>
          <div className="w-20" aria-hidden />
        </div>
      </header>

      {/* Progress */}
      <div className="border-b border-border bg-card/50 px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center gap-2">
          {MOCK_INTERVIEW_SETUP_STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center gap-2">
              <div
                className={cn(
                  "w-8 h-8 border flex items-center justify-center text-sm font-mono",
                  i < stepIndex
                    ? "bg-foreground text-background border-foreground"
                    : i === stepIndex
                      ? "bg-foreground text-background border-foreground"
                      : "bg-transparent text-muted-foreground border-border"
                )}
              >
                {i < stepIndex ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              {i < MOCK_INTERVIEW_SETUP_STEPS.length - 1 && (
                <div className="w-6 h-px bg-border" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-border bg-card text-xs font-mono text-muted-foreground mb-3">
              STEP {stepIndex + 1} OF {MOCK_INTERVIEW_SETUP_STEPS.length}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
              {step.title}
            </h1>
            {step.description && (
              <p className="text-muted-foreground">{step.description}</p>
            )}
          </div>

          {isReadyStep ? (
            <div className="space-y-6">
              <p className="text-sm text-muted-foreground">
                Review your choices. Click a setting to change it.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {summaryItems.map((item) => (
                  <button
                    key={item.questionId}
                    type="button"
                    onClick={() => handleEditSetting(item.stepIndex)}
                    className="bg-card border border-border rounded-lg p-4 text-left hover:border-foreground/30 hover:bg-secondary/30 transition-colors group"
                  >
                    <div className="text-xs font-mono text-muted-foreground mb-1 line-clamp-1 group-hover:text-foreground/80">
                      {item.questionLabel}
                    </div>
                    <div className="text-sm font-medium text-foreground">
                      {item.answerLabel}
                    </div>
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
                <Button
                  size="lg"
                  className="gap-2"
                  onClick={handleNext}
                >
                  Start interview
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {step.questions.map((q) => (
                <QuestionBlock
                  key={q.id}
                  question={q}
                  selectedId={answers[q.id]}
                  onSelect={(id) => handleSelect(q.id, id)}
                />
              ))}

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={stepIndex === 0}
                  className="gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!canProceed}
                  className="gap-2"
                >
                  Next
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function QuestionBlock({
  question,
  selectedId,
  onSelect,
}: {
  question: SetupQuestion;
  selectedId?: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="bg-card border border-border rounded-lg p-5">
      <h2 className="text-base font-medium text-foreground mb-4">
        {question.question}
      </h2>
      <div className="flex flex-wrap gap-3">
        {question.options.map((opt) => (
          <OptionButton
            key={opt.id}
            option={opt}
            selected={selectedId === opt.id}
            onSelect={() => onSelect(opt.id)}
          />
        ))}
      </div>
    </div>
  );
}

function OptionButton({
  option,
  selected,
  onSelect,
}: {
  option: SetupAnswer;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "px-4 py-3 text-sm font-medium border rounded-lg transition-colors text-left",
        selected
          ? "bg-foreground text-background border-foreground"
          : "bg-transparent text-foreground border-border hover:border-foreground/50 hover:bg-secondary/50"
      )}
    >
      {option.label}
    </button>
  );
}
