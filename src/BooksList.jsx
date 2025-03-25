import { useDispatch, useSelector } from "react-redux";
import { BookItem } from "./BookItem";
import { useEffect } from "react";
import { Pagination } from "./Pagination";
import { fetchBooks, setOffset } from "./BookSlice";
import "./BooksList.css";
import { Link } from "react-router";

export const BooksList = () => {
  const dispatch = useDispatch();

  const { books, offset } = useSelector((state) => state.books);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const isLastPage = books.length < 10;

  useEffect(() => {
    dispatch(fetchBooks(offset));
  }, [dispatch, offset]);

  const handlePrevious = () => {
    if (offset === 0) return;
    if (offset >= 1) dispatch(setOffset(offset - 1));
  };

  const handleNext = () => {
    if (isLastPage) return;
    if (offset >= 0) dispatch(setOffset(offset + 1));
  };

  return (
    <>
      {isLoggedIn ? (
        <header className="bg-cyan-500 w-screen h-18">user</header>
      ) : (
        <header className="bg-cyan-500 w-screen h-18">
          {
            <button className="absolute right-4 top-4">
              <Link to="/login">ログイン</Link>
            </button>
          }
        </header>
      )}
      <div className="container px-4 py-6 mx-auto">
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
    </>
  );
};
