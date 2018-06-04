import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';

import Home from './containers/Home';
import About from './containers/About';
import TopNav from './components/TopNav';
import PageFooter from './components/PageFooter';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <TopNav />
          <Layout.Content>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/about" component={About} />
            </Switch>
          </Layout.Content>
          <PageFooter />
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
