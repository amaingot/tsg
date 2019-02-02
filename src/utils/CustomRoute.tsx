import * as React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import { AuthContextConsumer } from 'src/contexts/AuthContext';

export interface Props extends RouteProps {
  path?: string;
  privatePath?: boolean;
}

const CustomRoute: React.SFC<Props> = (props: Props) => {
  const { privatePath, ...rest } = props;
  if (!privatePath) {
    return <Route {...rest} />;
  }

  return (
    <AuthContextConsumer>
      {authContext => {
        if (authContext.loggedIn) {
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
      }}
    </AuthContextConsumer>
  );
};

export default CustomRoute;
