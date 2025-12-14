// src/components/DataTable.tsx
import React from 'react';

// 1. Định nghĩa cấu trúc cột
export interface Column<T> {
  header: string;
  // accessor có thể là tên trường (string) hoặc một hàm render tùy chỉnh
  accessor: keyof T | ((item: T) => React.ReactNode);
  className?: string; // Class riêng cho cột (vd: text-right, w-20)
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  // Hàm render nút bấm hành động (Delete/Edit) cho mỗi dòng
  renderActions?: (item: T) => React.ReactNode;
  isLoading?: boolean;
}

// Component Generic <T> nhận vào dữ liệu có _id
export default function DataTable<T extends { _id: string }>({ 
  data, 
  columns, 
  renderActions, 
  isLoading 
}: DataTableProps<T>) {
  
  // Loading State
  if (isLoading) {
    return (
      <div className="bg-white p-8 text-center rounded-lg shadow border border-gray-200">
        <p className="text-gray-500 animate-pulse">Đang tải dữ liệu...</p>
      </div>
    );
  }

  // Empty State
  if (!data || data.length === 0) {
    return (
      <div className="bg-white p-8 text-center rounded-lg shadow border border-gray-200">
        <p className="text-gray-500">Không có dữ liệu hiển thị.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden bg-white shadow-sm rounded-lg border border-gray-200">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col, index) => (
                <th
                  key={index}
                  scope="col"
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${col.className || ''}`}
                >
                  {col.header}
                </th>
              ))}
              {/* Cột Actions (nếu có) */}
              {renderActions && (
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hành động
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50 transition-colors duration-150">
                {columns.map((col, index) => (
                  <td key={index} className={`px-6 py-4 whitespace-nowrap text-sm text-gray-700 ${col.className || ''}`}>
                    {/* Logic hiển thị: Nếu là hàm thì gọi hàm, nếu là key thì lấy giá trị */}
                    {typeof col.accessor === 'function' 
                      ? col.accessor(item) 
                      : (item[col.accessor] as React.ReactNode)}
                  </td>
                ))}
                
                {/* Render nút Actions */}
                {renderActions && (
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {renderActions(item)}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}