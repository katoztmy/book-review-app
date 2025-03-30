import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { updateBook } from "../api/api";

export const useBookEdit = (bookData) => {
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    reset(bookData);
  }, [reset, bookData.id]);

  const handleReview = async () => {
    setApiError(null);
    setIsLoading(true);

    try {
      await updateBook(bookData.id, bookData);
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
    handleReview,
    register,
    handleSubmit,
    errors,
  };
};
