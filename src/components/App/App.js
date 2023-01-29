import "./App.css";

import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import { AuthProvider } from "../../hooks/useAuth";
import { CurrentUserProvider } from "../../hooks/useCurrentUser";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import Login from "../Login/Login";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import NotFound from "../NotFound/NotFound";
import Profile from "../Profile/Profile";
import ProtectedRoutes from "../ProtectedRoutes/ProtectedRoutes";
import Register from "../Register/Register";
import SavedMovies from "../SavedMovies/SavedMovies";
import { TooltipProvider } from "../../hooks/useTooltip";

function App() {
  const location = useLocation();

  const isProfilePage = location.pathname.includes("/profile");
  const isAuthPage = location.pathname.includes("/sign");
  const isUnknownPage = location.pathname === "/not-found";

  return (
    <TooltipProvider>
      <AuthProvider>
        <CurrentUserProvider>
          {!isUnknownPage && !isAuthPage && <Header />}

          <Routes>
            <Route path="/" element={<Main />} />

            <Route path="/signup" element={<Register />} />
            <Route path="/signin" element={<Login />} />

            <Route element={<ProtectedRoutes path="/signin" />}>
              <Route path="/profile" element={<Profile />} />

              <Route path="/movies" element={<Movies />} />
              <Route path="/saved-movies" element={<SavedMovies />} />
            </Route>

            <Route path="/not-found" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/not-found" replace />} />
          </Routes>

          {!isUnknownPage && !isProfilePage && !isAuthPage && <Footer />}

          <InfoTooltip />
        </CurrentUserProvider>
      </AuthProvider>
    </TooltipProvider>
  );
}

export default App;
