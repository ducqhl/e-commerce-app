import * as api from "../api";
import { loginFalure, loginSuccess, startLogin } from "./user"

export const login = async (dispatch, user) => {
  dispatch(startLogin());

  try {
    const res = await api.login(user);

    dispatch(loginSuccess(res.data))
  } catch (error) {
    console.log(error);
    dispatch(loginFalure())
  }
}