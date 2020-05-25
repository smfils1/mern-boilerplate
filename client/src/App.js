import React from "react";
import { Switch, Route } from "react-router-dom";

import HomePage from "./components/HomePage/HomePage";
import HistoryPage from "./components/HistoryPage/HistoryPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import LoginPage from "./components/LoginPage/LoginPage";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";
import auth from "./hoc/auth";

function App() {
  const AuthHistory = auth(HistoryPage);
  const AuthHome = auth(HomePage, false);
  const AuthLogin = auth(LoginPage, false);
  const AuthRegister = auth(RegisterPage, false);
  return (
    <div>
      <NavBar />

      <Switch>
        <Route exact path="/" render={(props) => <AuthHome {...props} />} />
        <Route path="/history" render={(props) => <AuthHistory {...props} />} />
        <Route path="/login" render={(props) => <AuthLogin {...props} />} />
        <Route
          path="/register"
          render={(props) => <AuthRegister {...props} />}
        />
      </Switch>
    </div>
  );
}

export default App;
