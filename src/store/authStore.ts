import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthResponse } from '@/types/auth';

interface AuthState {
  user: AuthResponse | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (data: AuthResponse) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isAdmin: false,

      login: (data: AuthResponse) => {
        localStorage.setItem('accessToken', data.accessToken);
        set({
          user: data,
          isAuthenticated: true,
          isAdmin: data.role === 'Admin',
        });
      },

      logout: () => {
        localStorage.removeItem('accessToken');
        set({
          user: null,
          isAuthenticated: false,
          isAdmin: false,
        });
      },
    }),
    {
      name: 'auth-storage',
    },
  ),
);

export default useAuthStore;
