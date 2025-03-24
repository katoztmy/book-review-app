import { useDispatch, useSelector } from "react-redux";
import { BookItem } from "./BookItem";
import { useEffect } from "react";
import { Pagination } from "./Pagination";
import { fetchBooks, setOffset } from "./BookSlice";
import "./BooksList.css";

export const BooksList = () => {
  const dispatch = useDispatch();

  const { books, offset } = useSelector((state) => state.books);
  const isLastPage = books.length < 10;

  useEffect(() => {
    dispatch(fetchBooks(offset));
  }, [dispatch, offset]);

  const handlePrevious = () => {
    console.log("prev", offset);
    if (offset === 0) return;
    if (offset >= 1) dispatch(setOffset(offset - 1));
  };

  const handleNext = () => {
    if (isLastPage) return;
    if (offset >= 0) dispatch(setOffset(offset + 1));
  };

  return (
    <div className="container px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">レビュー一覧</h1>
      <div className="min-h-[800px]">
        <ul className="grid lg:grid-cols-3 gap-6 ">
          {books.map((book) => (
            <BookItem key={book.id} book={book} />
          ))}
        </ul>
      </div>
      <Pagination
        offset={offset}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </div>
  );
};
