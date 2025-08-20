export type Task = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
};

export type Filter = 'all' | 'active' | 'completed';
