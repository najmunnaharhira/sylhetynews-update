import api from "./api";

export const login = async (payload) => {
  const response = await api.post("/auth/login", payload);
  return response.data;
};

export const register = async (payload) => {
  const response = await api.post("/auth/register", payload);
  return response.data;
};

export const adminLogin = async (payload) => {
  const response = await api.post("/auth/admin/login", payload);
  return response.data;
};
