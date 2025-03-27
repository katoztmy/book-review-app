import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import "./BookDetail.css";

export const BookDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookData = location.state?.bookData;
  const [loading, setLoading] = useState(true);
  const [book, setBook] = useState({});

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(
          `https://railway.bookreview.techtrain.dev/books/${bookData.id}`,
          {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            method: "GET",
          }
        );

        if (!response.ok) {
          throw new Error("書籍情報の取得に失敗しました");
        }

        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.error("Error fetching book:", error);
      } finally {
        setLoading(false);
      }
    };

    if (bookData && bookData.id) {
      fetchBook();
    } else {
      setLoading(false);
    }
  }, [bookData]);

  const handleBack = () => {
    navigate(-1);
  };

  const displayData = book.id ? book : bookData;

  return (
    <>
      {loading ? (
        <div className="review-container">
          <div>取得中です</div>
        </div>
      ) : (
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
      )}
    </>
  );
};
