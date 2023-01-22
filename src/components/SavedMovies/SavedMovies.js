import "../Movies/Movies.css";

import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import cards from "./DefaultCards";

function SavedMovies() {
  return (
    <section className="movies">
      <SearchForm />
      <hr className="movies__line" />
      <MoviesCardList cards={cards} />
    </section>
  );
}

export default SavedMovies;
