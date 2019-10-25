import React from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";

import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import PricingPage from "./pages/PricingPage";
import AdvancedSignUpPage from "./pages/AdvancedSignUpPage";
import SignUpPage from "./pages/SignUpPage";
import SignUpConfirmPage from "./pages/SignUpConfirmPage";
import SignInPage from "./pages/SignInPage";
import HomePage from "./pages/HomePage";
import FeaturesPage from "./pages/FeaturesPage";

import CustomerApp from "./CustomerApp";
import ErrorPage from "./pages/ErrorPage";
import SupportPage from "./pages/SupportPage";

const App: React.FC = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.analytics.page(pathname);
  }, [pathname]);

  return (
    <>
      <CssBaseline />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/features" exact component={FeaturesPage} />
        <Route path="/pricing" exact component={PricingPage} />
        <Route path="/login" exact component={SignInPage} />
        <Route path="/forgot-password" exact component={ForgotPasswordPage} />
        <Route path="/sign-up/confirm" exact component={SignUpConfirmPage} />
        <Route path="/sign-up" exact component={SignUpPage} />
        <Route path="/sign-up-plus" exact component={AdvancedSignUpPage} />
        <Route path="/support" exact component={SupportPage} />
        <Redirect from="/sign-in" exact to="/login" />
        <Redirect from="/signup" exact to="/sign-up" />
        <Route path="/app" component={CustomerApp} />
        <Route component={ErrorPage} />
      </Switch>
    </>
  );
};

export default App;
