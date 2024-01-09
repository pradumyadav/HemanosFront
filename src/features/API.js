import axios from "axios";
const BASE_URI = "http://localhost:8080";

const axiosInstance = axios.create({
  baseURL: BASE_URI,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token") || null;
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosInstance;
