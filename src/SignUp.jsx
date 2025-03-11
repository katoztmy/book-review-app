import { useForm } from "react-hook-form";

export const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="名前">名前</label>
        <input
          {...register("name", { required: "名前は必須です" })}
          type="text"
          id="name"
        />
        <p>{errors.name?.message}</p>
        <label htmlFor="メールアドレス">メールアドレス</label>
        <input
          {...register("email", { required: true })}
          type="email"
          id="email"
        />
        <label htmlFor="パスワード">パスワード</label>
        <input
          {...register("password", { required: true })}
          type="password"
          id="password"
        />
        <button type="submit">登録</button>
      </form>
    </div>
  );
};
