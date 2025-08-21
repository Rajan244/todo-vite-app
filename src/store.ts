import type { Task } from "./types";

type Action = 
  | { type: "ADD"; text: string }
  | { type: "TOGGLE" | "DELETE" | "EDIT"; id: string; text?: string }
  | { type: "CLEAR_COMPLETED" | "CLEAR_ALL" | "MARK_ALL_DONE" };

const actionHandlers: Record<Action['type'], (state: Task[], action: Action) => Task[]> = {
  ADD: (state, action) => {
    const text = (action as { text: string }).text.trim();
    if (!text) return state;
    return [{ id: crypto.randomUUID(), text, completed: false, createdAt: Date.now() }, ...state];
  },
  TOGGLE: (state, action) => {
    const index = state.findIndex(t => t.id === action.id);
    if (index === -1) return state;
    const newState = [...state];
    newState[index] = { ...newState[index], completed: !newState[index].completed };
    return newState;
  },
  DELETE: (state, action) => state.filter(t => t.id !== action.id),
  EDIT: (state, action) => {
    const text = (action.text?.trim() || "");
    if (!text) return state;
    const index = state.findIndex(t => t.id === action.id);
    if (index === -1) return state;
    const newState = [...state];
    newState[index] = { ...newState[index], text };
    return newState;
  },
  CLEAR_COMPLETED: state => state.filter(t => !t.completed),
  CLEAR_ALL: () => [],
  MARK_ALL_DONE: state => state.every(t => t.completed) ? state : state.map(t => ({ ...t, completed: true })),
};

export const tasksReducer = (state: Task[], action: Action): Task[] =>
  actionHandlers[action.type]?.(state, action) ?? state;
