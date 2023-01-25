import "./Register.css";

import AuthForm from "../AuthForm/AuthForm";
import AuthFormInput from "../AuthFormInput/AuthFormInput";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

function Register({ onRegister, apiError }) {
  const { values, handleChange, errors, isValid } = useFormWithValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister({
      name: values.name,
      email: values.email,
      password: values.password,
    });
  }

  return (
    <AuthForm
      apiError={apiError}
      onSubmit={handleSubmit}
      isDisabled={!isValid}
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
