import "./App.css";

import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import Login from "../Login/Login";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import Navigation from "../Navigation/Navigation";
import NotFound from "../NotFound/NotFound";
import Profile from "../Profile/Profile";
import ProtectedRoutes from "../ProtectedRoutes/ProtectedRoutes";
import Register from "../Register/Register";
import SavedMovies from "../SavedMovies/SavedMovies";
import mainApi from "../../utils/MainApi";

function App() {
  const location = useLocation();
  const navigation = useNavigate();
  const isProfilePage = location.pathname.includes("/profile");
  const isAuthPage = location.pathname.includes("/sign");
  const isUnknownPage = location.pathname === "/not-found";

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const [isNavigationOpened, setIsNavigationOpened] = useState(false);

  const [apiError, setApiError] = useState("");

  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      mainApi
        .getCurrentUser()
        .then((user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      mainApi
        .getCurrentUser()
        .then((user) => {
          setCurrentUser(user);
        })
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn]);

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
        setApiError("");
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
        setApiError("");
      })
      .catch(setApiError);
  }

  function handleUpdateUser({ name, email }) {
    mainApi
      .updateCurrentUser({ name, email })
      .then((user) => {
        setCurrentUser(user);
        setApiError("");
      })
      .catch(setApiError)
      .finally(() => {
        setIsInfoTooltipPopupOpen(true);
      });
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setCurrentUser({});
    navigation("/");
  }

  function closeInfoTooltip() {
    setIsInfoTooltipPopupOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {!isUnknownPage && !isAuthPage && (
        <Header
          onClickNavigation={handleNavigationOpen}
          isLoggedIn={isLoggedIn}
        />
      )}

      <Routes>
        <Route path="/" element={<Main />} />

        <Route
          path="/signup"
          element={<Register onRegister={handleSignUp} apiError={apiError} />}
        />
        <Route
          path="/signin"
          element={<Login onLogin={handleSignIn} apiError={apiError} />}
        />

        <Route element={<ProtectedRoutes isLoggedIn={isLoggedIn} />}>
          <Route
            path="/profile"
            element={
              <Profile
                onLogout={handleLogout}
                onUpdateUser={handleUpdateUser}
              />
            }
          />

          <Route path="/movies" element={<Movies />} />
          <Route path="/saved-movies" element={<SavedMovies />} />
        </Route>

        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>

      {!isUnknownPage && !isProfilePage && !isAuthPage && <Footer />}

      <Navigation isOpen={isNavigationOpened} onClose={handleNavigationClose} />

      <InfoTooltip
        isOpen={isInfoTooltipPopupOpen}
        apiError={apiError}
        onClose={closeInfoTooltip}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
