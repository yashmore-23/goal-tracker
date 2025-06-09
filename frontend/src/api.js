// src/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://192.168.0.103:8000",  // your backend base URL
});

// Add a request interceptor to include token in headers automatically
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // or get from context if you prefer
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;

