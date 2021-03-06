import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import HomePage from "./components/HomePage";
import HistoryPage from "./components/HistoryPage";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import ResetPage from "./components/ResetPage";
import ForgotPage from "./components/ForgotPasswordPage";
import NavBar from "./components/NavBar";
import auth from "./hoc/auth";

function App() {
  const AuthHistory = auth(HistoryPage);
  const Home = auth(HomePage, false);
  const Login = auth(LoginPage, false);
  const Register = auth(RegisterPage, false);
  const Reset = auth(ResetPage, false);
  const Forgot = auth(ForgotPage, false);
  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/" render={(props) => <Home {...props} />} />
        <Route
          exact
          path="/history"
          render={(props) => <AuthHistory {...props} />}
        />
        <Route exact path="/login" render={(props) => <Login {...props} />} />
        <Route
          exact
          path="/reset/:id"
          render={(props) => <Reset {...props} />}
        />
        <Route
          exact
          path="/register"
          render={(props) => <Register {...props} />}
        />
        <Route exact path="/forgot" render={(props) => <Forgot {...props} />} />
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </div>
  );
}

export default App;
