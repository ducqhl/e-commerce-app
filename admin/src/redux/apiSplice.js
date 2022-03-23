import {
  addProductSuccess,
  deleteProductSuccess,
  endFetchingFailure,
  getProductSuccess,
  startFetching,
  updateProductSuccess,
} from "./productSlice";
import * as api from "../api";
import { loginSuccess } from "./userSlice";

export const login = async (dispatch, history, { username, password }) => {
  dispatch(startFetching());

  try {
    const res = await api.login({ username, password });
    dispatch(loginSuccess(res.data));
    history.push("/");
  } catch (error) {
    console.log(error);
    dispatch(endFetchingFailure());
  }
};

export const getProducts = async (dispatch) => {
  dispatch(startFetching());

  try {
    const res = await api.getProducts();
    dispatch(getProductSuccess(res.data));
  } catch (error) {
    console.log(error);
    dispatch(endFetchingFailure());
  }
};

export const deleteProduct = async (dispatch, id) => {
  dispatch(startFetching());

  try {
    await api.deleteProduct(id);
    debugger;
    dispatch(deleteProductSuccess(id));
  } catch (error) {
    console.log(error);
    dispatch(endFetchingFailure());
  }
};

export const updateProduct = async (dispatch, id, updateProps) => {
  dispatch(startFetching());

  try {
    await api.updateProduct(id, updateProps);
    dispatch(updateProductSuccess({ id, updateProps }));
  } catch (error) {
    console.log(error);
    dispatch(endFetchingFailure());
  }
};

export const addProduct = async (dispatch, product) => {
  dispatch(startFetching());

  try {
    const res = await api.addProduct(product);
    dispatch(addProductSuccess(res.data));
  } catch (error) {
    console.log(error);
    dispatch(endFetchingFailure());
  }
};
