import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RegisterState {
  user: string;
  error: string | null;
  success: boolean;
}

const initialState: RegisterState = {
  user: "",
  error: null,
  success: false,
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    registerSuccess(state, action: PayloadAction<any>) {
      state.user = action.payload.token;
      state.success = true;
      state.error = null;
    },
    registerFailed(state, action: PayloadAction<any>) {
      state.error = action.payload;
      state.success = false;
    },
    resetRegister(state) {
      state.success = false;
      state.error = null;
    },
  },
});

export const { registerSuccess, registerFailed, resetRegister } = registerSlice.actions;
export default registerSlice.reducer;
