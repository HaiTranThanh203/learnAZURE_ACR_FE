import React, { useState, useEffect } from 'react';
// Đảm bảo đường dẫn import đúng với cấu trúc thư mục của bạn
import  type { ProductPayload } from '../types/Product';
import  type { EmployeePayload } from '../types/Employee';

// Định nghĩa Union Type
type EntityPayload = ProductPayload | EmployeePayload; 
type Mode = 'employee' | 'product';

// Quan trọng: Định nghĩa Generic <T>
interface Props<T extends EntityPayload> {
  isOpen: boolean;
  mode: Mode;
  onClose: () => void;
  // onSubmit nhận vào payload kiểu T
  onSubmit: (payload: T) => Promise<void> | void; 
}

// Quan trọng: Function Component phải có <T extends EntityPayload>
export default function AddFormModal<T extends EntityPayload>({ isOpen, mode, onClose, onSubmit }: Props<T>) {
  // Ép kiểu khởi tạo state
  const [data, setData] = useState<T>({} as T); 

  // Nếu bạn dùng key prop ở cha, có thể bỏ useEffect này, 
  // nhưng giữ lại cũng không sao để đảm bảo an toàn.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (isOpen) setData({} as T);
  }, [isOpen]);

  if (!isOpen) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(data);
    onClose();
  };
  
  // Xử lý input số (cho Price)
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>, key: keyof T) => {
    const value = e.target.value;
    setData({ 
        ...data, 
        [key]: value === '' ? undefined : Number(value) 
    });
  };

  // Xử lý input chuỗi
  const handleStringChange = (e: React.ChangeEvent<HTMLInputElement>, key: keyof T) => {
    setData({ ...data, [key]: e.target.value });
  };
  
  const inputClass = "mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500";
  const labelClass = "block text-sm font-medium text-gray-700 mb-2";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <form 
        onSubmit={submit} 
        className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-md"
      >
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          {mode === 'employee' ? 'Add New Employee' : 'Add New Product'}
        </h3>

        {mode === 'employee' ? (
          <>
            <label className={labelClass}>
              Name
              <input 
                className={inputClass} 
                value={(data as EmployeePayload).name || ''} 
                onChange={(e) => handleStringChange(e, 'name' as keyof T)} 
                required 
              />
            </label>
            <label className={labelClass}>
              Email
              <input 
                className={inputClass} 
                type="email"
                value={(data as EmployeePayload).email || ''} 
                onChange={(e) => handleStringChange(e, 'email' as keyof T)} 
                required
              />
            </label>
            <label className={labelClass}>
              Position
              <input 
                className={inputClass} 
                value={(data as EmployeePayload).position || ''} 
                onChange={(e) => handleStringChange(e, 'position' as keyof T)} 
                required
              />
            </label>
          </>
        ) : (
          <>
            <label className={labelClass}>
              Name
              <input 
                className={inputClass} 
                value={(data as ProductPayload).name || ''} 
                onChange={(e) => handleStringChange(e, 'name' as keyof T)} 
                required 
              />
            </label>
            <label className={labelClass}>
              Price
              <input 
                className={inputClass} 
                type="number" 
                value={(data as ProductPayload).price ?? ''} 
                onChange={(e) => handleNumberChange(e, 'price' as keyof T)} 
                required
                min="0"
              />
            </label>
            <label className={labelClass}>
              Description
              <input 
                className={inputClass} 
                value={(data as ProductPayload).description || ''} 
                onChange={(e) => handleStringChange(e, 'description' as keyof T)} 
              />
            </label>
          </>
        )}

        <div className="flex justify-end gap-3 mt-6">
          <button 
            type="button" 
            onClick={onClose} 
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}