import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import Amplify from "@aws-amplify/core";
import { BrowserRouter } from "react-router-dom";
import AllContextProviders from "./contexts";
import { Provider } from "react-redux";

import store from "./store";

Amplify.configure({
  Auth: {
    region: process.env.REACT_APP_COGNITO_REGION,
    userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_COGNITO_USER_POOL_CLIENT_ID
  }
});

ReactDOM.render(
  <Provider store={store}>
    <AllContextProviders>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AllContextProviders>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
