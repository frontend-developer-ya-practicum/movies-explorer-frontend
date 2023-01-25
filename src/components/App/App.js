import "./App.css";

import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Login from "../Login/Login";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import Navigation from "../Navigation/Navigation";
import NotFound from "../NotFound/NotFound";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import SavedMovies from "../SavedMovies/SavedMovies";
import mainApi from "../../utils/MainApi";
import { useState } from "react";

function App() {
  const location = useLocation();
  const navigation = useNavigate();
  const isProfilePage = location.pathname.includes("/profile");
  const isAuthPage = location.pathname.includes("/sign");
  const isUnknownPage = location.pathname === "/not-found";

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isNavigationOpened, setIsNavigationOpened] = useState(false);

  const [apiError, setApiError] = useState("");

  function handleNavigationOpen() {
    setIsNavigationOpened(true);
  }
  function handleNavigationClose() {
    setIsNavigationOpened(false);
  }

  function handleSignUp({ name, email, password }) {
    mainApi
      .register({ name, email, password })
      .then(() => {
        handleSignIn({ email, password });
      })
      .catch(setApiError);
  }

  function handleSignIn({ email, password }) {
    mainApi
      .login({ email, password })
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          setIsLoggedIn(true);
          navigation("/movies");
        }
      })
      .catch(setApiError);
  }

  return (
    <>
      {!isUnknownPage && !isAuthPage && (
        <Header
          onClickNavigation={handleNavigationOpen}
          isLoggedIn={isLoggedIn}
        />
      )}

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/signup"
          element={<Register onRegister={handleSignUp} apiError={apiError} />}
        />
        <Route path="/signin" element={<Login />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>

      {!isUnknownPage && !isProfilePage && !isAuthPage && <Footer />}

      <Navigation isOpen={isNavigationOpened} onClose={handleNavigationClose} />
    </>
  );
}

export default App;
