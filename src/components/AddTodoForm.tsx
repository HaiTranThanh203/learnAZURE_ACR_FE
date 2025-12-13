import { useState } from 'react';
import { useTodoStore } from '../store/useTodoStore';

export const AddTodoForm = () => {
  const [title, setTitle] = useState('');
  const addTodo = useTodoStore((state) => state.addTodo);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    await addTodo({ title });
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        className="flex-1 p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Nhập công việc cần làm..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button 
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white font-semibold rounded shadow hover:bg-blue-700 transition"
      >
        Thêm
      </button>
    </form>
  );
};