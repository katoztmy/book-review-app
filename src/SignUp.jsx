import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { useImageUpload } from "./hooks/useImageUpload";
import "./SignUp.css";
import { useDispatch } from "react-redux";
import { login } from "./authSlice";

export const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const { uploadImage, isUploading, error: imageError } = useImageUpload();

  if (imageError && !errors.picture) {
    setError("picture", imageError);
  }

  const onSubmit = async (data) => {
    const userData = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    const response = await fetch(
      "https://railway.bookreview.techtrain.dev/users",
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(userData),
      }
    );

    const responseBody = await response.json();

    if (!response.ok) {
      switch (response.status) {
        case 409:
          setError("email", {
            type: "duplicated",
            message: responseBody.ErrorMessageJP,
          });
          break;
        case 403:
        case 500:
        case 503:
          alert(responseBody.ErrorMessageJP);
          break;
      }
      return;
    }

    const token = responseBody.token;
    localStorage.setItem("token", token);
    dispatch(login(token));
    if (data.picture && data.picture.length > 0) {
      const uploadResult = await uploadImage(data.picture[0], token);

      if (!uploadResult.success) {
        console.log(
          `${uploadResult.error}、ですがユーザーの登録は成功しました。`
        );
      }
    }

    navigate("/books");
  };

  return (
    <>
      <h1>新規アカウント作成</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          {errors.picture && (
            <p style={{ color: "red", fontSize: "0.8rem", margin: "4px 0" }}>
              {errors.picture.message}
            </p>
          )}
          <label htmlFor="picture">プロフィール画像</label>
          <input
            type="file"
            accept="image/jpeg, image/png"
            id="picture"
            {...register("picture")}
          />
          *3MBまで
          <label htmlFor="name">名前</label>
          <input
            {...register("name", { required: "名前は必須です" })}
            type="text"
            id="name"
          />
          {errors.email && (
            <p style={{ color: "red", fontSize: "0.8rem", margin: "4px 0" }}>
              {errors.email.message}
            </p>
          )}
          <label htmlFor="email">メールアドレス</label>
          <input
            {...register("email", { required: true })}
            type="email"
            id="email"
          />
          <label htmlFor="password">パスワード</label>
          <input
            {...register("password", { required: true })}
            type="password"
            id="password"
          />
          <button type="submit" disabled={isUploading}>
            {isUploading ? "アップロード中..." : "登録"}
          </button>
        </div>
      </form>
      <Link to="/login" className="signin-link">
        ログインはこちら
      </Link>
    </>
  );
};
