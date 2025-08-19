import { create } from 'zustand';

export interface User {
  id: string;
  email: string;
  role: 'superadmin' | 'businessadmin';
  status: 'active' | 'inactive';
  password?: string;
}

export interface UserState {
  user: any;
  setUser: (user: any) => void;
  role: 'superadmin' | 'businessadmin' | null;
  setRole: (role: 'superadmin' | 'businessadmin' | null) => void;
  users: User[];
  setUsers: (users: User[]) => void;
  updateUserStatus: (id: string, status: 'active' | 'inactive') => void;
  superAdminPassword: string;
  setSuperAdminPassword: (password: string) => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  setUser: (user) => set({ user }),
  role: null,
  setRole: (role) => set({ role }),
  users: [
    { id: '1', email: 'businessadmin@demo.com', role: 'businessadmin', status: 'active', password: 'businessadmin123' },
    { id: '2', email: 'businessadmin2@demo.com', role: 'businessadmin', status: 'active', password: 'businessadmin123' }
  ],
  setUsers: (users) => set({ users }),
  updateUserStatus: (id, status) => {
    const updated = get().users.map(u => u.id === id ? { ...u, status } : u);
    set({ users: updated });
  },
  superAdminPassword: '12345x',
  setSuperAdminPassword: (password) => set({ superAdminPassword: password })
}));
