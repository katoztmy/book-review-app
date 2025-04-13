import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { updateBook, fetchBookById } from "../api/api";

export const useBookEdit = (id) => {
  console.log(id);
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [bookData, setBookData] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const getBookData = useCallback(async () => {
    if (!id) return;
    try {
      setIsLoading(true);
      const data = await fetchBookById(id);
      setBookData(data);
      reset(data);
    } catch (err) {
      setApiError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [id, reset]);

  useEffect(() => {
    getBookData();
  }, [getBookData]);

  const handleReview = async (formData) => {
    setApiError(null);
    setIsLoading(true);

    try {
      await updateBook(id, formData);
      setIsLoading(false);
      navigate("/books");
    } catch (error) {
      setApiError(error.message);
      setIsLoading(false);
    }
  };

  return {
    apiError,
    isLoading,
    bookData,
    handleReview,
    register,
    handleSubmit,
    errors,
  };
};
