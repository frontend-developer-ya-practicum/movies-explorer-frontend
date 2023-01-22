import "./Register.css";

import AuthForm from "../AuthForm/AuthForm";
import AuthFormInput from "../AuthFormInput/AuthFormInput";

function Register() {
  return (
    <AuthForm
      title="Добро пожаловать!"
      submitButtonText="Зарегистрироваться"
      formText="Уже зарегистрированы?"
      formLink="/signin"
      formLinkText="Войти"
    >
      <AuthFormInput title="Имя" type="text" id="username" name="username" />
      <AuthFormInput title="E-mail" type="email" id="email" name="email" />
      <AuthFormInput
        title="Пароль"
        type="password"
        id="password"
        name="password"
      />
    </AuthForm>
  );
}

export default Register;
