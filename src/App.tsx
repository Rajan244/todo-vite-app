import React, { useEffect, useMemo, useReducer, useState } from 'react';
import Header from './components/Header';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import type { Filter } from './types';
import { tasksReducer } from './store';
import { load, save } from './utils/storage';

export default function App() {
  // hydrate from localStorage once
  const initialSnap = load();
  const [title, setTitle] = useState<string>(initialSnap?.title ?? 'My Tasks');
  const [tasks, dispatch] = useReducer(tasksReducer, initialSnap?.tasks ?? []);

  // persistence (debounced lightly)
  useEffect(() => {
    const id = setTimeout(() => save({ title, tasks }), 120);
    return () => clearTimeout(id);
  }, [title, tasks]);

  // counts + filters
  const [filter, setFilter] = useState<Filter>('all');
  const counts = useMemo(() => {
      let active = 0, completed = 0;
      for (const t of tasks) {
        if (t.completed) completed++;
        else active++;
      }
      return { all: tasks.length, active, completed };
    }, [tasks]);

  const handlers = useMemo(() => ({
    add: (text: string) => dispatch({ type: 'ADD', text }),
    edit: (id: string, text: string) => dispatch({ type: 'EDIT', id, text }),
    toggle: (id: string) => dispatch({ type: 'TOGGLE', id }),
    del: (id: string) => dispatch({ type: 'DELETE', id }),
    clearAll: () => dispatch({ type: 'CLEAR_ALL' }),
    clearCompleted: () => dispatch({ type: 'CLEAR_COMPLETED' }),
    markAllDone: () => dispatch({ type: 'MARK_ALL_DONE' }),
  }), [dispatch]);

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
          onClearAll={handlers.clearAll}
          onClearCompleted={handlers.clearCompleted}
          onMarkAllDone={handlers.markAllDone}
        />

        <TaskList
          tasks={tasks}
          filter={filter}
          onToggle={handlers.toggle}
          onDelete={handlers.del}
          onEdit={handlers.edit}
        />

        <TaskInput onAdd={handlers.add} />
      </main>
    </div>
  );
}
