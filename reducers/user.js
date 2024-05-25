import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    firstname: null,
    lastname: null,
    email: null,
    token: null,
    photos: [],
  },
};

userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.firstname = action.payload.firstName;
      state.value.lastname = action.payload.lastName;
      state.value.email = action.payload.email;
      state.value.token = action.payload.token;
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
