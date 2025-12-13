export interface Todo {
  _id: string; // MongoDB luôn trả về _id
  title: string;
  description?: string;
  completed: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateTodoInput {
  title: string;
  description?: string;
}