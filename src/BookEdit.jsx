import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import "./BookEdit.css";

export const BookEdit = () => {
  const location = useLocation();
  const bookData = location.state?.bookData;
  console.log(bookData);
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  useEffect(() => {
    reset(bookData);
  }, [reset, bookData.id]);

  const handleReview = async (data) => {
    setApiError(null);
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://railway.bookreview.techtrain.dev/books/${bookData.id}`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          method: "PUT",
          body: JSON.stringify({
            title: data.title,
            url: data.url,
            detail: data.detail,
            review: data.review,
          }),
        }
      );

      const responseBody = await response.json();

      if (!response.ok) {
        if (responseBody.ErrorMessageJP) {
          setApiError(responseBody.ErrorMessageJP);
        } else {
          setApiError("エラーが発生しました。もう一度お試しください。");
        }
        return;
      }

      setIsLoading(false);
      navigate("/books");
    } catch (error) {
      setApiError(
        "通信エラーが発生しました。ネットワーク接続を確認してください。"
      );
      console.error("Error:", error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="review-container">
        <h1>レビュー投稿</h1>
        {apiError && (
          <div className="error-banner" role="alert">
            {apiError}
          </div>
        )}
        <form onSubmit={handleSubmit(handleReview)}>
          <div className="form-group">
            <label htmlFor="title">タイトル</label>
            <input
              type="text"
              id="title"
              {...register("title", { required: true })}
            />
            {errors.title && (
              <p className="error-message">タイトルは必須です</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="url">URL</label>
            <input
              type="text"
              id="url"
              {...register("url", { required: true })}
            />
            {errors.url && <p className="error-message">URLは必須です</p>}
          </div>

          <div className="form-group">
            <label htmlFor="detail">書籍詳細情報</label>
            <input
              type="text"
              id="detail"
              {...register("detail", { required: true })}
            />
            {errors.detail && (
              <p className="error-message">書籍詳細は必須です</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="review">読んだ感想</label>
            <input id="review" {...register("review", { required: true })} />
            {errors.review && <p className="error-message">感想は必須です</p>}
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "送信中..." : "保存"}
          </button>
        </form>
      </div>
    </>
  );
};
