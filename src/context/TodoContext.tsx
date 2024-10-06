import React, { createContext, useContext, useState, useEffect } from 'react';
import { Todo, SortOption } from '../types/todo';

interface TodoContextType {
  todos: Todo[];
  addTodo: (title: string, category: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, title: string, category: string) => void;
  sortTodos: (option: SortOption) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
};

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title: string, category: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      title,
      completed: false,
      category,
      createdAt: Date.now(),
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id: string, title: string, category: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, title, category } : todo
    ));
  };

  const sortTodos = (option: SortOption) => {
    const sortedTodos = [...todos].sort((a, b) => {
      if (option === 'createdAt') return b.createdAt - a.createdAt;
      if (option === 'title') return a.title.localeCompare(b.title);
      if (option === 'category') return a.category.localeCompare(b.category);
      return 0;
    });
    setTodos(sortedTodos);
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, toggleTodo, deleteTodo, editTodo, sortTodos }}>
      {children}
    </TodoContext.Provider>
  );
};