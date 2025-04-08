import Compressor from "compressorjs";
import { useState } from "react";

export const useImageUpload = () => {
  const MAX_FILE_SIZE = 1048576;
  const MAX_UPLOAD_SIZE = 3145728;
  const uploadUrl = "https://railway.bookreview.techtrain.dev/uploads";
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const validateImage = (file) => {
    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      return {
        type: "invalidType",
        message: "jpegかpngの画像を選択してください",
      };
    }

    if (file.size > MAX_UPLOAD_SIZE) {
      return {
        type: "overSize",
        message: `${MAX_UPLOAD_SIZE / 1048576}MB以下の画像を選択してください`,
      };
    }

    return null;
  };

  const uploadImage = async (file, token) => {
    if (!file) {
      return null;
    }

    const validationError = validateImage(file);
    if (validationError) {
      setError(validationError);
      return { success: false, error: validationError };
    }

    setError(null);
    setIsUploading(true);

    try {
      let fileToUpload = file;
      console.log(fileToUpload);
      if (file.size > MAX_FILE_SIZE) {
        fileToUpload = await new Promise((resolve, reject) => {
          new Compressor(file, {
            quality: 0.3,
            success: (result) => resolve(result),
            error: (err) => reject(err),
          });
        });
      }

      const formData = new FormData();
      formData.append("icon", fileToUpload);

      const response = await fetch(uploadUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.ErrorMessageJP);
      }

      const responseData = await response.json();
      return { success: true, data: responseData };
    } catch (err) {
      const errorMessage = err.message || "画像のアップロードに失敗しました";
      setError({ type: "uploadFailed", message: errorMessage });
      return { success: false, error: errorMessage };
    } finally {
      setIsUploading(false);
    }
  };

  return {
    uploadImage,
    isUploading,
    error,
    setError,
  };
};
