import type { Task } from '../types';

const KEY = 'todo.v1';

export type Snapshot = {
  title: string;
  tasks: Task[];
};

// load snapshot (null if none)
export function load(): Snapshot | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Snapshot) : null;
  } catch {
    return null;
  }
}

// save snapshot (safe)
export function save(snap: Snapshot) {
  try {
    localStorage.setItem(KEY, JSON.stringify(snap));
  } catch {
    // ignore quota errors
  }
}
