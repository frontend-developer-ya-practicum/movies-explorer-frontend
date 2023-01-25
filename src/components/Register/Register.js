import "./Register.css";

import AuthForm from "../AuthForm/AuthForm";
import AuthFormInput from "../AuthFormInput/AuthFormInput";
import { useState } from "react";

function Register({ onRegister, apiError }) {
  const [credentials, setCredentials] = useState({
    name: "",
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
    onRegister(credentials);
  }

  return (
    <AuthForm
      apiError={apiError}
      onSubmit={handleSubmit}
      title="Добро пожаловать!"
      submitButtonText="Зарегистрироваться"
      formText="Уже зарегистрированы?"
      formLink="/signin"
      formLinkText="Войти"
    >
      <AuthFormInput
        value={credentials.name}
        onChange={handleChange}
        title="Имя"
        type="text"
        id="name"
        name="name"
      />
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

export default Register;
