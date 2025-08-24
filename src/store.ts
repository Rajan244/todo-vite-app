import type { Task } from "./types.js";

export type Action = 
  | { type: "ADD"; text: string }
  | { type: "TOGGLE" | "DELETE" | "EDIT"; id: string; text?: string }
  | { type: "CLEAR_COMPLETED" | "CLEAR_ALL" | "MARK_ALL_DONE" };

const getIdx = (state: Task[], id: string) => state.findIndex(t => t.id === id);

const actionHandlers: Record<Action['type'], (state: Task[], action: Action) => Task[]> = {
  ADD: (state, action) => action.type === "ADD" && action.text.trim()
    ? [{ id: crypto.randomUUID(), text: action.text.trim(), completed: false, createdAt: Date.now() }, ...state]
    : state,

  EDIT: (state, action) => {
    if (action.type !== "EDIT" || !action.text?.trim()) return state;
    const idx = getIdx(state, action.id);
    return idx === -1 ? state : [...state.slice(0, idx), { ...state[idx], text: action.text.trim() }, ...state.slice(idx + 1)];
  },

  TOGGLE: (state, action) => {
    if (action.type !== "TOGGLE") return state;
    const idx = getIdx(state, action.id);
    return idx === -1 ? state : [...state.slice(0, idx), { ...state[idx], completed: !state[idx].completed }, ...state.slice(idx + 1)];
  },

  DELETE: (state, action) => {
    if (action.type !== "DELETE") return state;
    const idx = getIdx(state, action.id);
    return idx === -1 ? state : [...state.slice(0, idx), ...state.slice(idx + 1)];
  },

  CLEAR_COMPLETED: state => state.filter(t => !t.completed),

  CLEAR_ALL: () => [],

  MARK_ALL_DONE: state => state.every(t => t.completed) ? state : state.map(t => ({ ...t, completed: true }))
};

// Task reducer for managing task state
export const tasksReducer = (state: Task[] = [], action: Action): Task[] =>
  actionHandlers[action.type]?.(state, action) ?? state;