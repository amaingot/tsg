/* tslint:disable:no-empty */
import { SignInOpts } from '@aws-amplify/auth/lib/types';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { Auth } from 'aws-amplify';
import * as React from 'react';

export interface AuthContextShape {
  loggedIn: boolean;
  loading: number;
  error: boolean;
  redirectTo?: string;
  currentUser?: CognitoUser;
  updateSession: () => void;
  updateUser: () => void;
  signIn: (opts: SignInOpts) => void;
  setRedirect: (to: string) => void;
  redirected: () => void;
}

const defaultValue: AuthContextShape = {
  loggedIn: false,
  loading: 0,
  error: false,
  updateSession: () => {},
  updateUser: () => {},
  signIn: () => {},
  setRedirect: () => {},
  redirected: () => {},
};

const AuthContext = React.createContext<AuthContextShape>(defaultValue);

interface ProviderProps {
  children: React.ReactNode;
}

export class AuthContextProvider extends React.Component<ProviderProps, AuthContextShape> {
  constructor(props: ProviderProps) {
    super(props);

    this.state = {
      ...defaultValue,
      updateSession: this.updateSession,
      signIn: this.signIn,
      updateUser: this.updateUser,
      setRedirect: this.setRedirect,
      redirected: this.redirected,
    };
  }

  public componentDidMount() {
    this.updateSession();
    this.updateUser();
  }

  private updateSession = () => {
    this.setState(state => ({ loading: state.loading + 1 }));
    Auth.currentSession().then(session =>
      this.setState(state => ({ loggedIn: session.isValid(), loading: state.loading - 1 }))
    );
  };

  private updateUser = () => {
    this.setState(state => ({ loading: state.loading + 1 }));
    Auth.currentAuthenticatedUser().then(this.handleUserResponse);
  };

  private signIn = (opts: SignInOpts) => {
    this.setState(state => ({ loading: state.loading + 1 }));
    Auth.signIn(opts).then(this.handleUserResponse);
  };

  private setRedirect = (to: string) => this.setState({ redirectTo: to });
  private redirected = () => this.setState({ redirectTo: undefined });

  private handleUserResponse = (user: any) => {
    if (user instanceof CognitoUser) {
      this.setState(state => ({
        loggedIn: true,
        currentUser: user,
        loading: state.loading - 1,
      }));
    } else {
      this.setState(state => ({
        loading: state.loading - 1,
        error: true,
      }));
    }
  };

  public render() {
    const { children } = this.props;

    return <AuthContext.Provider value={this.state}>{children}</AuthContext.Provider>;
  }
}

export const AuthContextConsumer = AuthContext.Consumer;

export interface WithAuthProps {
  auth: AuthContextShape;
}

export function withAuth<TProps extends {}>(
  Component: React.ComponentType<TProps & WithAuthProps>
) {
  return class Wrapped extends React.Component<TProps, any> {
    public render() {
      return (
        <AuthContextConsumer>
          {context => <Component {...this.props} auth={context} />}
        </AuthContextConsumer>
      );
    }
  };
}
