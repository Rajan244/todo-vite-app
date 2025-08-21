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

  const handleSave = () => {
    const trimmedText = text.trim();
    if (!trimmedText) {
      setEditing(false);
      setText(task.text);
      return;
    }
    onEdit(task.id, trimmedText);
    setEditing(false);
    setText(trimmedText); // Sync with saved value
  };

  const handleCancel = () => {
    setEditing(false);
    setText(task.text);
  };

  const handleAction = () => {
    if (editing) {
      handleSave();
    } else {
      setEditing(true);
    }
  };

  return (
    <li className={task.completed ? 'is-completed' : ''}>
      {/* checkbox */}
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        aria-label={`Mark "${task.text}" as ${task.completed ? 'active' : 'completed'}`}
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
            onBlur={handleSave}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSave();
              else if (e.key === 'Escape') handleCancel();
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
            handleAction();
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