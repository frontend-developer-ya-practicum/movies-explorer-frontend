import "./NotFound.css";

import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <section className="not-found">
      <h2 className="not-found__title">404</h2>
      <p className="not-found__subtitle">Страница не найдена</p>
      <button
        className="not_found__button"
        onClick={() => navigate(-1)}
        type="button"
        aria-label="Вернуться назад"
      >
        Назад
      </button>
    </section>
  );
}

export default NotFound;
