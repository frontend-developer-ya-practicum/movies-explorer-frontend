import "./App.css";

import { Route, Switch, useLocation } from "react-router-dom";

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
import { useState } from "react";

function App() {
  const location = useLocation();
  const isProfilePage = location.pathname.includes("/profile");
  const isAuthPage = location.pathname.includes("/sign");

  const [isNavigationOpened, setIsNavigationOpened] = useState(false);

  function handleNavigationOpen() {
    setIsNavigationOpened(true);
  }
  function handleNavigationClose() {
    setIsNavigationOpened(false);
  }

  return (
    <>
      {!isAuthPage && <Header onClickNavigation={handleNavigationOpen} />}

      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/profile" component={Profile} />
        <Route path="/signup" component={Register} />
        <Route path="/signin" component={Login} />
        <Route path="/movies" component={Movies} />
        <Route path="/saved-movies" component={SavedMovies} />
        <Route path="*" component={NotFound} />
      </Switch>

      {!isProfilePage && !isAuthPage && <Footer />}

      <Navigation isOpen={isNavigationOpened} onClose={handleNavigationClose} />
    </>
  );
}

export default App;
