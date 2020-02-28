import React, { useState } from "react";

type FormData = {
  [field: string]: string,
}
export const useForm = (initialValue = {}) => {
  const [formData, setFormData] = useState<FormData>(initialValue);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return {
    formData,
    handleInputChange,
  };
}