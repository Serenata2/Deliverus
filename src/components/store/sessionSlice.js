import { createSlice } from "@reduxjs/toolkit";

const sessionSlice = createSlice({
  name: "sessionSlice",
  initialState: {
    session: false,
    nickname: "",
  },
  reducers: {
    logIn: (state, action) => {
      state.session = true;
      state.nickname = action.payload;
    },
    logOut: (state, action) => {
      state.session = false;
      state.nickname = "";
    },
  },
});

export default sessionSlice;
export const { logIn, logOut } = sessionSlice.actions;
