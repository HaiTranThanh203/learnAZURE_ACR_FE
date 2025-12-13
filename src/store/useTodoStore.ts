import { create } from 'zustand';
import axiosClient from '../api/axiosClient';
import { TodoEndpoints } from '../api/endpoints';
import type { Todo, CreateTodoInput } from '../types/todo';

interface TodoState {
  todos: Todo[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchTodos: () => Promise<void>;
  addTodo: (data: CreateTodoInput) => Promise<void>;
  toggleTodo: (id: string, currentStatus: boolean) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
}

export const useTodoStore = create<TodoState>((set, get) => ({
  todos: [],
  isLoading: false,
  error: null,

  fetchTodos: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosClient.get(TodoEndpoints.GET_ALL_TODOS);
      set({ todos: response.data, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  addTodo: async (data) => {
    try {
      const response = await axiosClient.post(TodoEndpoints.CREATE_TODO, data);
      // Cập nhật state ngay lập tức mà không cần gọi lại API fetch
      set((state) => ({ todos: [response.data, ...state.todos] }));
    } catch (error: any) {
      console.error("Add failed:", error);
    }
  },

  toggleTodo: async (id, currentStatus) => {
    try {
      // Optimistic update (Cập nhật giao diện trước cho mượt)
      set((state) => ({
        todos: state.todos.map((t) =>
          t._id === id ? { ...t, completed: !currentStatus } : t
        ),
      }));
      
      // Gọi API sau
      await axiosClient.put(TodoEndpoints.UPDATE_TODO(id), { completed: !currentStatus });
    } catch (error) {
      // Revert nếu lỗi (bạn có thể handle kỹ hơn)
      get().fetchTodos(); 
    }
  },

  deleteTodo: async (id) => {
    try {
      set((state) => ({
        todos: state.todos.filter((t) => t._id !== id),
      }));
      await axiosClient.delete(TodoEndpoints.DELETE_TODO(id));
    } catch (error) {
      get().fetchTodos();
    }
  },
}));