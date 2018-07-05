import React, { Component } from 'react';

import AppContainer from '../components/AppContainer';
import AppHeader from '../components/AppHeader';
import AppTitle from '../components/AppTitle';
import AppIntro from '../components/AppIntro';

class App extends Component {
  render() {
    return (
      <AppContainer>
        <AppHeader>
          <AppTitle>Welcome to React</AppTitle>
        </AppHeader>
        <AppIntro>
          To get started, edit <code>src/App.js</code> and save to reload. BLASH
        </AppIntro>
      </AppContainer>
    );
  }
}

export default App;
