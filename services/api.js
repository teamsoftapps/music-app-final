import axios from "axios";

const api = axios.create({
  baseURL: process.env.base_url,
});

export const adminApi = axios.create({
  baseURL: "http://localhost:5000",
});

export default api;
