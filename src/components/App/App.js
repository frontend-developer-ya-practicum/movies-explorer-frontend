import "./App.css";

import { Route, Switch } from "react-router-dom";

import Footer from "../Footer/Footer";
import Main from "../Main/Main";

function App() {
  return (
    <div className="page">
      <Switch>
        <Route exact path="/">
          <Main />
          <Footer />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
