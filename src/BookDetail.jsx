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

  // 早期リターンってやつらしい
  if (loading) {
    return (
      <div className="review-container">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600">取得中です...</p>
        </div>
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
