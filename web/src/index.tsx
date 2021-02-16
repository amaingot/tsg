import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import App from "./App";
import * as serviceWorker from "./serviceWorker";
import config from "./utils/config";
import { AuthContextProvider } from "./contexts/AuthContext";
import client from "./graphql/client";

const stripePromise = loadStripe(config.STRIPE_KEY);

ReactDOM.render(
  <ApolloProvider client={client as any}>
    <Elements stripe={stripePromise}>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </Elements>
  </ApolloProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
