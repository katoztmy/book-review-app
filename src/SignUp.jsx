import Compressor from "compressorjs";
import { useForm } from "react-hook-form";

export const SignUp = () => {
  const MAX_FILE_SIZE = 1048576;
  const MAX_UPLOAD_SIZE = 3145728;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    // 画像が選択されている場合
    if (data.picture && data.picture.length > 0) {
      // 画像のサイズが1MB以下かつjpegかpngの場合
      if (
        data.picture[0].type !== "image/jpeg" &&
        data.picture[0].type !== "image/png"
      ) {
        alert("jpegかpngの画像を選択してください");
        return;
      }
      if (data.picture[0].size > MAX_UPLOAD_SIZE) {
        alert("3MB以下の画像を選択してください");
        return;
      }
      if (data.picture[0].size <= MAX_FILE_SIZE) {
        // そのままアイコンアップロードapiを叩く
      } else {
        // 画像を圧縮してアップロード
        new Compressor(data.picture[0], {
          quality: 0.6,
          success(result) {
            // 圧縮後の画像をアップロード
          },
          error(err) {
            console.log(err.message);
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
    </>
  );
};
