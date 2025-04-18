import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  books: [],
  offset: 0,
  isLoading: false,
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setBooksData: (state, action) => {
      state.books = action.payload;
    },
    setOffset: (state, action) => {
      state.offset = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setBooksData, setOffset, setIsLoading } = booksSlice.actions;

export const fetchBooks = (offset, url) => async (dispatch) => {
  try {
    console.log(url);
    const response = await fetch(
      `https://railway.bookreview.techtrain.dev${url}?offset=${offset}`,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        method: "GET",
      }
    );

    const data = await response.json();

    dispatch(setBooksData(data));

    dispatch(setOffset(offset));
  } catch (error) {
    console.error("本の取得に失敗しました:", error);
  }
};

export default booksSlice.reducer;
