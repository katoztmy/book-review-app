import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "./BookSlice";

export const store = configureStore({
  reducer: {
    books: booksReducer,
  },
});
