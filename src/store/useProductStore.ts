import { create } from 'zustand';
import axiosClient from '../api/axiosClient';
import { ProductEndpoints } from '../api/endpoints';
import type { Product, ProductPayload } from '../types/Product';

interface ProductState {
  products: Product[];
  isLoading: boolean;
  error: string | null;

  fetchProducts: () => Promise<void>;
  fetchProductById: (id: string) => Promise<Product | null>;
  createProduct: (data: ProductPayload) => Promise<void>;
  updateProduct: (id: string, data: Partial<ProductPayload>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  isLoading: false,
  error: null,

  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosClient.get(ProductEndpoints.GET_ALL_PRODUCTS);
      set({ products: res.data, isLoading: false });
    } catch (err: any) {
      set({ error: err?.message ?? 'Fetch products failed', isLoading: false });
    }
  },

  fetchProductById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosClient.get(ProductEndpoints.GET_PRODUCT_BY_ID(id));
      set({ isLoading: false });
      return res.data as Product;
    } catch (err: any) {
      set({ error: err?.message ?? 'Fetch product failed', isLoading: false });
      return null;
    }
  },

  createProduct: async (data) => {
    try {
      const res = await axiosClient.post(ProductEndpoints.CREATE_PRODUCT, data);
      // Prepend newly created product to the list
      set((state) => ({ products: [res.data, ...state.products] }));
    } catch (err: any) {
      console.error('Create product failed:', err);
    }
  },

  updateProduct: async (id, data) => {
    try {
      // Optimistic update
      set((state) => ({
        products: state.products.map((p) =>
          p._id === id ? { ...p, ...data, updatedAt: new Date().toISOString() } as Product : p
        ),
      }));
      await axiosClient.put(ProductEndpoints.UPDATE_PRODUCT(id), data);
    } catch (err) {
      // Revert by refetching if error
      get().fetchProducts();
    }
  },

  deleteProduct: async (id) => {
    try {
      // Optimistic remove
      set((state) => ({ products: state.products.filter((p) => p._id !== id) }));
      await axiosClient.delete(ProductEndpoints.DELETE_PRODUCT(id));
    } catch (err) {
      // Revert by refetching on error
      get().fetchProducts();
    }
  },
}));