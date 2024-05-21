import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    firstname: null,
    lastname: null,
    email: null,
    phone: null,
    token: null,
  },
};

userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.firstname = action.payload.firstname;
      state.value.lastname = action.payload.lastname;
      state.value.email = action.payload.email;
      state.value.phone = action.payload.phone;
      state.value.token = action.payload.token;
    },
    logout: (state) => {
      state.value.firstname = null;
      state.value.username = null;
      state.value.email = null;
      state.value.phone = null;
      state.value.token = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
