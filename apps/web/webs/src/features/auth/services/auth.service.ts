import storageService from "../../../services/storage";


import storage from "../../../constants/storage";

import authApi from "../api";

import type {
  LoginRequest,
  RegisterRequest,
  RefreshTokenRequest,
  LoginResult,
} from "../types/auth.types";
import type { AuthUser } from "../../../types";

class AuthService {
  async register(data: RegisterRequest) {
    const response =
      await authApi.register(data);

    return response.data;
  }

  async login(data: LoginRequest) {
    const response =
      await authApi.login(data);

    const result =
      response.data as LoginResult;

    storageService.set(
      storage.accessToken,
      result.accessToken
    );

    storageService.set(
      storage.refreshToken,
      result.refreshToken
    );

    storageService.set(
      storage.user,
      result.user
    );

    return result;
  }

  async logout() {
    try {
      await authApi.logout();
    } finally {
      storageService.remove(
        storage.accessToken
      );

      storageService.remove(
        storage.refreshToken
      );

      storageService.remove(
        storage.user
      );
    }
  }

  async me() {
    const response =
      await authApi.me();

    return response.data;
  }

  async refresh() {
    const refreshToken =
      storageService.get<string>(
        storage.refreshToken
      );

    if (!refreshToken) {
      throw new Error(
        "Refresh token not found."
      );
    }

    const payload: RefreshTokenRequest =
      {
        refreshToken,
      };

    const response =
      await authApi.refresh(payload);

    return response.data;
  }

  isAuthenticated() {
    return storageService.has(
      storage.accessToken
    );
  }
  getUser(): AuthUser | null {
  return storageService.get<AuthUser>(
    storage.user
  );
}
  getAccessToken() {
    return storageService.get<string>(
      storage.accessToken
    );
  }

  getRefreshToken() {
    return storageService.get<string>(
      storage.refreshToken
    );
  }

  getCurrentUser() {
    return storageService.get(
      storage.user
    );
  }
}
const authService = new AuthService();
export default authService;