



export interface LoginRequest {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface CurrentUser {
  id: string;

  name: string;

  email: string;

  role: string;

  avatar?: string;

  companyId?: string;
}

export interface LoginResponse {
  accessToken: string;

  refreshToken: string;

  user: CurrentUser;
}

export interface MeResponse {
  success: boolean;

  user: CurrentUser;
}