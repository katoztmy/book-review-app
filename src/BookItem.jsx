import React from "react";
import { Link } from "react-router";

export const BookItem = ({ book }) => {
  return (
    <Link to={`/books/${book.id}`} state={{ bookData: book }}>
      <li className="bg-white hover:shadow-lg p-6 min-w-[400px]">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">
          {book.title}
        </h2>
        <p className="text-blue-600 hover:underline mb-3 text-sm">
          <span>{book.url}</span>
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
    </Link>
  );
};
