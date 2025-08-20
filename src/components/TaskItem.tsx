import React, { useState } from 'react';
import type { Task } from '../types';

type Props = {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
};

export default function TaskItem({ task, onToggle, onDelete, onEdit }: Props) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(task.text);

  const save = () => {
    if (!editing) return;
    onEdit(task.id, text);
    setEditing(false);
  };

  const cancel = () => {
    setEditing(false);
    setText(task.text);
  };

  return (
    <li className={task.completed ? 'is-completed' : ''}>
      {/* checkbox */}
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        aria-label={`Mark "${task.text}" as ${
          task.completed ? 'active' : 'completed'
        }`}
      />

      {/* content */}
      <div className="content">
        {!editing ? (
          <span className={`task-title ${task.completed ? 'completed' : ''}`}>
            {task.text}
          </span>
        ) : (
          <input
            className="edit-title"
            value={text}
            autoFocus
            onChange={(e) => setText(e.target.value)}
            onBlur={save}
            onKeyDown={(e) => {
              if (e.key === 'Enter') return save();
              if (e.key === 'Escape') return cancel();
            }}
          />
        )}
      </div>

      {/* actions */}
      <div className="actions">
        <button
          className="icon"
          aria-label={editing ? 'Save task' : 'Edit task'}
          onClick={(e) => {
            e.stopPropagation();
            editing ? save() : setEditing(true);
          }}
          title={editing ? 'Save' : 'Edit'}
        >
          {editing ? '✓' : '✎'}
        </button>
        <button
          className="icon"
          aria-label="Delete task"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task.id);
          }}
          title="Delete"
        >
          🗑
        </button>
      </div>
    </li>
  );
}
