import "./Login.css";

import AuthForm from "../AuthForm/AuthForm";
import AuthFormInput from "../AuthFormInput/AuthFormInput";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

function Login({ onLogin, apiError }) {
  const { values, handleChange, errors, isValid } = useFormWithValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin({
      email: values.email,
      password: values.password,
    });
  }

  return (
    <AuthForm
      apiError={apiError}
      onSubmit={handleSubmit}
      isDisabled={!isValid}
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
