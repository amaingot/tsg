import React from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import PricingPage from "./pages/PricingPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import HomePage from "./pages/HomePage";
import FeaturesPage from "./pages/FeaturesPage";

import CustomerApp from "./CustomerApp";
import ErrorPage from "./pages/ErrorPage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/features" component={FeaturesPage} />
        <Route path="/pricing" component={PricingPage} />
        <Route path="/login" component={SignInPage} />
        <Route path="/forgot-password" component={ForgotPasswordPage} />
        <Route path="/sign-up" component={SignUpPage} />
        <Redirect from="/sign-in" to="/login" />
        <Route path="/app" component={CustomerApp} />
        <Route component={ErrorPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
