import { useEffect, useState } from "react";
import "./Books.css";

export const Books = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://railway.bookreview.techtrain.dev/books?offset=0",
          {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            method: "GET",
          }
        );
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error("本の取得に失敗しました:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReviews();
  }, []);

  return (
    <div className="container">
      <h1 className="font-bold">レビュー一覧</h1>
      {isLoading ? (
        <p>読み込み中...</p>
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              <h2>{book.title}</h2>
              <p>{book.author}</p>
              <p>{book.impressions}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
