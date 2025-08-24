import React, { useEffect, useRef, useState } from 'react';
import type { Task } from '../types';

interface Props {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

export default function TaskItem({ task, onToggle, onDelete, onEdit }: Props) {
  const { id, text: taskText, completed } = task;

  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(taskText);
  const inputRef = useRef<HTMLInputElement>(null);
  const baseline = useRef(taskText);
  const clickingAction = useRef(false);

  // sync when upstream task text changes
  useEffect(() => {
    setText(taskText);
    baseline.current = taskText;
  }, [taskText]);

  // autofocus on enter edit
  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const save = () => {
    const v = text.trim();
    if (!v) {
      setText(baseline.current);
      setIsEditing(false);
      return;
    }
    if (v !== baseline.current) {
      onEdit(id, v);
      baseline.current = v;
    }
    setIsEditing(false);
  };

  const startEdit = () => {
    baseline.current = taskText; // ensure freshest source
    setIsEditing(true);
  };

  const onBlur = () => {
    if (!clickingAction.current && isEditing) save();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') { e.preventDefault(); save(); }
    else if (e.key === 'Escape') { e.preventDefault(); setText(baseline.current); setIsEditing(false); }
  };

  return (
    <li className={completed ? 'is-completed' : ''}>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggle(id)}
        aria-label={`Mark "${taskText}" as ${completed ? 'active' : 'completed'}`}
      />

      <div className="content">
        {isEditing ? (
          <input
            ref={inputRef}
            className="edit-title"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            aria-label="Edit task title"
          />
        ) : (
          <span className={`task-title ${completed ? 'completed' : ''}`}>{taskText}</span>
        )}
      </div>

      <div className="actions">
        <button
          className="icon"
          onMouseDown={() => (clickingAction.current = true)}
          onMouseUp={() => (clickingAction.current = false)}
          onTouchStart={() => (clickingAction.current = true)}
          onTouchEnd={() => (clickingAction.current = false)}
          onClick={(e) => { e.stopPropagation(); clickingAction.current = false; isEditing ? save() : startEdit(); }}
          aria-label={isEditing ? 'Save task' : 'Edit task'}
          title={isEditing ? 'Save' : 'Edit'}
        >
          {isEditing ? '✓' : '✎'}
        </button>

        <button
          className="icon"
          onClick={(e) => { e.stopPropagation(); onDelete(id); }}
          aria-label="Delete task"
          title="Delete"
        >
          🗑
        </button>
      </div>
    </li>
  );
}
