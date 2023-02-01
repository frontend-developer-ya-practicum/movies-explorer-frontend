import "./Login.css";

import AuthForm from "../AuthForm/AuthForm";
import AuthFormInput from "../AuthFormInput/AuthFormInput";
import { useAuth } from "../../hooks/useAuth";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();

  const { values, handleChange, errors, isValid } = useFormWithValidation();

  const { signIn } = useAuth();
  const [apiError, setApiError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(evt) {
    evt.preventDefault();
    setIsLoading(true);
    signIn({
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
      onSubmit={handleSubmit}
      apiError={apiError}
      isDisabled={!isValid || isLoading}
      title="Рады видеть!"
      submitButtonText="Войти"
      formText="Ещё не зарегистрированы?"
      formLink="/signup"
      formLinkText="Регистрация"
    >
      <AuthFormInput
        value={values.email || ""}
        onChange={handleChange}
        title="E-mail"
        type="email"
        id="email"
        name="email"
        error={errors.email}
      />
      <AuthFormInput
        value={values.password || ""}
        onChange={handleChange}
        title="Пароль"
        type="password"
        id="password"
        name="password"
        error={errors.password}
      />
    </AuthForm>
  );
}

export default Login;
