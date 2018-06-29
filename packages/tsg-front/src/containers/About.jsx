import React, { Component } from 'react';
import styled from 'styled-components';

const AppContainer = styled.div`
  text-align: center;
`;

const AppHeader = styled.header`
  background-color: #222;
  height: 150px;
  padding: 20px;
  color: white;
`;

const AppTitle = styled.h1`
  font-size: 1.5em;
`;

const AppIntro = styled.p`
  font-size: large;
`;

class App extends Component {
  render() {
    return (
      <AppContainer>
        <AppHeader>
          <AppTitle>About TSG</AppTitle>
        </AppHeader>
        <AppIntro>
          Some about stuff.
        </AppIntro>
      </AppContainer>
    );
  }
}

export default App;
