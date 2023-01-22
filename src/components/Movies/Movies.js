import "./Movies.css";

import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import cards from "./DefaultCards";

function Movies() {
  return (
    <>
      <Header />
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
      <Footer />
    </>
  );
}

export default Movies;
