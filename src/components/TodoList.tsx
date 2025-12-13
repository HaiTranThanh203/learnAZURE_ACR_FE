import { useEffect } from 'react';
import { useTodoStore } from '../store/useTodoStore';

export const TodoList = () => {
  // Lấy dữ liệu và action từ Store
  const { todos, fetchTodos, isLoading, toggleTodo, deleteTodo } = useTodoStore();

  // Gọi API lấy danh sách khi component vừa hiện lên
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  if (isLoading && todos.length === 0) return <p className="text-center text-gray-500">Đang tải...</p>;

  return (
    <ul className="space-y-3">
      {todos.map((todo) => (
        <li 
          key={todo._id} 
          className="flex items-center justify-between p-3 bg-white border rounded shadow-sm hover:shadow-md transition"
        >
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo._id, todo.completed)}
              className="w-5 h-5 cursor-pointer accent-blue-600"
            />
            <span className={`${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
              {todo.title}
            </span>
          </div>
          <button
            onClick={() => deleteTodo(todo._id)}
            className="text-red-500 hover:text-red-700 font-medium text-sm"
          >
            Xóa
          </button>
        </li>
      ))}
      {todos.length === 0 && !isLoading && (
        <p className="text-center text-gray-400 mt-4">Chưa có công việc nào.</p>
      )}
    </ul>
  );
};