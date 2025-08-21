import type { Task } from '../types';

const KEY = 'todo.v1';

export type Snapshot = {
  title: string;
  tasks: Task[];
};

export function load(): Snapshot | null {
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) as Snapshot : null;
}

export function save(snap: Snapshot) {
  try {
    localStorage.setItem(KEY, JSON.stringify(snap));
  } catch (error) {
    console.warn('Failed to save to localStorage due to quota or other error:', error);
    // Optionally, notify user or fallback to another storage method
  }
}