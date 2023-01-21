import "./Movies.css";

import Footer from "../Footer/Footer";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import cards from "./DefaultCards";

function Movies() {
  return (
    <section className="movies">
      <SearchForm />
      <hr className="movies__line" />
      <MoviesCardList cards={cards} />
      <button className="movies__btn">Ещё</button>
      <Footer />
    </section>
  );
}

export default Movies;
