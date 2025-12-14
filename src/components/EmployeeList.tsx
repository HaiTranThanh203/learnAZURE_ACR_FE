import React, { useEffect, useState } from 'react';
import { useEmployeeStore } from '../store/useEmployee';
import AddFormModal from './AddFormModal';
import type { EmployeePayload, Employee } from '../types/Employee';
import DataTable from './DataTable'; // Import bảng chung
import type { Column } from './DataTable';

export default function EmployeeList() {
  const { employees, fetchEmployees, createEmployee, deleteEmployee, isLoading } = useEmployeeStore();
  const [open, setOpen] = useState(false);

  useEffect(() => { fetchEmployees(); }, [fetchEmployees]);

  // Các hàm xử lý
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = async (payload: EmployeePayload) => { await createEmployee(payload); };
  const handleDelete = (id: string) => { if(window.confirm('Xóa nhân viên?')) deleteEmployee(id); };

  // ĐỊNH NGHĨA CỘT (Cấu hình hiển thị)
  const columns: Column<Employee>[] = [
    { 
      header: 'Họ và Tên', 
      accessor: (e) => (
        <div>
          <div className="font-medium text-gray-900">{e.name}</div>
          <div className="text-gray-500 text-xs">{e.email}</div>
        </div>
      )
    },
    { header: 'Vị trí', accessor: 'position' },
    { 
      header: 'Trạng thái', 
      accessor: (e) => (
        <span className={`px-2 py-1 text-xs rounded-full ${e.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {e.status}
        </span>
      ) 
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Quản lý Nhân viên</h2>
        <button onClick={handleOpen} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          + Thêm nhân viên
        </button>
      </div>

      <AddFormModal<EmployeePayload>
        key={open ? 'emp-open' : 'emp-closed'}
        isOpen={open}
        mode="employee"
        onClose={handleClose}
        onSubmit={handleSubmit}
      />

      {/* DÙNG TABLE CHUNG */}
      <DataTable<Employee>
        isLoading={isLoading}
        data={employees}
        columns={columns}
        renderActions={(item) => (
          <button onClick={() => handleDelete(item._id)} className="text-red-600 hover:text-red-900 font-medium">
            Xóa
          </button>
        )}
      />
    </div>
  );
}