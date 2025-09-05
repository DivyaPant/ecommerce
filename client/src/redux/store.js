import { configureStore } from "@reduxjs/toolkit";
import userSlice from './slice/userSlice';
import authSlice from "./slice/authSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    auth: authSlice
  }
})

export default store;