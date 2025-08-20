import React, { useEffect, useMemo, useReducer, useState } from 'react';
import Header from './components/Header';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import type { Filter } from './types';
import { tasksReducer } from './store';
import { load, save } from './utils/storage';

export default function App() {
  // hydrate from localStorage once
  const snap = load();
  const [title, setTitle] = useState<string>(snap?.title ?? 'My Tasks');
  const [tasks, dispatch] = useReducer(tasksReducer, snap?.tasks ?? []);

  // persistence (debounced lightly)
  useEffect(() => {
    const id = setTimeout(() => save({ title, tasks }), 120);
    return () => clearTimeout(id);
  }, [title, tasks]);

  // counts + filters
  const [filter, setFilter] = useState<Filter>('all');
  const counts = useMemo(
    () => ({
      all: tasks.length,
      active: tasks.reduce((n, t) => n + (t.completed ? 0 : 1), 0),
      completed: tasks.reduce((n, t) => n + (t.completed ? 1 : 0), 0),
    }),
    [tasks]
  );

  // handlers
  const add = (text: string) => dispatch({ type: 'ADD', text });
  const toggle = (id: string) => dispatch({ type: 'TOGGLE', id });
  const del = (id: string) => dispatch({ type: 'DELETE', id });
  const edit = (id: string, text: string) =>
    dispatch({ type: 'EDIT', id, text });

  // bulk actions
  const clearAll = () => dispatch({ type: 'CLEAR_ALL' });
  const clearCompleted = () => dispatch({ type: 'CLEAR_COMPLETED' });
  const markAllDone = () => dispatch({ type: 'MARK_ALL_DONE' });

  return (
    <div id="app">
      <nav id="nav">
        <div className="nav-left">To-Do Pro</div>
      </nav>

      <main id="wrap">
        <Header
          title={title}
          onTitle={setTitle}
          filter={filter}
          onFilter={setFilter}
          counts={counts}
          onClearAll={clearAll}
          onClearCompleted={clearCompleted}
          onMarkAllDone={markAllDone}
        />

        <TaskList
          tasks={tasks}
          filter={filter}
          onToggle={toggle}
          onDelete={del}
          onEdit={edit}
        />

        <TaskInput onAdd={add} />
      </main>
    </div>
  );
}
