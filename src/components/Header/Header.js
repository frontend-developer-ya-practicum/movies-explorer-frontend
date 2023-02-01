import "./Header.css";

import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";

function Header() {
  const { isLoggedIn } = useAuth();

  const [isNavigationOpened, setIsNavigationOpened] = useState(false);

  function handleNavigationOpen() {
    setIsNavigationOpened(true);
  }

  function handleNavigationClose() {
    setIsNavigationOpened(false);
  }

  return (
    <>
      <header className="header">
        <div className="header__container">
          <Logo />

          {isLoggedIn && (
            <nav className="header__nav header__nav_type_movies">
              <Link to="/movies" className="header__btn">
                Фильмы
              </Link>
              <Link to="/saved-movies" className="header__btn">
                Сохранённые фильмы
              </Link>
            </nav>
          )}
        </div>

        {!isLoggedIn && (
          <nav className="header__nav header__nav_type_auth">
            <Link to="/signup" className="header__btn">
              Регистрация
            </Link>
            <Link to="/signin" className="header__btn header__btn_type_login">
              Войти
            </Link>
          </nav>
        )}

        {isLoggedIn && (
          <>
            <Link
              to="/profile"
              className="header__btn header__btn_type_profile"
            >
              Аккаунт
            </Link>

            <button
              onClick={handleNavigationOpen}
              className="header__btn header__btn_type_menu"
              type="button"
              aria-label="Открыть меню навигации"
            />
          </>
        )}
      </header>

      <Navigation isOpen={isNavigationOpened} onClose={handleNavigationClose} />
    </>
  );
}

export default Header;
