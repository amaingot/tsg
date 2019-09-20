import Amplify, { Auth } from 'aws-amplify';
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import { Rehydrated } from 'aws-appsync-react';
import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import * as ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';

import App from 'src/App';
import awsconfig from 'src/aws-exports';
import { AuthContextProvider } from 'src/enhancers/withAuth';
import { history } from 'src/utils/history';

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
  <Router history={history}>
    <ApolloProvider client={client as any}>
      <Rehydrated>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </Rehydrated>
    </ApolloProvider>
  </Router>,
  document.getElementById('root')
);
