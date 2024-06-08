import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")!) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SetCredentials: (state, action) => {
      console.log(action.payload);
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    logout: (state, _action) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { SetCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
