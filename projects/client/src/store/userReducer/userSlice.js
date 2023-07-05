import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: localStorage.getItem("token") ? true : false,
    user: {
      id: null,
      username: null,
      email: null,
      phoneNumber: null,
      storeName: null,
    },
  },
  reducers: {
    addUser: (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    getUser: (state) => {
      const user = localStorage.getItem("user");
      state.user = JSON.parse(user);
    },
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      state.isLoggedIn = false;
      state.user = {
        id: null,
        username: null,
        email: null,
        phoneNumber: null,
        storeName: null,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { addUser, getUser, logout } = userSlice.actions;

export default userSlice.reducer;
