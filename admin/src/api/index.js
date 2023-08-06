import axios from "axios";

const BASE_URL = "https://e-commerce-app-tyuh.onrender.com/api";

const publicRequest = axios.create({
  baseURL: BASE_URL,
});

const userRequest = () => {
  const root = JSON.parse(localStorage.getItem("persist:root") || "{}");
  const TOKEN = JSON.parse(root?.user || "{}")?.currentUser?.accessToken;

  return axios.create({
    baseURL: BASE_URL,
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
};

export const login = ({ username, password }) => {
  return publicRequest.post("/auth/login", { username, password });
};

export const getProducts = () => {
  return publicRequest.get("/product");
};

export const deleteProduct = (id) => {
  return userRequest().delete("/product/" + id);
};

export const updateProduct = (id, updateProps) => {
  return userRequest().put("/product/" + id, updateProps);
};

export const addProduct = (product) => {
  return userRequest().post("/product", product);
};

// ORDERS

export const getOders = () => {
  return userRequest().get("/order");
};

export const getOrderIncome = (id) => {
  return userRequest().get("/order/income?pid=" + id ?? "");
};

// USERS

export const getUsersStats = async () => await userRequest().get("/user/stats");

export const getUsers = async (query) => {
  const queryNew = query.new ? "new=true" : "";
  return await userRequest().get("/user?" + queryNew);
};
