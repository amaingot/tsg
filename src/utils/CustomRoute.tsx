import * as React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';

import { withAuth, WithAuthProps } from 'src/enhancers/withAuth';

export interface Props extends RouteProps {
  path?: string;
  privatePath?: boolean;
}

const CustomRoute: React.SFC<Props & WithAuthProps> = props => {
  const { privatePath, auth, ...rest } = props;
  if (!privatePath || auth.loggedIn) {
    return <Route {...rest} />;
  }

  return (
    <Redirect
      to={{
        pathname: '/login',
        state: { from: props.path },
        search: App.webEnv === 'production' ? '' : `?env=${App.webEnv}`,
      }}
    />
  );
};

export default withAuth(CustomRoute);
