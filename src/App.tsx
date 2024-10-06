import React from 'react';
import { TodoProvider } from './context/TodoContext';
import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';
import { CheckSquare } from 'lucide-react';

function App() {
  return (
    <TodoProvider>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <CheckSquare className="mx-auto h-12 w-12 text-blue-500" />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Todo App</h2>
          </div>
          <AddTodoForm />
          <TodoList />
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;