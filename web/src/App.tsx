import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import PricingPage from "./pages/PricingPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import CustomerAppPage from "./pages/CustomerAppPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import ContactUsPage from "./pages/ContactUsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/pricing" component={PricingPage} />
        <Route path="/contact" component={ContactUsPage} />

        <Route path="/terms-of-service" component={TermsOfServicePage} />
        <Route path="/privacy-policy" component={PrivacyPolicyPage} />

        <Route path="/sign-up" component={SignUpPage} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/login/forgot-password" component={ForgotPasswordPage} />

        <Route path="/app" component={CustomerAppPage} />
      </Switch>
    </BrowserRouter>
  );
}
