import "./MoviesCardList.css";

import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import React from "react";
import { useCurrentUser } from "../../hooks/useCurrentUser";

function MoviesCardList({ cards, OnMovieDelete, OnMovieSave, isLoading }) {
  const user = useCurrentUser();

  return (
    <section className="cards">
      {isLoading && <Preloader />}

      {!isLoading && cards && (
        <ul className="cards__items">
          {cards.map((card) => (
            <MoviesCard
              key={card.id || card._id}
              card={card}
              isSaved={user.hasMovie(card.movieId || card.id)}
              OnMovieDelete={OnMovieDelete}
              OnMovieSave={OnMovieSave}
            />
          ))}
        </ul>
      )}
    </section>
  );
}

export default MoviesCardList;
