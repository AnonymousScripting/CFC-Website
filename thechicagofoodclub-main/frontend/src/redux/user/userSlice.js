import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  token: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.currentUser = {
        ...action.payload.user,
      };
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    updateUser: (state, action) => {
      // merge updated fields into current user
      state.currentUser = {
        ...state.currentUser,
        ...action.payload,
      };
    },
  },
});

export const { loginSuccess, logout, updateUser } = userSlice.actions;
export default userSlice.reducer;
