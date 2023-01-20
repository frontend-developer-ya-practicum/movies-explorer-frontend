import "./App.css";

import { Route, Switch } from "react-router-dom";

import Footer from "../Footer/Footer";
import Login from "../Login/Login";
import Main from "../Main/Main";
import NotFound from "../NotFound/NotFound";
import Register from "../Register/Register";

function App() {
  return (
    <div className="page">
      <Switch>
        <Route exact path="/">
          <Main />
          <Footer />
        </Route>
        <Route path="/signup">
          <Register />
        </Route>
        <Route path="/signin">
          <Login />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
