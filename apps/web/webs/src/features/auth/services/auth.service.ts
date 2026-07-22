import storageService from "@/services/storage";


import authApi from "../api";

import type {
  LoginRequest,
  LoginResponse,
  MeResponse,
} from "../types/auth.types";

class AuthService {
  async login(
    payload: LoginRequest,
  ): Promise<LoginResponse> {
    
    const response = await authApi.loginApi(payload);

    storageService.setAccessToken(
      response.accessToken,
    );

    storageService.setRefreshToken(
      response.refreshToken,
    );

    storageService.set(
      "crm_user",
      response.user,
    );

    return response;
  }

  async logout(): Promise<void> {
    try {
      await authApi.logoutApi();
    } finally {
      storageService.removeAccessToken();

      storageService.removeRefreshToken();

      storageService.remove("crm_user");

      storageService.remove("crm_permissions");
    }
  }

  // async getCurrentUser(): Promise<MeResponse> {
  //   return getCurrentUserApi();
  // }

  isAuthenticated(): boolean {
    return storageService.has("access_token");
  }
}

const authService = new AuthService();

export default authService;