import "./App.css";

import { Route, Switch } from "react-router-dom";

import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import NotFound from "../NotFound/NotFound";

function App() {
  return (
    <div className="page">
      <Switch>
        <Route exact path="/">
          <Main />
          <Footer />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
