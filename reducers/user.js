import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {},
};

userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
    logout: (state) => {
      state.value.firstname = null;
      state.value.username = null;
      state.value.email = null;
      state.value.token = null;
    },
    addPhoto: (state, action) => {
      state.value.photos.push(action.payload);
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
