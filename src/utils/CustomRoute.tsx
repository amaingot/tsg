import * as React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';

import { UserGroup, withAuth, WithAuthProps } from 'src/enhancers/withAuth';

export interface CustomRouteProps extends RouteProps {
  path?: string;
  privatePath?: boolean;
  unauthedPath?: boolean;
  allowedGroups?: UserGroup[];
}

type Props = CustomRouteProps & WithAuthProps;

class CustomRoute extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  public render() {
    const { allowedGroups, unauthedPath, privatePath, auth, ...rest } = this.props;
    const { user, loggedIn } = auth;

    const notInGroup =
      allowedGroups && user && allowedGroups.filter(g => user.groups.includes(g)).length === 0;
    const onlyForUnAuthed = unauthedPath && !loggedIn;
    const onlyForAuthed = privatePath && !loggedIn;
    let redirectTo: string | undefined;

    if (notInGroup || onlyForUnAuthed) {
      redirectTo = '/app';
    } else if (onlyForAuthed) {
      redirectTo = '/signin';
    }

    if (redirectTo) {
      return (
        <Redirect
          to={{
            pathname: redirectTo,
            state: { from: this.props.path },
            search: App.webEnv === 'production' ? '' : `?env=${App.webEnv}`,
          }}
        />
      );
    }

    return <Route {...rest} />;
  }
}

export default withAuth(CustomRoute);
