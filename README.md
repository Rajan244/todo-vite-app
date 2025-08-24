# Barebones React To-Do App

A minimal client-side To-Do app demonstrating React fundamentals, built as per the provided specification.

## Project Overview

This app implements the required features for task creation, listing, completion toggling, and deletion, with basic styling and accessibility. It also includes some optional enhancements for better UX without overcomplicating the core.

## How to Run Locally

1. Clone the repository: `git clone <repo-url>`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
   - The app will open in your browser at `http://localhost:5173`
4. (Optional) Build for production: `npm run build`
5. (Optional) Preview the build: `npm run preview` (serves at `http://localhost:4173`)
6. (Optional) Run reducer tests: `npm test`

## Tooling Choice

- Framework: React v18.3.1 (via Vite v5.4.0 for fast development with HMR and optimized builds).
- Language: TypeScript v5.5.4 (for type safety and better developer experience).
- Other Dev Dependencies: @vitejs/plugin-react v4.3.0, @types/react v18.3.3, @types/react-dom v18.3.0.

## Features

### Core Operations (Must-Have)
- **Create Task**: Enter text in the input field and press "Enter" or click the "+" button to add. Input is trimmed; empty or whitespace-only inputs are ignored.
- **List Tasks**: Tasks are displayed in a list, with newest tasks at the top (sorted by `createdAt` timestamp).
- **Toggle Completion**: Checkbox per task to mark complete/incomplete. Completed tasks show strike-through text.
- **Delete Task**: Delete button (🗑 icon) per task to remove it immediately.
- **Empty State**: Displays "No tasks in this view." when no tasks are present (or filtered to none).

### Optional Enhancements
- **Task Editing**: Inline edit mode for task text (✎ to enter, ✓ to save, Escape to cancel).
- **Filters**: View "All", "Active", or "Done" tasks with counts (e.g., All 5).
- **Bulk Actions**: Via more menu (⋮): Clear All, Clear All Done, Mark All Done (disabled when inapplicable).
- **Persistence**: Tasks and list title saved to localStorage (debounced save); loads on init. Data clears on explicit actions but persists across refreshes for UX.
- **Editable List Title**: Customize the header title (defaults to "My Tasks").
- **Task Counts**: Real-time counts for all/active/completed in filters.

### Styling and UX
- **Layout**: Clean, responsive design using CSS Flexbox/Grid. Width clamped for mobile/desktop (min 420px, max 900px). Light color scheme with variables for easy theming (primary blue accents).
- **Visuals**: Completed tasks have strike-through and class for styling (no opacity reduction to keep readability). Hover effects on buttons/icons. Rounded borders and subtle shadows for polish.
- **Accessibility**: Aria-labels on interactive elements (e.g., "Mark [task] as completed", "Delete task"). Keyboard navigation: Tab order (input > checkboxes > deletes), Enter to add/save, Space to toggle/activate. Semantic HTML (e.g., role="tablist" for filters).
- **Performance**: Memoized computations for filters/counts/handlers to avoid unnecessary re-renders. Efficient for small lists.

### Data Model
- In-memory array of `Task` objects: `{ id: string (crypto.randomUUID()), text: string (trimmed), completed: boolean, createdAt: number (Date.now()) }`.

## Decisions/Notes
- Chose Vite over CRA for faster setup and builds; TypeScript for robust typing on props/state.
- Used useReducer for centralized, testable state management (pure functions, immutable updates); included smoke tests for reducer logic.
- Added persistence and optionals (editing, filters, bulks) as bonuses to demonstrate extensibility, while keeping core minimal.
- Focused on a11y with real buttons, labels via aria, and keyboard support per spec.
- No external UI libs; pure CSS for styling to minimize dependencies.

## Browser Support
- Tested on latest Chrome, Edge, Firefox, Safari (as per browserslist in package.json: last 2 versions, not dead).

## Version Information
- Node.js: >=18 (as per engines in package.json).
- React: 18.3.1
- React DOM: 18.3.1
- Vite: 5.4.0
- TypeScript: 5.5.4
- Full dependencies listed in `package.json`.