import Compressor from "compressorjs";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import "./SignUp.css";

export const SignUp = () => {
  const MAX_FILE_SIZE = 1048576;
  const MAX_UPLOAD_SIZE = 3145728;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const onSubmit = async (data) => {
    // ユーザー登録apiを行う、name,email,passwordを受け取り、tokenを返す
    // railway.bookreview.techtrain.devに対して上記の3つをリクエストボディに含め、POSTリクエストを送信
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
    // レスポンスエラーの場合の処理
    if (!response.ok) {
      const errorData = await response.json();
      switch (response.status) {
        case 409:
          setError("email", {
            type: "duplicated",
            message: errorData.ErrorMessageJP,
          });
          break;
        case (403, 500, 503):
          alert(errorData.ErrorMessageJP);
          break;
      }
    }

    if (data.picture && data.picture.length > 0) {
      if (
        data.picture[0].type !== "image/jpeg" &&
        data.picture[0].type !== "image/png"
      ) {
        setError("picture", {
          type: "noSelected",
          message: "jpegかpngの画像を選択してください",
        });
        return;
      }
      if (data.picture[0].size > MAX_UPLOAD_SIZE) {
        alert("3MB以下の画像を選択してください");
        setError("picture", {
          type: "overSize",
          message: "3MB以下の画像を選択してください",
        });
        return;
      }
      console.log(data.picture[0]);
      if (data.picture[0].size <= MAX_FILE_SIZE) {
        const formDate = new formDate();
        formDate.append("picture", data.picture[0]);
        const response = await fetch(
          "https://railway.bookreview.techtrain.dev/uploads",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formDate,
          }
        );
        const res = await response.json();
      } else {
        new Compressor(data.picture[0], {
          quality: 0.3,
          success(result) {},
          error(err) {
            console.log(`${err.message}、ですがユーザーの登録は成功しました。`);
          },
        });
      }
    }
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
          <button type="submit">登録</button>
        </div>
      </form>
      <Link to="/login" className="signin-link">
        ログインはこちら
      </Link>
    </>
  );
};
