export const THEORY_TOPICS = [
  {
    id: "core",
    label: "Core Java",
    questions: 120,
    items: [
      "OOP Concepts",
      "Collections Framework",
      "Exception Handling",
      "Multithreading",
      "JVM Internals",
    ],
  },
  {
    id: "advanced",
    label: "Advanced Java",
    questions: 85,
    items: [
      "Generics",
      "Lambda Expressions",
      "Streams API",
      "Reflection",
      "Annotations",
    ],
  },
  {
    id: "spring",
    label: "Spring Framework",
    questions: 95,
    items: [
      "Spring Boot",
      "Spring MVC",
      "Spring Security",
      "Spring Data JPA",
      "Microservices",
    ],
  },
  {
    id: "dsa",
    label: "Data Structures",
    questions: 150,
    items: [
      "Arrays & Strings",
      "LinkedLists",
      "Trees & Graphs",
      "Dynamic Programming",
      "Sorting & Searching",
    ],
  },
  {
    id: "design",
    label: "System Design",
    questions: 45,
    items: [
      "Design Patterns",
      "Scalability",
      "Database Design",
      "API Design",
      "Distributed Systems",
    ],
  },
] as const;

export type PracticeTask = {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  company: string;
  topic: string;
};

export const PRACTICE_TASKS: PracticeTask[] = [
  { id: "two-sum", title: "Two Sum", difficulty: "Easy", company: "Amazon", topic: "Arrays" },
  { id: "lru-cache", title: "LRU Cache", difficulty: "Medium", company: "Google", topic: "Design" },
  { id: "merge-k-sorted-lists", title: "Merge K Sorted Lists", difficulty: "Hard", company: "Meta", topic: "Heap" },
  { id: "valid-parentheses", title: "Valid Parentheses", difficulty: "Easy", company: "Microsoft", topic: "Stack" },
  { id: "reverse-linked-list", title: "Reverse Linked List", difficulty: "Easy", company: "Amazon", topic: "Linked List" },
  { id: "binary-tree-inorder", title: "Binary Tree Inorder Traversal", difficulty: "Medium", company: "Google", topic: "Tree" },
  { id: "max-subarray", title: "Maximum Subarray", difficulty: "Medium", company: "Meta", topic: "Dynamic Programming" },
  { id: "course-schedule", title: "Course Schedule", difficulty: "Medium", company: "Microsoft", topic: "Graph" },
];
