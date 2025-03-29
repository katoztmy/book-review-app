import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import "./SignIn.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "./authSlice";

export const SignIn = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (data) => {
    clearErrors();
    setIsLoading(true);

    const userData = {
      email: data.email,
      password: data.password,
    };
    try {
      const response = await fetch(
        "https://railway.bookreview.techtrain.dev/signin",
        {
          headers: {
            "Content-type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(userData),
        }
      );

      const responseBody = await response.json();

      if (!response.ok) {
        let errMsg =
          responseBody.ErrorMessageJP || "不明なエラーが発生しました";
        setError("form", { type: "manual", message: errMsg });
        return;
      }

      localStorage.setItem("token", responseBody.token);
      dispatch(login());
      navigate("/books");
    } catch (error) {
      setError("form", {
        type: "manual",
        message:
          "ネットワークエラーが発生しました。インターネット接続を確認してください。",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      {isLoading ? (
        <h2 className="login-message">ログイン中です</h2>
      ) : (
        <>
          <h1>ログイン</h1>
          <div className="error-message">
            {errors.form && <span>{errors.form.message}</span>}
          </div>
          <form onSubmit={handleSubmit(handleLogin)}>
            <label htmlFor="email">メールアドレス</label>
            <input
              id="email"
              type="email"
              placeholder="メールアドレス"
              {...register("email", {
                required: "メールアドレスを入力してください",
              })}
            />
            <label htmlFor="password">パスワード</label>
            <input
              id="password"
              type="password"
              placeholder="パスワード"
              {...register("password", {
                required: "パスワードを入力してください",
                minLength: {
                  value: 4,
                  message: "パスワードは4文字以上で入力してください",
                },
              })}
            />
            <div className="error-text">
              {errors.password && errors.password.message}
              {errors.email && <div>{errors.email.message}</div>}
            </div>
            <button type="submit" className="text-white">
              ログイン
            </button>
          </form>
          <Link to="/signup" className="signup-link">
            アカウント作成はこちら
          </Link>
        </>
      )}
    </>
  );
};
