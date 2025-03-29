const API_BASE_URL = "https://railway.bookreview.techtrain.dev";

export const fetchBookById = async (bookId) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("認証に失敗しています。");
  }

  const response = await fetch(`${API_BASE_URL}/books/${bookId}`, {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "GET",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.ErrorMessageJP || "書籍情報の取得に失敗しました");
  }

  return response.json();
};
