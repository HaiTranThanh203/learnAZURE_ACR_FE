// src/types/Product.ts

export interface Product {
  _id: string; // ID do MongoDB tạo, luôn là string
  name: string; // Bắt buộc
  description?: string; // Không bắt buộc
  price: number; // Bắt buộc
  quantity: number; // Mặc định là 0
  status: 'available' | 'unavailable'; // Enum
  createdAt: string; // timestamps: true
  updatedAt: string; // timestamps: true
}

// Interface cho dữ liệu gửi lên (Create/Update)
export interface ProductPayload {
  name: string;
  description?: string;
  price: number;
  quantity?: number;
  status?: 'available' | 'unavailable';
}