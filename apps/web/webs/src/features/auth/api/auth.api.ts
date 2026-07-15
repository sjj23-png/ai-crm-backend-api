import apiClient from "../../../services/api";

import api from "../../../constants/api";

import type {
  LoginRequest,
  RegisterRequest,
  RefreshTokenRequest,
} from "../types/auth.types";

const authApi = {
  register(data: RegisterRequest) {
    return apiClient.post(api.auth.register, data);
  },

  login(data: LoginRequest) {
    return apiClient.post(api.auth.login, data);
  },

  logout() {
    return apiClient.post(api.auth.logout);
  },

  me() {
    return apiClient.get(api.auth.me);
  },

  refresh(data: RefreshTokenRequest) {
    return apiClient.post(api.auth.refresh, data);
  },
};

export default authApi;