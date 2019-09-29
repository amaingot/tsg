import * as React from 'react';
import { Switch } from 'react-router-dom';

import CSSBaseline from '@material-ui/core/CssBaseline';
import ThemeProvider from '@material-ui/styles/ThemeProvider';

import SiteLayout from './layouts/SiteLayout';

import ErrorPage from './pages/ErrorPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import VerifySignUpPage from './pages/VerifySignUpPage';

import CustomRedirect from './utils/CustomRedirect';
import CustomRoute from './utils/CustomRoute';
import { Theme } from './utils/Theme';

const App: React.FC = () => {
  return (
    <React.Fragment>
      <CSSBaseline />
      <ThemeProvider theme={Theme}>
        <Switch>
          <CustomRedirect path="/login" exact to="/signin" />
          <CustomRoute path="/signup/verify" unauthedPath component={VerifySignUpPage} />
          <CustomRoute path="/signup" unauthedPath component={SignUpPage} />
          <CustomRoute path="/signin" unauthedPath component={SignInPage} />
          <CustomRoute path="/error" component={ErrorPage} />
          <CustomRoute path="/" component={SiteLayout} />
        </Switch>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
