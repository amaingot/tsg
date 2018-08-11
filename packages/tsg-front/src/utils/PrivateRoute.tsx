import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router';
import { ApplicationState } from '../store';

export interface PrivateRouteProps {
  component: any;
  path: string;
  isAuthenticated: boolean;
}

class PrivateRoute extends React.Component<PrivateRouteProps> {
  public render() {
    const { component: Component, isAuthenticated, path, ...rest } = this.props;
    return (
      <Route
        path={path}
        {...rest}
        render={props =>
          isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location },
                search: App.webEnv === 'production' ? '' : `?env=${App.webEnv}`,
              }}
            />
          )
        }
      />
    );
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  isAuthenticated: !!state.auth.jwt,
});

export default connect(mapStateToProps)(PrivateRoute);
