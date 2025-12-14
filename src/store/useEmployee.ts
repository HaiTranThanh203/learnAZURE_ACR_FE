import { create } from 'zustand';
import axiosClient from '../api/axiosClient';
import { EmployeeEndpoints } from '../api/endpoints';
import type { Employee, EmployeePayload } from '../types/Employee';

interface EmployeeState {
  employees: Employee[];
  isLoading: boolean;
  error: string | null;

  fetchEmployees: () => Promise<void>;
  fetchEmployeeById: (id: string) => Promise<Employee | null>;
  createEmployee: (data: EmployeePayload) => Promise<void>;
  updateEmployee: (id: string, data: Partial<EmployeePayload>) => Promise<void>;
  deleteEmployee: (id: string) => Promise<void>;
}

export const useEmployeeStore = create<EmployeeState>((set, get) => ({
  employees: [],
  isLoading: false,
  error: null,

  fetchEmployees: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosClient.get(EmployeeEndpoints.GET_ALL_EMPLOYEES);
      set({ employees: res.data, isLoading: false });
    } catch (err: any) {
      set({ error: err?.message ?? 'Fetch employees failed', isLoading: false });
    }
  },

  fetchEmployeeById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosClient.get(EmployeeEndpoints.GET_EMPLOYEE_BY_ID(id));
      set({ isLoading: false });
      return res.data as Employee;
    } catch (err: any) {
      set({ error: err?.message ?? 'Fetch employee failed', isLoading: false });
      return null;
    }
  },

  createEmployee: async (data) => {
    try {
      const res = await axiosClient.post(EmployeeEndpoints.CREATE_EMPLOYEE, data);
      set((state) => ({ employees: [res.data, ...state.employees] }));
    } catch (err: any) {
      console.error('Create employee failed:', err);
    }
  },

  updateEmployee: async (id, data) => {
    try {
      // Optimistic update
      set((state) => ({
        employees: state.employees.map((e) =>
          e._id === id ? ({ ...e, ...data, updatedAt: new Date().toISOString() } as Employee) : e
        ),
      }));
      await axiosClient.put(EmployeeEndpoints.UPDATE_EMPLOYEE(id), data);
    } catch (err) {
      // Revert on error
      get().fetchEmployees();
    }
  },

  deleteEmployee: async (id) => {
    try {
      // Optimistic remove
      set((state) => ({ employees: state.employees.filter((e) => e._id !== id) }));
      await axiosClient.delete(EmployeeEndpoints.DELETE_EMPLOYEE(id));
    } catch (err) {
      // Revert on error
      get().fetchEmployees();
    }
  },
}));