import "./Movies.css";

import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import cards from "./DefaultCards";

function Movies() {
  return (
    <section className="movies">
      <SearchForm />
      <hr className="movies__line" />
      <MoviesCardList cards={cards} />
      <button
        className="movies__btn"
        type="button"
        aria-label="Загрузить еще фильмов"
      >
        Ещё
      </button>
    </section>
  );
}

export default Movies;
