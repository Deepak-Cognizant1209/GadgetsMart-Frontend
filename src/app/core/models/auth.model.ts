import { User } from './user.model';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: string;
  phone: string;
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
}

export interface LoginResponse {
  status: string;
  token: string;
  email: string;
  role: string;
}

export interface RegisterResponse {
  status: string;
  message: string;
  id: string;
}

export interface GetUserResponse {
  status: string;
  message: string;
  id: User;
}

export interface UpdateUserRequest {
  name: string;
  email: string;
  phone: string;
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
}

export interface UpdateUserResponse {
  status: string;
  message: string;
  id: string;
}
