import axios from "axios";

const api = axios.create({
  baseURL: process.env.base_url,
});

export const adminApi = axios.create({
  baseURL: process.env.base_url_admin,
});

export default api;
