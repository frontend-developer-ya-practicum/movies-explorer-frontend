import { useContext, useEffect, useState } from "react";

import { currentUserContext } from "../contexts/currentUserContext";
import mainApi from "../utils/MainApi";
import { useAuth } from "./useAuth";
import { useTooltip } from "./useTooltip";

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
  const { isLoggedIn, signOut } = useAuth();

  const [user, setUser] = useState({});
  const [savedMovies, setSavedMovies] = useState(new Map());
  const tooltip = useTooltip();

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([mainApi.getCurrentUser(), mainApi.getMovies()])
        .then(([user, movies]) => {
          setUser(user);
          movies.forEach((movie) => {
            setMovie(movie);
          });
        })
        .catch((err) => {
          tooltip.open(err, false);
          signOut();
        });
    } else {
      setUser({});
      setSavedMovies(new Map());
    }
  }, [isLoggedIn]);

  async function updateMe(user) {
    const newUser = await mainApi.updateCurrentUser(user);
    return setUser(newUser);
  }

  function setMovie(movie) {
    setSavedMovies((map) => new Map(map.set(movie.movieId, movie)));
  }

  function getMovie(movieId) {
    return savedMovies.get(movieId);
  }

  function deleteMovie(movieId) {
    setSavedMovies((map) => {
      const copy = new Map(map);
      copy.delete(movieId);
      return copy;
    });
  }

  function hasMovie(movieId) {
    return savedMovies.has(movieId);
  }

  return {
    user,
    savedMovies,
    updateMe,
    setMovie,
    getMovie,
    deleteMovie,
    hasMovie,
  };
}
