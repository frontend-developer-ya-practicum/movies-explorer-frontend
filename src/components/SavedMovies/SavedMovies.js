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

  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState(false);

  const tooltip = useTooltip();

  const user = useCurrentUser();

  useEffect(() => {
    const foundMovies = Array.from(user.savedMovies.values());
    setMovies(foundMovies);
  }, [user.savedMovies]);

  useEffect(() => {
    setShortMovies(FilterShortFilms(movies));
  }, [movies]);

  function handleChangeCheckbox() {
    setIsShort(!isShort);
    setSearch(true);
  }

  function handleClickSearch(searchQuery) {
    setIsLoading(true);

    const foundMovies = Array.from(user.savedMovies.values());
    setMovies(FilterMoviesByName(foundMovies, searchQuery));

    setSearch(true);
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
        onSearchMovies={handleClickSearch}
        onChangeCheckbox={handleChangeCheckbox}
        checkboxChecked={isShort}
      />
      <hr className="movies__line" />
      <MoviesCardList
        cards={isShort ? shortMovies : movies}
        OnMovieDelete={handleDeleteMovie}
        OnMovieSave={handleSaveMovie}
        isLoading={isLoading}
        search={search}
      />
    </section>
  );
}

export default SavedMovies;
