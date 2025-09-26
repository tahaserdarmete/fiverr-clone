import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4044/api",
});

export default api;
