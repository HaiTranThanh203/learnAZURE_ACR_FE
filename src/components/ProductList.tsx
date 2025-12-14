import React, { useEffect, useState } from 'react';
import { useProductStore } from '../store/useProductStore';
import AddFormModal from './AddFormModal'; 
import type { ProductPayload, Product } from '../types/Product';
import DataTable from './DataTable'; 
import type { Column } from './DataTable';

export default function ProductList() {
  const { products, fetchProducts, createProduct, deleteProduct, isLoading } = useProductStore();
  const [open, setOpen] = useState(false);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = async (payload: ProductPayload) => { await createProduct(payload); };
  const handleDelete = (id: string) => { if(window.confirm('Xóa sản phẩm?')) deleteProduct(id); };

  // ĐỊNH NGHĨA CỘT
  const columns: Column<Product>[] = [
    { header: 'Tên sản phẩm', accessor: 'name', className: 'font-medium text-gray-900' },
    { 
      header: 'Giá', 
      accessor: (p) => `$${p.price.toLocaleString()}`, 
      className: 'font-mono text-blue-600' 
    },
    { header: 'Số lượng', accessor: 'quantity' },
    { header: 'Mô tả', accessor: (p) => <span className="italic text-gray-500 truncate max-w-xs block">{p.description || '-'}</span> },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Quản lý Sản phẩm</h2>
        <button onClick={handleOpen} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          + Thêm sản phẩm
        </button>
      </div>

      <AddFormModal<ProductPayload> 
        key={open ? 'prod-open' : 'prod-closed'}
        isOpen={open}
        mode="product"
        onClose={handleClose}
        onSubmit={handleSubmit}
      />

      {/* DÙNG TABLE CHUNG -> Layout y hệt Employee */}
      <DataTable<Product>
        isLoading={isLoading}
        data={products}
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