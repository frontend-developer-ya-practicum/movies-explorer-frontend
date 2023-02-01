import "./Register.css";

import AuthForm from "../AuthForm/AuthForm";
import AuthFormInput from "../AuthFormInput/AuthFormInput";
import { useAuth } from "../../hooks/useAuth";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Register() {
  const navigate = useNavigate();

  const { values, handleChange, errors, isValid } = useFormWithValidation();

  const { signUp } = useAuth();
  const [apiError, setApiError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(evt) {
    evt.preventDefault();
    signUp({
      name: values.name,
      email: values.email,
      password: values.password,
    })
      .then(() => {
        navigate("/movies");
      })
      .catch(setApiError)
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <AuthForm
      apiError={apiError}
      onSubmit={handleSubmit}
      isDisabled={!isValid || isLoading}
      title="Добро пожаловать!"
      submitButtonText="Зарегистрироваться"
      formText="Уже зарегистрированы?"
      formLink="/signin"
      formLinkText="Войти"
    >
      <AuthFormInput
        value={values.name}
        error={errors.name}
        onChange={handleChange}
        title="Имя"
        type="text"
        id="name"
        name="name"
        pattern="^[A-Za-zА-Яа-я-\s]+$"
        minLength="2"
        maxLength="30"
      />
      <AuthFormInput
        value={values.email}
        error={errors.email}
        onChange={handleChange}
        title="E-mail"
        type="email"
        id="email"
        name="email"
      />
      <AuthFormInput
        value={values.password}
        error={errors.password}
        onChange={handleChange}
        title="Пароль"
        type="password"
        id="password"
        name="password"
      />
    </AuthForm>
  );
}

export default Register;
