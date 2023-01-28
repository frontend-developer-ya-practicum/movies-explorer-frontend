import { useContext, useEffect, useState } from "react";

import { authContext } from "../contexts/authContext";
import mainApi from "../utils/MainApi";

export function AuthProvider({ children }) {
  const value = useAuthProvide();

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useAuthProvide() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem("token") !== null
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  async function signUp({ name, email, password }) {
    await mainApi.register({ name, email, password });
    return await signIn({ email, password });
  }

  async function signIn({ email, password }) {
    const { token } = await mainApi.login({ email, password });
    if (token) {
      setIsLoggedIn(true);
      localStorage.setItem("token", token);
    }
  }

  function signOut() {
    return new Promise(() => {
      setIsLoggedIn(false);
      localStorage.clear();
    });
  }

  return {
    isLoggedIn,
    signUp,
    signIn,
    signOut,
  };
}
