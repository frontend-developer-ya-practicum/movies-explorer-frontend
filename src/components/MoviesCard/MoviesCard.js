import "./MoviesCard.css";

import { useHistory } from "react-router-dom";
import { useState } from "react";

function FormatDuration(duration_m) {
  const hours = Math.floor(duration_m / 60);
  const minutes = duration_m % 60;
  return `${hours}ч ${minutes}м`;
}

function MoviesCard({ card }) {
  const history = useHistory();
  const isSavedLocation = history.location.pathname.includes("saved");

  const [isSaved, setIsSaved] = useState(false);

  function onClick() {
    setIsSaved(!isSaved);
  }

  const className = isSavedLocation
    ? "card__btn_type_delete"
    : isSaved
    ? "card__btn_type_saved"
    : "card_btn_type_save";

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
            className={`card__btn ${className} `}
            onClick={onClick}
          />
        </div>
        <img className="card__image" src={card.image.url} alt={card.nameRU} />
      </section>
    </li>
  );
}

export default MoviesCard;
