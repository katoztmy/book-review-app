import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router";

export const NewBook = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleReview = async (data) => {
    setApiError(null);
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://railway.bookreview.techtrain.dev/books",
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          method: "POST",
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
      {isLoading && (
        <div className="fixed inset-0 bg-white bg-opacity-70 flex items-center justify-center z-50">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

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
          <button type="submit" disabled={isLoading} className="relative">
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                <span>送信中...</span>
              </div>
            ) : (
              "投稿"
            )}
          </button>
        </form>
      </div>
    </>
  );
};
