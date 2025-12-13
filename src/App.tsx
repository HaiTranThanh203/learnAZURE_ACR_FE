import { AddTodoForm } from './components/AddTodoForm';
import { TodoList } from './components/TodoList';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            MindX Todo App
          </h1>
          
          <AddTodoForm />
          <TodoList />
        </div>
      </div>
    </div>
  );
}

export default App;