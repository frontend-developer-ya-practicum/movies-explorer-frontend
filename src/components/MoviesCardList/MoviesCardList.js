import "./MoviesCardList.css";

import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import React from "react";
import { useCurrentUser } from "../../hooks/useCurrentUser";

function MoviesCardList({
  cards,
  OnMovieDelete,
  OnMovieSave,
  isLoading,
  search,
}) {
  const user = useCurrentUser();

  return (
    <section className="cards">
      {isLoading && <Preloader />}

      {!isLoading && cards?.length > 0 && (
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

      {!isLoading && search && cards?.length === 0 && (
        <p className="cards__error">Ничего не найдено.</p>
      )}
      <></>
    </section>
  );
}

export default MoviesCardList;
