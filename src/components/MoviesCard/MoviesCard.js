import "./MoviesCard.css";

import { useLocation } from "react-router-dom";

function FormatDuration(duration_m) {
  const hours = Math.floor(duration_m / 60);
  const minutes = duration_m % 60;
  return `${hours}ч ${minutes}м`;
}

function MoviesCard({ card, isSaved, OnMovieDelete, OnMovieSave }) {
  const location = useLocation();
  const isSavedMoviesPage = location.pathname.includes("/saved");

  function onClick() {
    if (isSaved) {
      OnMovieDelete(card);
    } else {
      OnMovieSave(card);
    }
  }

  const className = isSavedMoviesPage
    ? "card__btn_type_delete"
    : isSaved
    ? "card__btn_type_saved"
    : "card__btn_type_save";

  return (
    <li className="cards__item">
      <section className="card">
        <div className="card__content">
          <div className="card__info">
            <h2 className="card__name">{card.nameRU}</h2>
            <p className="card__duration">{FormatDuration(card.duration)}</p>
          </div>
          <button
            type="button"
            aria-label="Сохранить/удалить из избранного"
            className={`card__btn ${className} `}
            onClick={onClick}
          />
        </div>

        <a
          className="card__trailer-link"
          href={card.trailerLink}
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="card__image"
            src={card.image.url || card.image}
            alt={card.nameRU}
          />
        </a>
      </section>
    </li>
  );
}

export default MoviesCard;
