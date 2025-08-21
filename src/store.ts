import type { Task } from "./types";

type Action = 
  | { type: "ADD"; text: string }
  | { type: "TOGGLE" | "DELETE" | "EDIT"; id: string; text?: string }
  | { type: "CLEAR_COMPLETED" | "CLEAR_ALL" | "MARK_ALL_DONE" };

const getIdx = (state: Task[], id: string) => state.findIndex(t => t.id === id);

const actionHandlers: Record<Action['type'], (state: Task[], action: Action) => Task[]> = {
  ADD: (state, action) => {
    const text = action.text.trim();
    if (!text) return state;
    return [{ id: crypto.randomUUID(), text, completed: false, createdAt: Date.now() }, ...state];
  },

  EDIT: (state, action) => {
    const text = action.text?.trim() || "";
    if (!text) return state;
    const index = getIdx(state, action.id);
    if (index === -1) return state;
    return [ ...state.slice(0, index),  { ...state[index], text },   ...state.slice(index + 1) ];
  },

  TOGGLE: (state, action) => {
    const index = getIdx(state, action.id);
    if (index === -1) return state;
    return [ ...state.slice(0, index),   { ...state[index], completed: !state[index].completed },   ...state.slice(index + 1) ];
  },

  DELETE: (state, action) => {
    const index = getIdx(state, action.id);
    if (index === -1) return state;
    return [...state.slice(0, index), ...state.slice(index + 1)];
  },

  CLEAR_COMPLETED: (state) => {
    const hasCompleted = state.some(t => t.completed);
    return hasCompleted ? state.filter(t => !t.completed) : state;
  },

  CLEAR_ALL: () => [],

  MARK_ALL_DONE: (state) => {
    const allCompleted = state.every(t => t.completed);
    return allCompleted ? [...state] : state.map(t => ({ ...t, completed: true }));
  },
};

export const tasksReducer = (state: Task[], action: Action): Task[] => actionHandlers[action.type]?.(state, action) ?? state;