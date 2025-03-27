import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router";

export const BookDetail = () => {
  const location = useLocation();
  const bookData = location.state?.bookData;
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const fetchBook = async () => {
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
      const data = await response.json();
      reset({
        title: data.title,
        url: data.url,
        detail: data.url,
        review: data.review,
      });
    };
    fetchBook();
  }, [reset]);

  //   const handleReview = () => {};

  return (
    <>
      <div className="review-container">
        <h1>レビュー投稿</h1>
        {apiError && (
          <div className="error-banner" role="alert">
            {apiError}
          </div>
        )}
        <form>
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
            {isLoading ? "送信中..." : "投稿"}
          </button>
        </form>
      </div>
    </>
  );
};
