import { useNavigate, useParams } from "react-router-dom";
import "./BookDetail.css";
import { useBookDetail } from "./hooks/useBookDetail";

export const BookDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { book, loading, error } = useBookDetail(id);

  const handleBack = () => {
    navigate(-1);
  };

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

  return (
    <div className="review-container">
      <h1>レビュー詳細</h1>

      <div className="form-group">
        <label htmlFor="title">タイトル</label>
        <p>{book.title}</p>
      </div>

      <div className="form-group">
        <label htmlFor="url">URL</label>
        <p>{book.url}</p>
      </div>

      <div className="form-group">
        <label htmlFor="detail">書籍詳細情報</label>
        <p>{book.detail}</p>
      </div>

      <div className="form-group">
        <label htmlFor="review">読んだ感想</label>
        <p>{book.review}</p>
      </div>

      <button onClick={handleBack} className="back-button">
        戻る
      </button>
    </div>
  );
};
