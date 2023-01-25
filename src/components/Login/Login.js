import "./Login.css";

import AuthForm from "../AuthForm/AuthForm";
import AuthFormInput from "../AuthFormInput/AuthFormInput";
import { useState } from "react";

function Login({ onLogin, apiError }) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  function handleChange(evt) {
    const { name, value } = evt.target;

    setCredentials({
      ...credentials,
      [name]: value,
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin(credentials);
  }

  return (
    <AuthForm
      apiError={apiError}
      onSubmit={handleSubmit}
      title="Рады видеть!"
      submitButtonText="Войти"
      formText="Ещё не зарегистрированы?"
      formLink="/signup"
      formLinkText="Регистрация"
    >
      <AuthFormInput
        value={credentials.email}
        onChange={handleChange}
        title="E-mail"
        type="email"
        id="email"
        name="email"
      />
      <AuthFormInput
        value={credentials.password}
        onChange={handleChange}
        title="Пароль"
        type="password"
        id="password"
        name="password"
      />
    </AuthForm>
  );
}

export default Login;
