import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
    logout: (state) => {
      state.value = {};
    },
    addPhoto: (state, action) => {
      state.value.profilePictureURL = action.payload;
    },
  },
});

export const { login, logout, addPhoto } = userSlice.actions;
export default userSlice.reducer;
