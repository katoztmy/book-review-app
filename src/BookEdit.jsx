import { useParams } from "react-router-dom";
import "./BookEdit.css";
import { useBookEdit } from "./hooks/useBookEdit";
import { useNavigate } from "react-router-dom";

export const BookEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { apiError, isLoading, handleReview, register, handleSubmit, errors } =
    useBookEdit(id);
  const handleDelete = async () => {
    await fetch(`https://railway.bookreview.techtrain.dev/books/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("削除に失敗しました");
        }
        navigate("/books");
      })
      .catch((error) => {
        alert(error.message);
      });
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
            保存
          </button>
          <button
            type="button"
            disabled={isLoading}
            onClick={handleDelete}
            className="delete-button"
          >
            削除
          </button>
        </form>
      </div>
    </>
  );
};
