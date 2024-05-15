import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL_USER } from "../Utils/BaseUrl";

export const fetchUser = createAsyncThunk("user/fetch", async () => {
  const response = await axios.get(BASE_URL_USER);
  return response.data;
});

const UserSlice = createSlice({
  name: "userIsLogin",
  initialState: {
    status: "",
    user: {},
    login: false,
  },
  reducers: {
    isLogin: (state) => {
      return (state.login = true), localStorage.setItem("isLogin", state.login);
    },
    isLogout: (state) => {
      return (
        (state.login = false),
        localStorage.removeItem("username"),
        localStorage.removeItem("isLogin")
      );
    },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { isLogin, isLogout } = UserSlice.actions;
export default UserSlice.reducer;
