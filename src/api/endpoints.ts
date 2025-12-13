/**
 * API Endpoints Configuration
 * Tập trung quản lý tất cả các endpoint API của ứng dụng
 */

// Base URL (được định nghĩa trong axiosClient.ts)
export const API_BASE_URL = '/api';

/**
 * Todo Endpoints
 */
export const TodoEndpoints = {
  // GET - Lấy danh sách tất cả todos
  GET_ALL_TODOS: '/todos',
  
  // POST - Tạo todo mới
  CREATE_TODO: '/todos',
  
  // PUT - Cập nhật todo (status, title, etc.)
  UPDATE_TODO: (id: string) => `/todos/${id}`,
  
  // DELETE - Xóa todo
  DELETE_TODO: (id: string) => `/todos/${id}`,
};

/**
 * Các endpoint khác (nếu có trong tương lai)
 */
export const UserEndpoints = {
  // Thêm user endpoints tại đây
};

export const AuthEndpoints = {
  // Thêm auth endpoints tại đây
};

/**
 * Helper function để lấy endpoint động
 */
export const getEndpoint = (endpointPath: string | ((param: string) => string), param?: string): string => {
  if (typeof endpointPath === 'function' && param) {
    return endpointPath(param);
  }
  return endpointPath as string;
};
