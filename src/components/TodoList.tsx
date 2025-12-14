import React, { useEffect } from 'react';
import { useTodoStore } from '../store/useTodoStore';
import type { Todo } from '../types/todo'; // Giả sử bạn có type Todo
import DataTable from './DataTable';
import type { Column } from './DataTable';
export const TodoList = () => {
  const { todos, fetchTodos, isLoading, toggleTodo, deleteTodo } = useTodoStore();

  useEffect(() => { fetchTodos(); }, [fetchTodos]);

  const handleToggle = (id: string, current: boolean) => { toggleTodo(id, current); };
  const handleDelete = (id: string) => { if(window.confirm('Xóa việc này?')) deleteTodo(id); };

  // ĐỊNH NGHĨA CỘT CHO TODO
  const columns: Column<Todo>[] = [
    { 
      header: 'Trạng thái', 
      accessor: (t) => (
        <input 
          type="checkbox" 
          checked={t.completed} 
          onChange={() => handleToggle(t._id, t.completed)}
          className="w-4 h-4 text-blue-600 rounded cursor-pointer"
        />
      ),
      className: 'w-16 text-center'
    },
    { 
      header: 'Nội dung công việc', 
      accessor: (t) => (
        <span className={t.completed ? 'line-through text-gray-400' : 'text-gray-900 font-medium'}>
          {t.title}
        </span>
      ) 
    },
  ];

  return (
    // Dùng chung wrapper div với padding y hệt
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Danh sách việc cần làm</h2>
        {/* Todo thường thêm ở form riêng bên trên, ở đây để trống nút hoặc thêm nút Add Modal nếu muốn */}
        <div className="h-10"></div> 
      </div>

      <DataTable<Todo>
        isLoading={isLoading}
        data={todos}
        columns={columns}
        renderActions={(item) => (
          <button onClick={() => handleDelete(item._id)} className="text-red-600 hover:text-red-900 font-medium">
            Xóa
          </button>
        )}
      />
    </div>
  );
};