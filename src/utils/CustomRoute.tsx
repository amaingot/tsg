import * as React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';

import { withAuth, WithAuthProps } from 'src/enhancers/withAuth';

export interface CustomRouteProps extends RouteProps {
  path?: string;
  privatePath?: boolean;
  unauthedPath?: boolean;
}

const CustomRoute: React.SFC<CustomRouteProps & WithAuthProps> = props => {
  const { privatePath, unauthedPath, auth, ...rest } = props;

  if (!privatePath || auth.loggedIn) {
    return <Route {...rest} />;
  }

  // auth.setRedirect(rest.path || '/app');

  if (unauthedPath && !auth.loggedIn) {
    return (
      <Redirect
        to={{
          pathname: '/app',
          state: { from: props.path },
          search: App.webEnv === 'production' ? '' : `?env=${App.webEnv}`,
        }}
      />
    );
  }

  return (
    <Redirect
      to={{
        pathname: '/signin',
        state: { from: props.path },
        search: App.webEnv === 'production' ? '' : `?env=${App.webEnv}`,
      }}
    />
  );
};

export default withAuth(CustomRoute);
