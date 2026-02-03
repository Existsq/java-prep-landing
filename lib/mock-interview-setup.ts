export type SetupAnswer = {
  id: string;
  label: string;
};

export type SetupQuestion = {
  id: string;
  question: string;
  options: SetupAnswer[];
};

export type SetupStep = {
  id: string;
  title: string;
  description?: string;
  questions: SetupQuestion[];
};

export const MOCK_INTERVIEW_SETUP_STEPS: SetupStep[] = [
  {
    id: "format",
    title: "Interview format",
    description: "Choose how your mock interview will be structured.",
    questions: [
      {
        id: "type",
        question: "What type of interview do you want?",
        options: [
          { id: "technical", label: "Technical (coding & algorithms)" },
          { id: "behavioral", label: "Behavioral (experience & soft skills)" },
          { id: "system-design", label: "System Design" },
          { id: "mixed", label: "Mixed (technical + behavioral)" },
        ],
      },
      {
        id: "duration",
        question: "How long should the interview be?",
        options: [
          { id: "15", label: "15 minutes" },
          { id: "30", label: "30 minutes" },
          { id: "45", label: "45 minutes" },
          { id: "60", label: "60 minutes" },
        ],
      },
      {
        id: "language",
        question: "In which language should the interviewer communicate?",
        options: [
          { id: "en", label: "English" },
          { id: "ru", label: "Русский" },
        ],
      },
    ],
  },
  {
    id: "level",
    title: "Level & difficulty",
    description: "Set your target level and how challenging the questions should be.",
    questions: [
      {
        id: "experience",
        question: "What's your target experience level?",
        options: [
          { id: "junior", label: "Junior (0–2 years)" },
          { id: "mid", label: "Mid (2–5 years)" },
          { id: "senior", label: "Senior (5+ years)" },
        ],
      },
      {
        id: "difficulty",
        question: "How challenging should the questions be?",
        options: [
          { id: "easy", label: "Easy — warm-up and basics" },
          { id: "medium", label: "Medium — realistic interview level" },
          { id: "hard", label: "Hard — push my limits" },
        ],
      },
      {
        id: "topics",
        question: "Which topics do you want to focus on?",
        options: [
          { id: "core", label: "Core Java (OOP, collections, concurrency)" },
          { id: "spring", label: "Spring & Backend" },
          { id: "dsa", label: "Data structures & algorithms" },
          { id: "design", label: "System design & architecture" },
          { id: "all", label: "All areas" },
        ],
      },
    ],
  },
  {
    id: "ready",
    title: "Ready to start",
    description: "Review your choices and begin the interview when you're ready.",
    questions: [],
  },
];

export type SetupAnswers = Record<string, string>;
