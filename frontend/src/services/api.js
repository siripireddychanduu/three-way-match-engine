import axios from "axios";

const api = axios.create({
  baseURL: "https://three-way-match-backend.onrender.com",
});

api.interceptors.request.use((config) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  console.log("Token:", token);
  console.log("Request URL:", config.url);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  console.log("Headers:", config.headers);

  return config;
});

export default api;
