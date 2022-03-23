import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    startFetching: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    endFetchingFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // GET ALL
    getProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products = action.payload;
    },
    // DELETE
    deleteProductSuccess: (state, action) => {
      state.isFetching = false;
      const deletedProductId = action.payload;
      const deletedProductIndex = state.products.findIndex(
        (p) => p._id === deletedProductId,
      );

      state.products.splice(deletedProductIndex, 1);
    },
    // UPDATE
    updateProductSuccess: (state, action) => {
      state.isFetching = false;
      const updatedProductId = action.payload.id;
      const updatedProductIndex = state.products.findIndex(
        (p) => p._id === updatedProductId,
      );
      state.products[updatedProductIndex] = action.payload.updateprops;
    },
    // ADD
    addProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products.push(action.payload);
    },
  },
});

export const {
  startFetching,
  endFetchingFailure,
  getProductSuccess,
  deleteProductSuccess,
  updateProductSuccess,
  addProductSuccess,
} = productSlice.actions;

export default productSlice.reducer;
