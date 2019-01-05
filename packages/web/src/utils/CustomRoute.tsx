import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router';
import { ApplicationState } from '../store';

export interface Props extends RouteProps {
  path?: string;
  privatePath?: boolean;
  isAuthenticated: boolean;
}

const CustomRoute: React.SFC<Props> = (props: Props) => {
  const { isAuthenticated, privatePath, ...rest } = props;
  if (isAuthenticated || !privatePath) {
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

const mapState2Props = (state: ApplicationState) => ({
  isAuthenticated: !!state.auth.jwt,
});

export default connect(mapState2Props)(CustomRoute);
