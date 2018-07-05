import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';

import Home from './containers/Home';
import About from './containers/About';
import TopNav from './components/TopNav';
import PageFooter from './components/PageFooter';

class App extends Component {
  render() {
    return (
      <Layout>
        <TopNav />
        <Layout.Content>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
          </Switch>
        </Layout.Content>
        <PageFooter />
      </Layout>
    );
  }
}

export default App;
