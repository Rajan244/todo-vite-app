import type { Task } from "./types";

export type Action =
  | { type: "ADD"; text: string }
  | { type: "TOGGLE"; id: string }
  | { type: "DELETE"; id: string }
  | { type: "EDIT"; id: string; text: string }
  | { type: "CLEAR_COMPLETED" }
  | { type: "CLEAR_ALL" }
  | { type: "MARK_ALL_DONE" };

export function tasksReducer(state: Task[], action: Action): Task[] {
  switch (action.type) {
    case "ADD": {
      const text = action.text.trim();
      if (!text) return state;
      const t: Task = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        text,
        completed: false,
        createdAt: Date.now(),
      };
      // newest first
      return [t, ...state];
    }
    case "TOGGLE":
      return state.map((t) => (t.id === action.id ? { ...t, completed: !t.completed } : t));
    case "DELETE":
      return state.filter((t) => t.id !== action.id);
    case "EDIT":
      return state.map((t) => (t.id === action.id ? { ...t, text: action.text.trim() || t.text } : t));
    case "CLEAR_COMPLETED":
      return state.filter((t) => !t.completed);
    case "CLEAR_ALL":
      return [];
    case "MARK_ALL_DONE":
      return state.map((t) => ({ ...t, completed: true }));
    default:
      return state;
  }
}
