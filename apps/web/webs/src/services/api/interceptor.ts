import apiClient from "./client";


apiClient.interceptors.request.use(
  (config) => {
    return config;
  },

  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,

  (error) => Promise.reject(error)
);

export default apiClient;