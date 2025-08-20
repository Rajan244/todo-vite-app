import { tasksReducer } from './store';

let s = [];
s = tasksReducer(s as any, { type: 'ADD', text: 'A' } as any);
console.assert((s as any[]).length === 1 && s[0].text === 'A', 'ADD failed');

const id = (s as any[])[0].id;
s = tasksReducer(s as any, { type: 'TOGGLE', id } as any);
console.assert(s[0].completed === true, 'TOGGLE -> true failed');

s = tasksReducer(s as any, { type: 'EDIT', id, text: 'Ax' } as any);
console.assert(s[0].text === 'Ax', 'EDIT failed');

s = tasksReducer(s as any, { type: 'DELETE', id } as any);
console.assert(s.length === 0, 'DELETE failed');

console.log('Reducer smoke tests passed ✅');
