import axios from "axios";

const API = axios.create({
  baseURL: "https://mini-social-postapps.onrender.com/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token && req.headers) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;