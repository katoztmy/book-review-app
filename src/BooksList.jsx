import { useDispatch, useSelector } from "react-redux";
import { BookItem } from "./BookItem";
import { useEffect } from "react";
import { Pagination } from "./Pagination";
import { fetchBooks, setOffset } from "./BookSlice";
import "./BooksList.css";
import { Link, useNavigate } from "react-router";
import { fetchUserInfo, logout } from "./authSlice";

export const BooksList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { books, offset } = useSelector((state) => state.books);
  const { isLoggedIn, userName } = useSelector((state) => state.auth);
  const isLastPage = books.length < 10;

  useEffect(() => {
    if (isLoggedIn && !userName) {
      dispatch(fetchUserInfo());
    }
  }, [dispatch, userName]);

  useEffect(() => {
    console.log(isLoggedIn);
    if (isLoggedIn) {
      dispatch(fetchBooks(offset, "/books"));
    } else {
      dispatch(fetchBooks(offset, "/public/books"));
    }
  }, [dispatch, offset, isLoggedIn]);

  const handlePrevious = () => {
    console.log(offset);
    if (offset === 0) return;
    if (offset >= 10) dispatch(setOffset(offset - 10));
  };

  const handleNext = () => {
    console.log(offset);
    if (isLastPage) return;
    if (offset >= 0) dispatch(setOffset(offset + 10));
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      {isLoggedIn ? (
        <header className="bg-cyan-500 w-screen h-18">
          <p className="absolute right-40 top-6">
            <Link to="/profile">{userName}さん</Link>
          </p>
          <Link to="/new">
            <img
              src="src/assets/1.svg"
              alt="レビュー投稿画面"
              width="40"
              height="40"
              className="absolute top-4 left-10"
            />
          </Link>
          <button
            className="text-white absolute right-4 top-4"
            onClick={handleLogout}
          >
            ログアウト
          </button>
        </header>
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
