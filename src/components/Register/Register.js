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
      <AuthFormInput title="Имя" type="username" />
      <AuthFormInput title="E-mail" type="email" />
      <AuthFormInput title="Пароль" type="password" />
    </AuthForm>
  );
}

export default Register;
