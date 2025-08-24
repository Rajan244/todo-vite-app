import React, { useRef } from 'react';

type Props = {
  onAdd: (text: string) => void;
};

export default function TaskInput({ onAdd }: Props) {
  const ref = useRef<HTMLInputElement>(null);

  const handleAdd = () => {
    const input = ref.current;
    if (!input) return;
    const value = input.value.trim();
    if (!value) return;
    onAdd(value);
    input.value = ''; // Direct mutation after use
    input.focus();
  };

  return (
    <footer id="footer">
      <input
        id="taskInput"
        ref={ref}
        type="text"
        placeholder="Add a task…"
        onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
      />
      <button id="taskAdd" onClick={handleAdd} aria-label="Add task">
        +
      </button>
    </footer>
  );
}