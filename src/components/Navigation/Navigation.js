import "./Navigation.css";

import { useCallback, useEffect } from "react";

import { Link } from "react-router-dom";

function Navigation({ isOpen, onClose }) {
  const handleEscClose = useCallback(
    (e) => {
      if (e.code === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [handleEscClose]);

  function handleClickOnOutside(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div
      onClick={handleClickOnOutside}
      className={`popup ${isOpen && "popup_opened"}`}
    >
      <div className="popup__container">
        <button
          onClick={onClose}
          className="popup__btn-close"
          type="button"
          aria-label="Закрыть окно"
        />

        <nav className="popup__nav">
          <Link to="/" onClick={onClose} className="popup__link">
            Главная
          </Link>
          <Link to="/movies" onClick={onClose} className="popup__link">
            Фильмы
          </Link>
          <Link to="/saved-movies" onClick={onClose} className="popup__link">
            Сохранённые фильмы
          </Link>
        </nav>
        <Link
          to="/profile"
          onClick={onClose}
          className="popup__link popup__link_type_profile"
        >
          Аккаунт
        </Link>
      </div>
    </div>
  );
}

export default Navigation;
