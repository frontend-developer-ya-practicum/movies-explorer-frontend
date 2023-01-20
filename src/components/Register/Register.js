import "./Register.css";

import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";

function Register() {
  return (
    <div className="register">
      <Logo />

      <form className="form">
        <div className="form__input-container">
          <h2 className="form__title">Добро пожаловать!</h2>
          <fieldset className="form__fields">
            <label className="form__field" htmlFor="username">
              <span className="form__field-name">Имя</span>
              <input
                className="form__input"
                name="username"
                id="username"
                type="username"
                required
              />
              <span className="form__input-error">Что-то пошло не так...</span>
            </label>

            <label className="form__field" htmlFor="email">
              <span className="form__field-name">E-mail</span>
              <input
                className="form__input"
                name="email"
                id="email"
                type="email"
                required
              />
              <span className="form__input-error">Что-то пошло не так...</span>
            </label>

            <label className="form__field" htmlFor="password">
              <span className="form__field-name">Пароль</span>
              <input
                className="form__input"
                name="password"
                id="password"
                type="password"
                required
              />
              <span className="form__input-error">Что-то пошло не так...</span>
            </label>
          </fieldset>
        </div>

        <div className="form__submit-container">
          <span className="form__submit-error">
            При регистрации пользователя произошла ошибка
          </span>
          <button type="submit" className="form__submit-button">
            Войти
          </button>

          <p className="form__text">
            Зарегистрироваться
            <Link to="/signin" className="form__link">
              Войти
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;
