import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: localStorage.getItem("token") ? true : false,
  userName: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
    },
    logout: (state, action) => {
      state.isLoggedIn = false;
      localStorage.removeItem("token");
    },
    setUser: (state, action) => {
      state.userName = action.payload;
    },
  },
});

export const { login, logout, setUser } = authSlice.actions;

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
};

export default authSlice.reducer;
