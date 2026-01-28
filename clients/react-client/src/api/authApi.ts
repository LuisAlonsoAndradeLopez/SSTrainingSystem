// src/api/authAPI.ts
import { api } from './api';
import type { User } from '../types/User';
import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse
} from '../types/authTypes';

export const login = (data: LoginRequest) =>
  api.post<AuthResponse>('/login', data);

export const registerUser = (data: RegisterRequest) =>
  api.post<AuthResponse>('/registerUser', data);

export const getMe = () =>
  api.get<User>('/me');

export const logout = () =>
  api.post('/logout');
