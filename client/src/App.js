import React from "react";
import { Switch, Route } from "react-router-dom";

import HomePage from "./components/HomePage/HomePage";
import HistoryPage from "./components/HistoryPage/HistoryPage";
import SignUpPage from "./components/SignUpPage/SignUpPage";
import LoginPage from "./components/LoginPage/LoginPage";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" render={() => <HomePage />} />
        <Route path="/login" render={() => <LoginPage />} />
        <Route path="/signup" render={() => <SignUpPage />} />
        <Route path="/history" render={() => <HistoryPage />} />
      </Switch>
    </div>
  );
}

export default App;
