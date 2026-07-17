import axios from "axios";
import type { AxiosError, InternalAxiosRequestConfig } from "axios";


import { apiClient } from "./client";

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      /**
       * Future:
       * Refresh session
       * Logout
       * Redirect
       */
    }

    if (error.response?.status === 403) {
      /**
       * Future:
       * Redirect to 403 page
       */
    }

    return Promise.reject(error);
  },
);

export default apiClient;