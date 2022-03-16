import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    startLogin: (state) => { state.isFetching = true },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFalure: (state) => {
      state.isFetching = false;
      state.error = true;
    }
  },
});

export const { startLogin, loginFalure, loginSuccess } = userSlice.actions;

export default userSlice.reducer;
