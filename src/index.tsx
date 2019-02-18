import Amplify, { Auth } from 'aws-amplify';
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import { Rehydrated } from 'aws-appsync-react';
import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from 'src/App';
import awsconfig from 'src/aws-exports';
import { AuthContextProvider } from 'src/enhancers/withAuth';

Amplify.configure(awsconfig);

const client = new AWSAppSyncClient({
  url: awsconfig.aws_appsync_graphqlEndpoint,
  region: awsconfig.aws_appsync_region,
  auth: {
    type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
    jwtToken: async () => (await Auth.currentSession()).getAccessToken().getJwtToken(),
  },
});

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client as any}>
      <Rehydrated>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </Rehydrated>
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
