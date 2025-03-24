import React from "react";

export const BookItem = ({ book }) => {
  return (
    <li className="bg-white hover:shadow-lg p-6 min-w-[400px]">
      <h2 className="text-xl font-semibold mb-2 text-gray-800">{book.title}</h2>
      <p className="text-blue-600 hover:underline mb-3 text-sm">
        <a>{book.url}</a>
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
  );
};
