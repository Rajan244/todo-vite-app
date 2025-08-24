# Barebones React To-Do App

## How to Run Locally

- To run in development mode: `npm install` then `npm run dev` (opens at http://localhost:5173).
- To test the reducer: `npm test`.
- To run in production mode: `npm run build` then `npm run preview` (serves at http://localhost:4173).

## Tooling Choice

- Framework: React v18.3.1 (via Vite v5.4.0 for fast development with HMR and optimized builds).
- Language: TypeScript v5.5.4 (for type safety and better developer experience).
- Other Dev Dependencies: @vitejs/plugin-react v4.3.0, @types/react v18.3.3, @types/react-dom v18.3.0.

## Features

### Core Operations
- **Create Task**: Enter text in the input field and press "Enter" or click the "+" button to add. Input is trimmed; empty or whitespace-only inputs are ignored.
- **List Tasks**: Tasks displayed in a list, newest first (sorted by `createdAt` timestamp).
- **Toggle Completion**: Checkbox per task to mark complete/incomplete. Completed tasks show strike-through text.
- **Delete Task**: Delete button (🗑 icon) per task removes it immediately.
- **Empty State**: Shows "No tasks yet." when no tasks are present.

### Additional Enhancements
- **Task Editing**: Inline edit mode (✎ to enter, ✓ to save, Escape to cancel) to update task text.
- **Filters**: View "All", "Active", or "Done" tasks with counts (e.g., All 5) for better task management.
- **Bulk Actions**: More menu (⋮) with Clear All, Clear All Done, Mark All Done (disabled when inapplicable) to handle multiple tasks.
- **Persistence**: Tasks and list title saved to localStorage (debounced) and loaded on init for a smoother experience across refreshes.
- **Editable List Title**: Customizable header title (defaults to "My Tasks") to personalize the app.
- **Task Counts**: Real-time counts for all/active/completed in filters to track progress.

### Styling and UX
- **Layout**: Responsive with CSS Flexbox/Grid. Width clamped (min 420px, max 900px) for mobile/desktop. Light theme with blue accents.
- **Visuals**: Completed tasks have strike-through; hover effects on buttons/icons; rounded borders for polish.
- **Accessibility**: Aria-labels (e.g., "Mark [task] as completed", "Delete task"); keyboard nav (Tab order: input > checkboxes > deletes; Enter adds/saves; Space toggles/activates); semantic HTML.
- **Performance**: Memoized filters/counts/handlers to minimize re-renders; efficient for small lists.

### Data Model
- In-memory array of `Task` objects: `{ id: string (crypto.randomUUID()), text: string (trimmed), completed: boolean, createdAt: number (Date.now()) }`.

## Decisions/Notes
- Chose Vite over CRA for faster setup and builds; TypeScript for robust prop/state typing.
- Used useReducer for centralized state management with pure updates; added reducer tests for reliability.
- Included editing, filters, bulk actions, persistence, and editable title to explore extensibility and enhance usability, aligning with spec’s allowance for additional features.
- Prioritized accessibility with buttons, aria-labels, and keyboard support.
- Used pure CSS (no UI libs) for minimal dependencies.

## Potential Future Improvements
- **Task Descriptions**: Add a description field to tasks for extra context, editable inline.
- **Unit Tests**: Expand test coverage with Jest for components alongside reducer tests.
- **Customizable Themes**: Add user-selectable color themes (e.g., blue, green) with dark mode toggle using CSS variables.
- **Micro-Animations**: Add CSS transitions for task add/delete (e.g., fade-in/out) for smoother UX.
- **Error Feedback**: Show user-facing alerts for edge cases (e.g., storage quota exceeded).

## Browser Support
- Tested on latest Chrome, Edge, Firefox, Safari (per browserslist: last 2 versions, not dead).

## Version Information
- Node.js: >=18 (per package.json engines).
- React: 18.3.1
- React DOM: 18.3.1
- Vite: 5.4.0
- TypeScript: 5.5.4
- Full dependencies in `package.json`.