import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import "./SignIn.css";
import { useState } from "react";
const Spinner = () => <div className="spinner"></div>;
export const SignIn = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();

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
        let errMsg;
        switch (responseBody.ErrorCode) {
          case 400:
            errMsg = responseBody.ErrorMessageJP;
            break;
          case 401:
            errMsg = responseBody.ErrorMessageJP;
            break;
          case 403:
            errMsg = responseBody.ErrorMessageJP;
            break;
          case 404:
            errMsg = responseBody.ErrorMessageJP;
            break;
          case 500:
            errMsg = responseBody.ErrorMessageJP;
            break;
          case 503:
            errMsg = responseBody.ErrorMessageJP;
            break;
          default:
            errMsg = "不明なエラーが発生しました";
            break;
        }
        setError("form", { type: "manual", message: errMsg });
        return;
      }

      localStorage.setItem("token", responseBody.token);

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
          {console.log(errors)}
          {errors.password && errors.password.message}
          {errors.email && <div>{errors.email.message}</div>}
        </div>
        <button type="submit">ログイン</button>
      </form>
      <Link to="/signup" className="signup-link">
        アカウント作成はこちら
      </Link>
    </>
  );
};
