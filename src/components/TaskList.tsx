import React, { useMemo } from 'react';
import type { Task, Filter } from '../types';
import TaskItem from './TaskItem';

type Props = {
  tasks: Task[];
  filter: Filter;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
};

export default function TaskList({
  tasks,
  filter,
  onToggle,
  onDelete,
  onEdit,
}: Props) {
  const visible = useMemo(() => {
    if (filter === 'active') return tasks.filter((t) => !t.completed);
    if (filter === 'completed') return tasks.filter((t) => t.completed);
    return tasks;
  }, [tasks, filter]);

  return (
    <section id="tasks" data-empty={visible.length === 0}>
      {visible.length === 0 && <div id="notification">No tasks yet.</div>}
      <ul id="tasksList">
        {visible.map((t) => (
          <TaskItem
            key={t.id}
            task={t}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </ul>
    </section>
  );
}