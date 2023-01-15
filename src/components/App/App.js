import "./App.css";

import { Route, Switch } from "react-router-dom";

import Main from "../Main/Main";

function App() {
  return (
    <div className="page">
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
