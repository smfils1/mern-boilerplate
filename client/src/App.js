import React from "react";
import { Switch, Route } from "react-router-dom";

import HomePage from "./components/HomePage/HomePage";
import HistoryPage from "./components/HistoryPage/HistoryPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import LoginPage from "./components/LoginPage/LoginPage";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div>
      <NavBar />

      <Switch>
        <Route exact path="/" render={(props) => <HomePage {...props} />} />
        <Route path="/login" render={(props) => <LoginPage {...props} />} />
        <Route
          path="/register"
          render={(props) => <RegisterPage {...props} />}
        />
        <Route path="/history" render={(props) => <HistoryPage {...props} />} />
      </Switch>
    </div>
  );
}

export default App;
