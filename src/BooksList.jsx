import { useEffect, useState } from "react";
import "./BooksList.css";

export const BooksList = () => {
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
    <div className="container px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">レビュー一覧</h1>
      {isLoading ? (
        <div className="flex justify-center items-center h-32">
          <p className="text-gray-500">読み込み中...</p>
        </div>
      ) : (
        <ul className="grid lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <li key={book.id} className="bg-white hover:shadow-xl  p-6">
              <h2 className="text-xl font-semibold mb-2 text-gray-800">
                {book.title}
              </h2>
              <p className="text-blue-600 hover:underline mb-3 text-sm">
                <a href={book.url}>{book.url}</a>
              </p>
              <p>レビュワー: {book.reviewer}</p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-gray-700">
                  {book.review.length > 40
                    ? book.review.substring(0, 40) + "..."
                    : book.review}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="flex justify-center gap-12 mt-8 mb-4">
        <p className="text-blue-600 hover:text-blue-800">
          <a href="">前へ</a>
        </p>
        <p className="text-blue-600 hover:text-blue-800">
          <a href="">次へ</a>
        </p>
      </div>
    </div>
  );
};
