import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: localStorage.getItem("token") ? true : false,
  userName: "",
  iconUrl: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userName = "";
      localStorage.removeItem("token");
    },
    setUser: (state, action) => {
      state.userName = action.payload;
    },
    setIconUrl: (state, action) => {
      state.iconUrl = action.payload;
    },
  },
});

export const { login, logout, setUser, setIconUrl } = authSlice.actions;

export const fetchUserInfo = () => async (dispatch) => {
  const response = await fetch(
    "https://railway.bookreview.techtrain.dev/users",
    {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "GET",
    }
  );

  const data = await response.json();
  dispatch(setUser(data.name));
  dispatch(setIconUrl(data.iconUrl));
};

export default authSlice.reducer;
