import "./Login.css";

import AuthForm from "../AuthForm/AuthForm";
import AuthFormInput from "../AuthFormInput/AuthFormInput";

function Login() {
  return (
    <AuthForm
      title="Рады видеть!"
      submitButtonText="Войти"
      formText="Ещё не зарегистрированы?"
      formLink="/signup"
      formLinkText="Регистрация"
    >
      <AuthFormInput title="E-mail" type="email" />
      <AuthFormInput title="Пароль" type="password" />
    </AuthForm>
  );
}

export default Login;
