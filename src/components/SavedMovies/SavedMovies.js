import "../Movies/Movies.css";

import Footer from "../Footer/Footer";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import cards from "./DefaultCards";

function SavedMovies() {
  return (
    <section className="movies">
      <SearchForm />
      <hr className="movies__line" />
      <MoviesCardList cards={cards} />
      <Footer />
    </section>
  );
}

export default SavedMovies;
