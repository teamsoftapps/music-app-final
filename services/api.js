import axios from "axios";

console.log({
  base_url: process.env.base_url,
  media_url: process.env.media_url,
});

const api = axios.create({
  baseURL: process.env.base_url,
});

export default api;
