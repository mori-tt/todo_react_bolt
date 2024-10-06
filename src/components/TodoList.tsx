import React from 'react';
import { useTodoContext } from '../context/TodoContext';
import TodoItem from './TodoItem';
import { SortOption } from '../types/todo';

const TodoList: React.FC = () => {
  const { todos, sortTodos } = useTodoContext();

  const handleSort = (option: SortOption) => {
    sortTodos(option);
  };

  return (
    <div className="w-full max-w-md">
      <div className="mb-4 flex justify-end space-x-2">
        <button onClick={() => handleSort('createdAt')} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
          Sort by Date
        </button>
        <button onClick={() => handleSort('title')} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
          Sort by Title
        </button>
        <button onClick={() => handleSort('category')} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
          Sort by Category
        </button>
      </div>
      <ul>
        {todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;