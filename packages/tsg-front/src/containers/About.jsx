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
          <AppTitle>About TSG</AppTitle>
        </AppHeader>
        <AppIntro>Some about stuff.</AppIntro>
      </AppContainer>
    );
  }
}

export default App;
