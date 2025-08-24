import { tasksReducer, type Action } from './store.js';
import type { Task } from './types.js';

let passed = 0, failed = 0;
const test = (desc: string, fn: () => void) => {
  try {
    fn();
    console.log(`✅ ${desc}`);
    passed++;
  } catch (e) {
    console.error(`❌ ${desc}`, e);
    failed++;
  }
};

const newTask = (text: string, completed = false): Task => ({
  id: crypto.randomUUID(), text, completed, createdAt: Date.now()
});

test("ADD: adds valid task", () => {
  const state: Task[] = [];
  const newState = tasksReducer(state, { type: "ADD", text: "Task 1" });
  console.assert(newState.length === 1 && newState[0].text === "Task 1" && !newState[0].completed);
});

test("ADD: ignores empty text", () => {
  const state: Task[] = [];
  const newState = tasksReducer(state, { type: "ADD", text: "" });
  console.assert(newState.length === 0);
});

test("EDIT: updates task text", () => {
  const task = newTask("Task 1");
  const newState = tasksReducer([task], { type: "EDIT", id: task.id, text: "Task 1 Updated" });
  console.assert(newState[0]?.text === "Task 1 Updated");
});

test("EDIT: ignores empty text or invalid ID", () => {
  const task = newTask("Task 1");
  const state = [task];
  const newState1 = tasksReducer(state, { type: "EDIT", id: task.id, text: "" });
  const newState2 = tasksReducer(state, { type: "EDIT", id: "invalid", text: "Task 1 Updated" });
  console.assert(newState1[0]?.text === "Task 1" && newState2[0]?.text === "Task 1");
});

test("TOGGLE: toggles completion", () => {
  const task = newTask("Task 1");
  const newState = tasksReducer([task], { type: "TOGGLE", id: task.id });
  console.assert(newState[0]?.completed === true);
});

test("TOGGLE: ignores invalid ID", () => {
  const task = newTask("Task 1");
  const newState = tasksReducer([task], { type: "TOGGLE", id: "invalid" });
  console.assert(newState[0]?.completed === false);
});

test("DELETE: removes task", () => {
  const task = newTask("Task 1");
  const newState = tasksReducer([task], { type: "DELETE", id: task.id });
  console.assert(newState.length === 0);
});

test("DELETE: ignores invalid ID", () => {
  const task = newTask("Task 1");
  const newState = tasksReducer([task], { type: "DELETE", id: "invalid" });
  console.assert(newState.length === 1);
});

test("CLEAR_COMPLETED: removes completed tasks", () => {
  const state = [newTask("Task 1", true), newTask("Task 2", false)];
  const newState = tasksReducer(state, { type: "CLEAR_COMPLETED" });
  console.assert(newState.length === 1 && newState[0]?.text === "Task 2");
});

test("CLEAR_COMPLETED: unchanged if no completed tasks", () => {
  const state = [newTask("Task 1", false)];
  const newState = tasksReducer(state, { type: "CLEAR_COMPLETED" });
  console.assert(newState.length === 1);
});

test("CLEAR_ALL: empties state", () => {
  const state = [newTask("Task 1"), newTask("Task 2")];
  const newState = tasksReducer(state, { type: "CLEAR_ALL" });
  console.assert(newState.length === 0);
});

test("MARK_ALL_DONE: marks all completed", () => {
  const state = [newTask("Task 1", false), newTask("Task 2", false)];
  const newState = tasksReducer(state, { type: "MARK_ALL_DONE" });
  console.assert(newState.every(t => t.completed));
});

test("MARK_ALL_DONE: unchanged if all completed", () => {
  const state = [newTask("Task 1", true), newTask("Task 2", true)];
  const newState = tasksReducer(state, { type: "MARK_ALL_DONE" });
  console.assert(newState.every(t => t.completed));
});

test("Unknown action: returns unchanged state", () => {
  const state = [newTask("Task 1")];
  const newState = tasksReducer(state, { type: "UNKNOWN" } as unknown as Action);
  console.assert(newState === state);
});

console.log(`\nSummary: ${passed} passed, ${failed} failed`);