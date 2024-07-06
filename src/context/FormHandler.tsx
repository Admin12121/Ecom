import {useState} from "react"

const DynamicForm = <T extends Object>(initialState: T) => {
    const [formData, setFormData] = useState<T>(initialState);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof T) => {
      const { value } = e.target;
      setFormData(prevState => ({
        ...prevState,
        [field]: value
      }));
  
      if (value.trim() === "") {
        setErrors(prevErrors => ({
          ...prevErrors,
          [field]: "This field cannot be empty"
        }));
      } else {
        setErrors(prevErrors => ({
          ...prevErrors,
          [field]: ""
        }));
      }
    };
  
    return { formData, setFormData, errors, handleInputChange };
  };

export default DynamicForm