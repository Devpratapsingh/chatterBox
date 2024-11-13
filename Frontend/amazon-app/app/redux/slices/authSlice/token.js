import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveAccessToken(state, action) {
      state.accessToken = action.payload||"";
    },
  },
});

export const { saveAccessToken } = authSlice.actions;

export default authSlice.reducer;
