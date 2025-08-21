import React, { useEffect, useRef, useState } from 'react';
import type { Filter } from '../types';

type Props = {
  title: string;
  onTitle: (v: string) => void;
  filter: Filter;
  onFilter: (f: Filter) => void;
  counts: { all: number; active: number; completed: number };
  onClearAll: () => void;
  onClearCompleted: () => void;
  onMarkAllDone: () => void;
};

export default function Header({
  title,
  onTitle,
  filter,
  onFilter,
  counts,
  onClearAll,
  onClearCompleted,
  onMarkAllDone,
}: Props) {
  const [open, setOpen] = useState(false);
  const popRef = useRef<HTMLDivElement>(null);

  // Optimize event listeners with a single handler
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent | KeyboardEvent) => {
      if (open && popRef.current && !popRef.current.contains(e.target as Node)) {
        setOpen(false);
      } else if (e instanceof KeyboardEvent && e.key === 'Escape') {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleOutsideClick);
    };
  }, [open]);

  // Compute disabled states efficiently
  const disAll = counts.all === 0;
  const disClearDone = disAll || counts.completed === 0;
  const disMarkAll = disAll || counts.active === 0;

  return (
    <header id="listHeader">
      {/* Row 1: Title + 3-dot menu */}
      <div className="titleRow">
        <input
          id="listTitle"
          value={title}
          onChange={(e) => onTitle(e.target.value)}
          aria-label="List title"
        />

        <div className="header-more" ref={popRef}>
          <button
            className="more-btn"
            id="more-btn"
            aria-haspopup="menu"
            aria-expanded={open}
            aria-controls="bulk-menu"
            title="More"
            onClick={() => setOpen((v) => !v)}
          >
            ⋮
          </button>

          {open && (
            <div
              id="bulk-menu"
              className="menu"
              role="menu"
              aria-label="Bulk actions"
            >
              <button
                role="menuitem"
                disabled={disAll}
                onClick={() => {
                  onClearAll();
                  setOpen(false);
                }}
                title="Remove all tasks"
                aria-label="Clear all"
              >
                Clear All
              </button>

              <button
                role="menuitem"
                disabled={disClearDone}
                onClick={() => {
                  onClearCompleted();
                  setOpen(false);
                }}
                title="Remove completed tasks"
                aria-label="Clear completed"
              >
                Clear All Done
              </button>

              <button
                role="menuitem"
                disabled={disMarkAll}
                onClick={() => {
                  onMarkAllDone();
                  setOpen(false);
                }}
                title="Mark all tasks as completed"
                aria-label="Mark all done"
              >
                Mark All Done
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Row 2: Filters */}
      <div className="filters" role="tablist" aria-label="Filters">
        <button
          className={`filter ${filter === 'all' ? 'active' : ''}`}
          role="tab"
          aria-selected={filter === 'all'}
          onClick={() => onFilter('all')}
        >
          All <span className="count">{counts.all}</span>
        </button>
        <button
          className={`filter ${filter === 'active' ? 'active' : ''}`}
          role="tab"
          aria-selected={filter === 'active'}
          onClick={() => onFilter('active')}
        >
          Active <span className="count">{counts.active}</span>
        </button>
        <button
          className={`filter ${filter === 'completed' ? 'active' : ''}`}
          role="tab"
          aria-selected={filter === 'completed'}
          onClick={() => onFilter('completed')}
        >
          Done <span className="count">{counts.completed}</span>
        </button>
      </div>
    </header>
  );
}