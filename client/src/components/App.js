import React, { Fragment } from "react";
import "../stylesheets/App.css";
import Header from "./Header.js";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Chat from "./pages/Chat";

const Root = () => (
  <BrowserRouter>
    <Fragment>
      <Header />
      <Switch>
        <Route path="/signin" render={() => <SignIn />} />
        <Route path="/signup" render={() => <SignUp />} />
        <Route path="/chat" render={() => <Chat />} />
      </Switch>
    </Fragment>
  </BrowserRouter>
);

function App() {
  return <Root />;
}

export default App;
