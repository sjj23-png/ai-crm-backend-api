import axios from "axios";


import apiConfig from "../../config/api.config";

const apiClient = axios.create({
  baseURL: apiConfig.baseURL,

  timeout: apiConfig.timeout,

  withCredentials: apiConfig.withCredentials,

  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default apiClient;