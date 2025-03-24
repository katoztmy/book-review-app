import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  books: [],
  offset: 0,
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
  },
});

export const { setBooksData, setOffset } = booksSlice.actions;

export const fetchBooks = (offset) => async (dispatch) => {
  try {
    const response = await fetch(
      `https://railway.bookreview.techtrain.dev/books?offset=${offset}`,
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
