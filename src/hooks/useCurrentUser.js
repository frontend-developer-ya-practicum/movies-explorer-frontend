import { useContext, useEffect, useState } from "react";

import { currentUserContext } from "../contexts/currentUserContext";
import mainApi from "../utils/MainApi";
import moviesApi from "../utils/MoviesApi";
import { useAuth } from "./useAuth";

export function CurrentUserProvider({ children }) {
  const value = useCurrentUserProvide();

  return (
    <currentUserContext.Provider value={value}>
      {children}
    </currentUserContext.Provider>
  );
}

export const useCurrentUser = () => {
  return useContext(currentUserContext);
};

function useCurrentUserProvide() {
  const { isLoggedIn } = useAuth();

  const [user, setUser] = useState({});
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([mainApi.getCurrentUser(), mainApi.getMovies()])
        .then(([user, movies]) => {
          setUser(user);
          setMovies(movies);
        })
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn]);

  async function updateMe(user) {
    const newUser = await mainApi.updateCurrentUser(user);
    return setUser(newUser);
  }

  function getMovies() {
    return moviesApi.getMovies().then((movies) => {
      setMovies(movies);
    });
  }

  async function saveMovie(movie) {
    const savedMovie = await mainApi.postMovie(movie);
    setSavedMovies([...savedMovies, savedMovie]);
  }

  function deleteMovie(movie) {
    const savedMovie = savedMovies.find(
      (m) => m.movieId === movie.id || m.movieId === movie.movieId
    );

    return mainApi.deleteMovie(savedMovie).then(() => {
      setSavedMovies((state) => {
        state.filter((m) => m.movieId !== saveMovie.movieId);
      });
    });
  }

  return {
    user,
    movies,
    savedMovies,
    updateMe,
    getMovies,
    saveMovie,
    deleteMovie,
  };
}
