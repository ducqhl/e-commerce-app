import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
  },
  reducers: {
    addProduct: (state, action) => {
      const exsitingProductIndex = state.products.findIndex(
        (p) => p._id === action.payload._id,
      );

      if (exsitingProductIndex > -1) {
        state.products[exsitingProductIndex] = action.payload;
      } else {
        state.products.push(action.payload);
      }
    },
    removeProduct: (state, action) => {
      debugger;
      state.products = state.products.filter((p) => p._id !== action.payload);
    },
  },
});

export const { addProduct, removeProduct } = cartSlice.actions;

export default cartSlice.reducer;
