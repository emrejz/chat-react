import React, { Fragment } from "react";
import "../stylesheets/App.css";
import Header from "./Header.js";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignIn from "./pages/SignIn";

const Root = () => (
  <BrowserRouter>
    <Fragment>
      <Header />
      <Switch>
        <Route path="/signin" render={() => <SignIn />} />
      </Switch>
    </Fragment>
  </BrowserRouter>
);

function App() {
  return <Root />;
}

export default App;
