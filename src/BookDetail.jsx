import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import "./BookDetail.css";
import { useBookDetail } from "./hooks/useBookDetail";

export const BookDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookData = location.state?.bookData;

  const { book, loading, error } = useBookDetail(bookData.id);

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="review-container">
        <div className="loading">取得中です...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="review-container">
        <div className="error">{error}</div>
        <button onClick={handleBack} className="back-button">
          戻る
        </button>
      </div>
    );
  }

  const displayData = book.id ? book : bookData;

  return (
    <div className="review-container">
      <h1>レビュー詳細</h1>

      <div className="form-group">
        <label htmlFor="title">タイトル</label>
        <p>{displayData.title}</p>
      </div>

      <div className="form-group">
        <label htmlFor="url">URL</label>
        <p>{displayData.url}</p>
      </div>

      <div className="form-group">
        <label htmlFor="detail">書籍詳細情報</label>
        <p>{displayData.detail}</p>
      </div>

      <div className="form-group">
        <label htmlFor="review">読んだ感想</label>
        <p>{displayData.review}</p>
      </div>

      <button onClick={handleBack} className="back-button">
        戻る
      </button>
    </div>
  );
};
