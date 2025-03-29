import { useEffect, useState } from "react";
import { fetchBookById } from "../api/api";

export const useBookDetail = (bookId, initialData) => {
  const [loading, setLoading] = useState(true);
  const [book, setBook] = useState(initialData || {});
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!bookId) {
      setLoading(false);
      return;
    }

    const getBookData = async () => {
      try {
        setLoading(true);
        const data = await fetchBookById(bookId);
        setBook(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getBookData();
  }, [bookId]);

  return { book, loading, error };
};
