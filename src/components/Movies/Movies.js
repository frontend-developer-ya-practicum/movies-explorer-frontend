import "./Movies.css";

import { FilterMoviesByName, FilterShortFilms } from "../../utils/movieUtils";
import { useEffect, useState } from "react";

import { GRID_CONFIG } from "../../utils/constants";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import mainApi from "../../utils/MainApi";
import moviesApi from "../../utils/MoviesApi";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useTooltip } from "../../hooks/useTooltip";
import useWindowSize from "../../hooks/useWindowSize";

function Movies() {
  const [isShort, setIsShort] = useState(false);
  const [movies, setMovies] = useState([]);
  const [shortMovies, setShortMovies] = useState([]);
  const [query, setQuery] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState(false);
  const [moviesLimit, setMoviesLimit] = useState(0);
  const [isMoreButtonActive, setIsMoreButtonActive] = useState(false);

  const tooltip = useTooltip();
  const user = useCurrentUser();
  const windowSize = useWindowSize();

  useEffect(() => {
    const width = windowSize.width;
    if (width <= GRID_CONFIG.MOBILE.MAX_WIDTH) {
      setMoviesLimit(GRID_CONFIG.MOBILE.CARDS);
    } else if (width <= GRID_CONFIG.TABLET.MAX_WIDTH) {
      setMoviesLimit(GRID_CONFIG.TABLET.CARDS);
    } else {
      setMoviesLimit(GRID_CONFIG.DESKTOP.CARDS);
    }
  }, [windowSize]);

  useEffect(() => {
    const list = isShort ? shortMovies : movies;
    setIsMoreButtonActive(list.length > moviesLimit);
  }, [moviesLimit, isShort, movies, shortMovies]);

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
    if (query) {
      setSearch(true);
    }
  }, [query]);
  useEffect(() => {
    localStorage.setItem("isShortMovies", isShort);
  }, [isShort]);

  function handleClickMoreButton() {
    const width = windowSize.width;
    if (width <= GRID_CONFIG.MOBILE.MAX_WIDTH) {
      setMoviesLimit(moviesLimit + GRID_CONFIG.MOBILE.ADDITIONAL_CARDS);
    } else if (width <= GRID_CONFIG.TABLET.MAX_WIDTH) {
      setMoviesLimit(moviesLimit + GRID_CONFIG.TABLET.ADDITIONAL_CARDS);
    } else {
      setMoviesLimit(moviesLimit + GRID_CONFIG.DESKTOP.ADDITIONAL_CARDS);
    }
  }

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
        isLoading={isLoading}
      />
      <hr className="movies__line" />
      <MoviesCardList
        cards={isShort ? shortMovies : movies}
        OnMovieDelete={handleDeleteMovie}
        OnMovieSave={handleSaveMovie}
        isLoading={isLoading}
        search={search}
        moviesLimit={moviesLimit}
      />
      {!isLoading && isMoreButtonActive && (
        <button
          className="movies__btn"
          type="button"
          aria-label="Загрузить еще фильмов"
          onClick={handleClickMoreButton}
        >
          Ещё
        </button>
      )}
    </section>
  );
}

export default Movies;
