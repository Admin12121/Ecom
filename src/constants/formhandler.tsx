import { useState } from "react";

const DynamicForm = <T extends object>(initialState: T) => {
  const [formData, setFormData] = useState<T>(initialState);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (value: string, field: keyof T) => {
    console.log(value)
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }));

    if (typeof value === "string" && value.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: "This field cannot be empty",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: "",
      }));
    }
  };

  return { formData, setFormData, errors, handleInputChange };
};

export default DynamicForm;
