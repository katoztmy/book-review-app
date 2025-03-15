import { useForm } from "react-hook-form";

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
        <input
          id="email"
          type="email"
          placeholder="メールアドレス"
          {...register("email", { required: true })}
        />
        <input
          id="password"
          type="password"
          placeholder="パスワード"
          {...register("password", { required: true })}
        />
        <button type="submit">ログイン</button>
      </form>
    </>
  );
};
