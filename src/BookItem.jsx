import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const BookItem = ({ book }) => {
  const navigate = useNavigate();
  const submitLog = async () => {
    await fetch("https://railway.bookreview.techtrain.dev/logs", {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "POST",
      body: JSON.stringify({ selectBookId: book.id }),
    });
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    navigate(`/edit/${book.id}`, { state: { bookData: book } });
  };
  return (
    <Link
      to={`/detail/${book.id}`}
      state={{ bookData: book }}
      onClick={submitLog}
    >
      <li className="bg-white hover:shadow-lg p-6 min-w-[400px] h-64">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">
          {book.title.length > 15
            ? book.title.substring(0, 15) + "..."
            : book.title}
        </h2>
        <p className="text-blue-600 hover:underline mb-3 text-sm">
          url:{" "}
          <span>
            {book.url.length > 20
              ? book.url.substring(0, 20) + "..."
              : book.url}
          </span>
        </p>
        <p>
          レビュワー:{" "}
          {book.reviewer.length > 10
            ? book.reviewer.substring(0, 10) + "..."
            : book.reviewer}
        </p>
        <p>
          詳細情報:{" "}
          {book.detail.length > 10
            ? book.detail.substring(0, 10) + "..."
            : book.detail}
        </p>
        {book.isMine && (
          <button className="mt-2" onClick={handleEditClick}>
            編集
          </button>
        )}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-gray-700">
            感想:{" "}
            {book.review.length > 20
              ? book.review.substring(0, 20) + "..."
              : book.review}
          </p>
        </div>
      </li>
    </Link>
  );
};
