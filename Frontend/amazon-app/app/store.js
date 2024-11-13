import { configureStore } from "@reduxjs/toolkit";
import Token from "./redux/slices/authSlice/token";
export const store = configureStore({
  reducer: {
    auth: Token,
  },
});
