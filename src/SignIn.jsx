import { useForm } from "react-hook-form";
import { Link } from "react-router";
import "./SignIn.css";

export const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  return (
    <>
      <h1>ログイン</h1>
      <form action="">
        <label htmlFor="email">メールアドレス</label>
        <input
          id="email"
          type="email"
          placeholder="メールアドレス"
          {...register("email", { required: true })}
        />
        <label htmlFor="password">パスワード</label>
        <input
          id="password"
          type="password"
          placeholder="パスワード"
          {...register("password", { required: true })}
        />
        <button type="submit">ログイン</button>
      </form>
      <Link to="/signup" className="signup-link">
        アカウント作成はこちら
      </Link>
    </>
  );
};
