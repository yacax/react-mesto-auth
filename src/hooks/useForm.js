import { useEffect, useState } from "react";

const useForm = (initialState) => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const hasErrors = (errors) => {
    for (let key in errors) {
      if (errors[key] !== "") {
        return true;
      }
    }
    return false;
  };

  const resetForm = () => {
    setForm(initialState)
  }

  const hardChangeIsFormValid = (boolean) => {
    setIsFormValid(boolean);
  }

  useEffect(() => {
    setIsFormValid(!hasErrors(errors))
  }, [errors])

  const handleChange = (evt) => {
    const input = evt.target;

    setForm({
      ...form,
      [input.name]: input.value,
    });

    setErrors((prevErrors) => {
      const newErrors = {
        ...prevErrors,
        [input.name]: input.validationMessage,
      };

      if (input.name === "confirmPassword") {
        const currentPassword = input.name === "password" ? input.value : form.password;
        const currentConfirmPassword = input.name === "confirmPassword" ? input.value : form.confirmPassword;

        if (currentPassword !== currentConfirmPassword) {
          newErrors.password = input.validationMessage;
          newErrors.confirmPassword = "Пароли не совпадают";
        } else {
          newErrors.password = "";
          newErrors.confirmPassword = "";
        }
      }

      setIsFormValid(!hasErrors(newErrors));

      return newErrors;
    });
  };

  return { form, errors, isFormValid, handleChange, resetForm, hardChangeIsFormValid };
};

export default useForm;


