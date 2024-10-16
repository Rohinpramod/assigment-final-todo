import axios from "axios";

const API_URL = "mongodb+srv://rohinpramod320:aINiNHnHcoyEY5Jp@cluster0.vyvl9.mongodb.net/TodoassigFinal?retryWrites=true&w=majority";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;