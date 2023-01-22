import "./MoviesCardList.css";

import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import React from "react";

function MoviesCardList({ cards }) {
  const isLoading = false;

  return (
    <section className="cards">
      {isLoading && <Preloader />}

      {!isLoading && (
        <ul className="cards__items">
          {cards.map((card) => (
            <MoviesCard key={card._id} card={card} />
          ))}
        </ul>
      )}
    </section>
  );
}

export default MoviesCardList;
