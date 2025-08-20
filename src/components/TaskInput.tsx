import React, { useRef } from 'react';

type Props = {
  onAdd: (text: string) => void;
};

export default function TaskInput({ onAdd }: Props) {
  const ref = useRef<HTMLInputElement>(null);

  const handleAdd = () => {
    const v = ref.current?.value ?? '';
    if (!v.trim()) return;
    onAdd(v);
    if (ref.current) ref.current.value = '';
    ref.current?.focus();
  };

  return (
    <footer id="footer">
      <input
        id="taskInput"
        ref={ref}
        type="text"
        placeholder="Your task"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleAdd();
          }
        }}
      />
      <button id="taskAdd" onClick={handleAdd} aria-label="Add task">
        +
      </button>
    </footer>
  );
}
