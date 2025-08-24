# React To-Do App

A minimal client-side To-Do app built with React, demonstrating core features like adding tasks, toggling completion, and deleting tasks.

## Setup and Running Locally

1. Clone the repository or unzip the project.
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open in browser: http://localhost:5173 (or the port shown in console).
5. To build for production: `npm run build`

## Tooling Choice

- React with Vite (for fast development and bundling).
- TypeScript (for type safety).

## Decisions and Notes

- Used useReducer for state management to handle actions cleanly, though useState would suffice for minimal scope.
- Added lightweight smoke tests for reducer (run with `npm test`) as an optional bonus.
- Implemented basic accessibility with aria-labels and keyboard support.
- Styling kept minimal with CSS classes for responsiveness.
- No external dependencies beyond React/Vite/TS types to maintain simplicity.

Folder Structure (textual diagram):

src/
├── components/
│   ├── Header.tsx
│   ├── TaskInput.tsx
│   ├── TaskList.tsx
│   └── TaskItem.tsx
├── App.tsx
├── App.css
├── main.tsx
├── store.ts
├── types.ts
├── utils/
│   └── storage.ts  (optional persistence, can remove)
└── vite.config.ts