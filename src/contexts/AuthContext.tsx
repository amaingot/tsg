/* tslint:disable:no-empty */
import { SignInOpts } from '@aws-amplify/auth/lib/types';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { Auth } from 'aws-amplify';
import * as React from 'react';

export interface AuthContextShape {
  loggedIn: boolean;
  loading: boolean;
  error: boolean;
  currentUser?: CognitoUser;
  updateSession: () => void;
  signIn: (opts: SignInOpts) => void;
}

const defaultValue: AuthContextShape = {
  loggedIn: false,
  loading: false,
  error: false,
  updateSession: () => {},
  signIn: () => {},
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
    };
  }

  public updateSession = () => {
    this.setState({ loading: true });
    Auth.currentSession().then(session =>
      this.setState({ loggedIn: session.isValid(), loading: false })
    );
  };

  public signIn = (opts: SignInOpts) => {
    this.setState({ loading: true });

    Auth.signIn(opts).then(user => {
      if (user instanceof CognitoUser) {
        this.setState({
          loggedIn: true,
          currentUser: user,
          loading: false,
        });
      } else {
        this.setState({
          loading: false,
          error: true,
        });
      }
    });
  };

  public render() {
    const { children } = this.props;

    return <AuthContext.Provider value={this.state}>{children}</AuthContext.Provider>;
  }
}

export const AuthContextConsumer = AuthContext.Consumer;
