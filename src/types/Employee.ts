// src/types/Employee.ts

export interface Employee {
  _id: string; // ID do MongoDB tạo, luôn là string
  name: string; // Bắt buộc
  email: string; // Bắt buộc, Unique
  phone?: string; // Không bắt buộc
  position: string; // Bắt buộc
  salary?: number; // Không bắt buộc
  department?: string; // Không bắt buộc
  status: 'active' | 'inactive'; // Enum, mặc định 'active'
  createdAt: string; // timestamps: true
  updatedAt: string; // timestamps: true
}

// Interface cho dữ liệu gửi lên (Create/Update)
export interface EmployeePayload {
  name: string;
  email: string;
  phone?: string;
  position: string;
  salary?: number;
  department?: string;
  status?: 'active' | 'inactive';
}