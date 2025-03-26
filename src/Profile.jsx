import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo, setUser } from "./authSlice";

export const Profile = () => {
  const { userName } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  const handleUser = (e) => {
    dispatch(setUser(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://railway.bookreview.techtrain.dev/users",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ name: userName }),
        }
      );

      if (!response.ok) {
        throw new Error("ユーザー情報の更新に失敗しました");
      }

      alert("ユーザー情報を更新しました");
    } catch (error) {
      console.error("エラー:", error);
      alert(error.message);
    }
  };

  return (
    <>
      <div className="edit-container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">
            <p className="text-2xl">ユーザー名</p>
            <input type="text" value={userName || ""} onChange={handleUser} />
          </label>
          <button type="submit" className="text-white">
            保存
          </button>
        </form>
      </div>
    </>
  );
};
