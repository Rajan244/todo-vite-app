import React from 'react';
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
  const visible =
    filter === 'active'
      ? tasks.filter((t) => !t.completed)
      : filter === 'completed'
      ? tasks.filter((t) => t.completed)
      : tasks;

  return (
    <section id="tasks" data-empty={visible.length === 0}>
      <div id="notification">No tasks in this view.</div>
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
