import { ThunkAction } from "redux-thunk";
import { RootState } from "slices";
import { Action, Dispatch } from "redux";
import { registerSuccess, registerFailed } from "./reducer";
import apiClient from "../../../helpers/api_helper";
import Cookies from "universal-cookie";
// import { getCompanyId } from "helpers/jwt-token-access/jwtHelper";

interface RegisterData {
  email: string;
  username: string;
  password: string;
  companyId: string;
}

const cookies = new Cookies();

export const registerUser = (
  registerData: RegisterData
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch: Dispatch
) => {
  try {
    // registerData.companyId = getCompanyId();
    const response = await apiClient.post("/auth/register", registerData);

    const { token, expiration } = response.data;

    cookies.set("token", token, { path: "/", expires: new Date(expiration) });

    dispatch(registerSuccess({ token, expiration }));
  } catch (error) {
    dispatch(registerFailed(error));
  }
};
