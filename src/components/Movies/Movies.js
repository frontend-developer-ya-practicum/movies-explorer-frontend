import "./Movies.css";

import { FilterMoviesByName, FilterShortFilms } from "../../utils/movieUtils";
import { useEffect, useState } from "react";

import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import mainApi from "../../utils/MainApi";
import moviesApi from "../../utils/MoviesApi";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useTooltip } from "../../hooks/useTooltip";

function Movies() {
  const [isShort, setIsShort] = useState(false);
  const [movies, setMovies] = useState([]);
  const [shortMovies, setShortMovies] = useState([]);
  const [query, setQuery] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const tooltip = useTooltip();

  const user = useCurrentUser();

  useEffect(() => {
    setIsShort(localStorage.getItem("isShortMovies") === "true");
    setQuery(localStorage.getItem("searchMovieQuery") || "");

    if (localStorage.getItem("movies")) {
      const foundMovies = JSON.parse(localStorage.getItem("movies"));
      setMovies(foundMovies);
      setShortMovies(FilterShortFilms(foundMovies));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(movies));
    setShortMovies(FilterShortFilms(movies));
  }, [movies]);
  useEffect(() => {
    localStorage.setItem("searchMovieQuery", query);
  }, [query]);
  useEffect(() => {
    localStorage.setItem("isShortMovies", isShort);
  }, [isShort]);

  function handleChangeCheckbox() {
    setIsShort(!isShort);
  }

  function handleClickSearch(searchQuery) {
    setIsLoading(true);
    moviesApi
      .getMovies()
      .then((foundMovies) => {
        setQuery(searchQuery);
        setMovies(FilterMoviesByName(foundMovies, searchQuery));
      })
      .catch((err) => {
        tooltip.open(err, false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleSaveMovie(movie) {
    mainApi
      .postMovie(movie)
      .then((savedMovie) => {
        user.setMovie(savedMovie);
      })
      .catch((err) => {
        tooltip.open(err, false);
      });
  }

  function handleDeleteMovie(movie) {
    const savedMovie = user.getMovie(movie.id);
    mainApi
      .deleteMovie(savedMovie)
      .then(() => {
        user.deleteMovie(movie.id);
      })
      .catch((err) => {
        tooltip.open(err, false);
      });
  }

  return (
    <section className="movies">
      <SearchForm
        query={query}
        onSearchMovies={handleClickSearch}
        onChangeCheckbox={handleChangeCheckbox}
        checkboxChecked={isShort}
        required={true}
      />
      <hr className="movies__line" />
      <MoviesCardList
        cards={isShort ? shortMovies : movies}
        OnMovieDelete={handleDeleteMovie}
        OnMovieSave={handleSaveMovie}
        isLoading={isLoading}
      />
      {!isLoading && (
        <button
          className="movies__btn"
          type="button"
          aria-label="Загрузить еще фильмов"
        >
          Ещё
        </button>
      )}
    </section>
  );
}

export default Movies;
