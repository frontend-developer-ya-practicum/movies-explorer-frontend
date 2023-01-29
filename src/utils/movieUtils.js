const SHORT_FILM_DURATION = 40;

function NormalizeString(name) {
  return String(name).toLowerCase().trim();
}

function FilterMoviesByName(movies, searchQuery) {
  return movies.filter((movie) => {
    const movieName = NormalizeString(movie.nameRU);
    const query = NormalizeString(searchQuery);
    return movieName.includes(query);
  });
}

function FilterMoviesByDuration(movies, duration_m) {
  return movies.filter((movie) => {
    return movie.duration <= duration_m;
  });
}

function FilterShortFilms(movies) {
  return FilterMoviesByDuration(movies, SHORT_FILM_DURATION);
}

export {
  FilterMoviesByName,
  FilterMoviesByDuration,
  FilterShortFilms,
  SHORT_FILM_DURATION,
};
