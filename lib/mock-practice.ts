export type PracticeTaskDetail = {
  id: string;
  title: string;
  difficulty: string;
  topic: string;
  company: string;
  description: string;
  examples: { input: string; output: string; explanation?: string }[];
  starterCode: string;
};

const DEFAULT_STARTER = `public class Solution {
    // Your code here
}`;

export const PRACTICE_TASK_DETAILS: Record<string, PracticeTaskDetail> = {
  "two-sum": {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    topic: "Arrays",
    company: "Amazon",
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    examples: [
      { input: "nums = [2, 7, 11, 15], target = 9", output: "[0, 1]", explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]." },
      { input: "nums = [3, 2, 4], target = 6", output: "[1, 2]" },
    ],
    starterCode: `public int[] twoSum(int[] nums, int target) {
    // Your code here
    return new int[]{};
}`,
  },
  "lru-cache": {
    id: "lru-cache",
    title: "LRU Cache",
    difficulty: "Medium",
    topic: "Design",
    company: "Google",
    description: `Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.

Implement the \`LRUCache\` class:
- \`LRUCache(int capacity)\` Initialize the LRU cache with positive size \`capacity\`.
- \`int get(int key)\` Return the value of the \`key\` if the key exists, otherwise return \`-1\`.
- \`void put(int key, int value)\` Update the value of the \`key\` if the \`key\` exists. Otherwise, add the \`key-value\` pair to the cache. If the number of keys exceeds the \`capacity\` from this operation, evict the least recently used key.`,
    examples: [
      { input: "capacity = 2, put(1,1), put(2,2), get(1), put(3,3), get(2)", output: "1, -1" },
    ],
    starterCode: `class LRUCache {
    public LRUCache(int capacity) {
        // Your code here
    }
    
    public int get(int key) {
        // Your code here
        return -1;
    }
    
    public void put(int key, int value) {
        // Your code here
    }
}`,
  },
  "merge-k-sorted-lists": {
    id: "merge-k-sorted-lists",
    title: "Merge K Sorted Lists",
    difficulty: "Hard",
    topic: "Heap",
    company: "Meta",
    description: `You are given an array of \`k\` linked-lists \`lists\`, each linked-list is sorted in ascending order.

Merge all the linked-lists into one sorted linked-list and return it.`,
    examples: [
      { input: "lists = [[1,4,5],[1,3,4],[2,6]]", output: "[1,1,2,3,4,4,5,6]" },
    ],
    starterCode: `public ListNode mergeKLists(ListNode[] lists) {
    // Your code here
    return null;
}`,
  },
};

export function getPracticeTaskDetail(id: string): PracticeTaskDetail | null {
  const task = PRACTICE_TASK_DETAILS[id];
  if (task) return task;
  // Default task for any unknown id (so all dashboard links work)
  return {
    id,
    title: id.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
    difficulty: "Medium",
    topic: "General",
    company: "JavaPrep",
    description: "Solve this problem. Write your solution in the code editor and run or submit to see the result.",
    examples: [{ input: "See problem statement", output: "Expected output" }],
    starterCode: DEFAULT_STARTER,
  };
}
