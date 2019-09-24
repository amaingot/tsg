import * as React from 'react';
import { Switch } from 'react-router-dom';

import AppLayout from 'src/layouts/AppLayout';
import SiteLayout from 'src/layouts/SiteLayout';
import ErrorPage from 'src/pages/ErrorPage';
import SignInPage from 'src/pages/SignInPage';
import SignUpPage from 'src/pages/SignUpPage';
import VerifySignUpPage from 'src/pages/VerifySignUpPage';
import CustomRedirect from 'src/utils/CustomRedirect';
import CustomRoute from 'src/utils/CustomRoute';

class App extends React.Component<{}, {}> {
  public render() {
    return (
      <Switch>
        <CustomRedirect path="/login" exact to="/signin" />
        <CustomRoute path="/signup/verify" unauthedPath component={VerifySignUpPage} />
        <CustomRoute path="/signup" unauthedPath component={SignUpPage} />
        <CustomRoute path="/signin" unauthedPath component={SignInPage} />
        <CustomRoute path="/error" component={ErrorPage} />
        <CustomRoute path="/app" privatePath component={AppLayout} />
        <CustomRoute path="/" component={SiteLayout} />
      </Switch>
    );
  }
}

export default App;
