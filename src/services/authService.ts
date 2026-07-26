import api from '@/lib/axios';
import { LoginRequest, RegisterRequest, AuthResponse } from '@/types/auth';

export const register = (data: RegisterRequest) => {
  return api.post<AuthResponse>('/auth/register', data);
};

export const login = (data: LoginRequest) => {
  return api.post<AuthResponse>('/auth/login', data);
};

export const logout = () => {
  return api.post('/auth/logout');
};

export const refreshToken = () => {
  return api.post<AuthResponse>('/auth/refresh');
};
