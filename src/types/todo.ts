export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  category: string;
  createdAt: number;
}

export type SortOption = 'createdAt' | 'title' | 'category';