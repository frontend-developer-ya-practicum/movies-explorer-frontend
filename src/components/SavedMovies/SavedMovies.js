import "../Movies/Movies.css";

import { FilterMoviesByName, FilterShortFilms } from "../../utils/movieUtils";
import { useEffect, useState } from "react";

import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import mainApi from "../../utils/MainApi";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useTooltip } from "../../hooks/useTooltip";

function SavedMovies() {
  const [isShort, setIsShort] = useState(false);
  const [movies, setMovies] = useState([]);
  const [shortMovies, setShortMovies] = useState([]);
  const [query, setQuery] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const tooltip = useTooltip();

  const user = useCurrentUser();

  useEffect(() => {
    setIsShort(localStorage.getItem("isShortSavedMovies") === "true");
    setQuery(localStorage.getItem("searchSavedMovieQuery") || "");

    const foundMovies = Array.from(user.savedMovies.values());

    setMovies(foundMovies);
    setShortMovies(FilterShortFilms(foundMovies));
  }, [user.savedMovies]);

  useEffect(() => {
    setShortMovies(FilterShortFilms(movies));
  }, [movies]);

  useEffect(() => {
    localStorage.setItem("searchSavedMovieQuery", query);
  }, [query]);

  useEffect(() => {
    localStorage.setItem("isShortSavedMovies", isShort);
  }, [isShort]);

  function handleChangeCheckbox() {
    setIsShort(!isShort);
  }

  function handleClickSearch(searchQuery) {
    setIsLoading(true);
    const foundMovies = Array.from(user.savedMovies.values());
    setQuery(searchQuery);
    setMovies(FilterMoviesByName(foundMovies, searchQuery));
    setIsLoading(false);
  }

  function handleSaveMovie(movie) {}

  function handleDeleteMovie(movie) {
    mainApi
      .deleteMovie(movie)
      .then(() => {
        user.deleteMovie(movie.movieId);
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
        required={false}
      />
      <hr className="movies__line" />
      <MoviesCardList
        cards={isShort ? shortMovies : movies}
        OnMovieDelete={handleDeleteMovie}
        OnMovieSave={handleSaveMovie}
        isLoading={isLoading}
      />
    </section>
  );
}

export default SavedMovies;
