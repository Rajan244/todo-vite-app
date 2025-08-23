import React, { useState, useEffect, useRef } from 'react';
import type { Task } from '../types';

interface Props {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

export default function TaskItem({ task, onToggle, onDelete, onEdit }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(task.text);
  const inputRef = useRef<HTMLInputElement>(null);
  const originalText = useRef(task.text);

  useEffect(() => {
    setText(task.text);
    originalText.current = task.text;
  }, [task.text]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    const trimmedText = text.trim();
    if (!trimmedText) {
      setIsEditing(false);
      setText(originalText.current);
      return;
    }
    if (trimmedText !== originalText.current) {
      onEdit(task.id, trimmedText);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setText(originalText.current);
  };

   const handleAction = () => {
    isEditing ? handleSave() : (originalText.current = task.text, setIsEditing(true));
  };

  const handleBlur = () => {
    setTimeout(() => isEditing && handleSave(), 150);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      handleCancel();
    }
  };

  return (
    <li className={task.completed ? 'is-completed' : ''}>
      {/* Checkbox for task completion */}
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        aria-label={`Mark "${task.text}" as ${task.completed ? 'active' : 'completed'}`}
      />

      {/* Task content */}
      <div className="content">
        {isEditing ? (
          <input
            ref={inputRef}
            className="edit-title"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            aria-label="Edit task title"
          />
        ) : (
          <span className={`task-title ${task.completed ? 'completed' : ''}`}>
            {task.text}
          </span>
        )}
      </div>

      {/* Task actions */}
      <div className="actions">
        <button
          className="icon"
          onClick={(e) => {
            e.stopPropagation();
            handleAction();
          }}
          aria-label={isEditing ? 'Save task' : 'Edit task'}
          title={isEditing ? 'Save' : 'Edit'}
        >
          {isEditing ? '✓' : '✎'}
        </button>
        <button
          className="icon"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task.id);
          }}
          aria-label="Delete task"
          title="Delete"
        >
          🗑
        </button>
      </div>
    </li>
  );
}