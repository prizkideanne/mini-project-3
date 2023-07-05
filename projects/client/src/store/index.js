import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userReducer/userSlice";

export default configureStore({
  reducer: {
    user: userSlice,
  },
});
