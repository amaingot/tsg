import * as React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import Dashboard from 'src/layouts/Dashboard';
import Pages from 'src/layouts/Pages';
import LandingPage from 'src/pages/LandingPage';
import CustomRoute from 'src/utils/CustomRoute';

class App extends React.Component<{}, {}> {
  public render() {
    return (
      <BrowserRouter>
        <Switch>
          <CustomRoute path="/" exact component={LandingPage} />
          <CustomRoute path="/app" privatePath component={Dashboard} />
          <CustomRoute path="/" component={Pages} />
          <CustomRoute component={() => <div>Not Found</div>} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
