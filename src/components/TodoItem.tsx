import React, { useState } from 'react';
import { Todo } from '../types/todo';
import { useTodoContext } from '../context/TodoContext';
import { Check, Trash2, Edit, X } from 'lucide-react';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { toggleTodo, deleteTodo, editTodo } = useTodoContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedCategory, setEditedCategory] = useState(todo.category);

  const handleEdit = () => {
    editTodo(todo.id, editedTitle, editedCategory);
    setIsEditing(false);
  };

  return (
    <li className="flex items-center justify-between p-4 bg-white shadow rounded-lg mb-2">
      {isEditing ? (
        <div className="flex-grow flex items-center space-x-2">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="flex-grow p-2 border rounded"
          />
          <input
            type="text"
            value={editedCategory}
            onChange={(e) => setEditedCategory(e.target.value)}
            className="w-24 p-2 border rounded"
            placeholder="Category"
          />
          <button onClick={handleEdit} className="p-2 bg-green-500 text-white rounded hover:bg-green-600">
            <Check size={18} />
          </button>
          <button onClick={() => setIsEditing(false)} className="p-2 bg-red-500 text-white rounded hover:bg-red-600">
            <X size={18} />
          </button>
        </div>
      ) : (
        <>
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className={`flex-grow ${todo.completed ? 'line-through text-gray-500' : ''}`}>
              {todo.title}
            </span>
            <span className="text-sm text-gray-500 bg-gray-200 px-2 py-1 rounded">
              {todo.category}
            </span>
          </div>
          <div className="flex space-x-2">
            <button onClick={() => setIsEditing(true)} className="p-2 text-blue-500 hover:text-blue-600">
              <Edit size={18} />
            </button>
            <button onClick={() => deleteTodo(todo.id)} className="p-2 text-red-500 hover:text-red-600">
              <Trash2 size={18} />
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default TodoItem;