/**
 * API Endpoints Configuration
 * Tập trung quản lý tất cả các endpoint API của ứng dụng
 */

// Base URL (được định nghĩa trong axiosClient.ts)
// export const API_BASE_URL = '/api';
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
  // GET - Lấy danh sách tất cả users
  GET_ALL_USERS: '/users',
  
  // GET - Lấy user theo ID
  GET_USER_BY_ID: (id: string) => `/users/${id}`,
  
  // POST - Tạo user mới
  CREATE_USER: '/users',
  
  // PUT - Cập nhật user
  UPDATE_USER: (id: string) => `/users/${id}`,
  
  // DELETE - Xóa user
  DELETE_USER: (id: string) => `/users/${id}`,
};

export const AuthEndpoints = {
  // Thêm auth endpoints tại đây
};

export const ProductEndpoints = {
  // GET - Lấy danh sách tất cả products
  GET_ALL_PRODUCTS: '/products',
  
  // GET - Lấy product theo ID
  GET_PRODUCT_BY_ID: (id: string) => `/products/${id}`,
  
  // POST - Tạo product mới
  CREATE_PRODUCT: '/products',
  
  // PUT - Cập nhật product
  UPDATE_PRODUCT: (id: string) => `/products/${id}`,
  
  // DELETE - Xóa product
  DELETE_PRODUCT: (id: string) => `/products/${id}`,
};

export const EmployeeEndpoints = {
  // GET - Lấy danh sách tất cả employees
  GET_ALL_EMPLOYEES: '/employees',
  
  // GET - Lấy employee theo ID
  GET_EMPLOYEE_BY_ID: (id: string) => `/employees/${id}`,
  
  // POST - Tạo employee mới
  CREATE_EMPLOYEE: '/employees',
  
  // PUT - Cập nhật employee
  UPDATE_EMPLOYEE: (id: string) => `/employees/${id}`,
  
  // DELETE - Xóa employee
  DELETE_EMPLOYEE: (id: string) => `/employees/${id}`,
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
