import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import Amplify from "@aws-amplify/core";
import { BrowserRouter } from "react-router-dom";
import AllContextProviders from "./contexts";

Amplify.configure({
  Auth: {
    region: process.env.REACT_APP_COGNITO_REGION,
    userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_COGNITO_USER_POOL_CLIENT_ID
  },
  API: {
    endpoints: [
      {
        name: "tsg",
        endpoint: "https://tsg-api.hmm.dev"
      }
    ]
  }
});

ReactDOM.render(
  <AllContextProviders>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AllContextProviders>,
  document.getElementById("root")
);

serviceWorker.unregister();
