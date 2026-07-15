import type { AuthUser } from "../../../types";


export interface RegisterRequest {
  name: string;

  email: string;

  password: string;
}

export interface LoginRequest {
  email: string;

  password: string;
}

export interface AuthTokens {
  accessToken: string;

  refreshToken: string;
}

export interface LoginResult {
  user: AuthUser;

  accessToken: string;

  refreshToken: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}