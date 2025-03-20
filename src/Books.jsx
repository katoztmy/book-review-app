import { useEffect, useState } from "react";

export const Books = () => {
  const [books, setBooks] = useState();
  useEffect(() => {
    const fetchReviews = async () => {
      // offset=0(string)をbodyにつめてbooksをgetする
      const response = await fetch(
        "https://railway.bookreview.techtrain.dev/books?offset=0",
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          method: "GET",
        }
      );
      const data = await response.json();
      console.log(data);
      setBooks(data);
    };
    fetchReviews();
  }, []);
  return <>HelloBooks</>;
};
