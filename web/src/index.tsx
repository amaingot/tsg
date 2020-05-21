import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import firebase from "firebase";

import App from "./App";
import * as serviceWorker from "./serviceWorker";
import config from "./utils/config";
import { AuthContextProvider } from "./contexts/AuthContext";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCXEfo_E5n2FbZx17A8kyYx4zN6O4d_Xhw",
  authDomain: "hmm-dev.firebaseapp.com",
  databaseURL: "https://hmm-dev.firebaseio.com",
  projectId: "hmm-dev",
  storageBucket: "hmm-dev.appspot.com",
  messagingSenderId: "411904317709",
  appId: "1:411904317709:web:7357de2a128642ddbc7844",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const client = new ApolloClient({
  uri: "/graphql",
  
});

const stripePromise = loadStripe(config.STRIPE_KEY);

ReactDOM.render(
  <ApolloProvider client={client}>
    <Elements stripe={stripePromise}>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </Elements>
  </ApolloProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
