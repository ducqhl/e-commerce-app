import axios from "axios";

const api = axios.create({
  baseURL: "https://ecommerce-appi.herokuapp.com/api",
  timeout: 1000,
});

export const getProducts = async (category) => {
  return api.get(`/product?category=${category ?? ""}`);
};

export const getProduct = async (id) => {
  return api.get(`/product/find/${id}`);
};

export const checkout = async ({ tokenId, amount }) => {
  return api.post(`/checkout/payment`, { tokenId, amount });
};

export const login = async (user) => {
  return api.post(`/auth/login`, user);
};
