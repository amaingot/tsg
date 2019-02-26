/* tslint:disable:no-empty no-console */
import { SignInOpts, SignUpParams } from '@aws-amplify/auth/lib/types';
import { CognitoUser, CognitoUserSession } from 'amazon-cognito-identity-js';
import { Auth } from 'aws-amplify';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

interface SignUpOpts {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

export enum UserGroup {
  Admin = 'Admin',
  AccountOwner = 'AccountOwner',
}

interface SessionPayload {
  given_name: string;
  family_name: string;
  email: string;
  email_verified: boolean;
  phone_number: string;
  phone_number_verified: boolean;
  'cognito:groups': string[];
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  groups: UserGroup[];
}

export type VerifyAttributeType = 'phone' | 'email';

export interface AuthContextShape {
  loaded: boolean;
  loggedIn: boolean;
  loading: number;
  error: boolean;
  errorMessage?: string;
  errorCode?: string;
  redirectTo?: string;
  user?: User;
  cognitoUser?: CognitoUser;
  cognitoSession?: CognitoUserSession;
  updateSession: () => void;
  updateUser: () => void;
  signOut: () => void;
  signUp: (opts: SignUpOpts) => void;
  signIn: (opts: SignInOpts) => void;
  setRedirect: (to: string) => void;
  redirect: (to?: string) => void;
  sendCodeForAttribute: (attr: VerifyAttributeType) => void;
  verifyCodeForAttribute?: (code: string) => void;
  verifyCodeForyNewUser?: (code: string) => void;
  resendCodeForNewUser?: () => void;
}

const defaultValue: AuthContextShape = {
  loaded: false,
  loggedIn: false,
  loading: 0,
  error: false,
  updateSession: () => {},
  updateUser: () => {},
  signUp: () => {},
  signIn: () => {},
  signOut: () => {},
  setRedirect: () => {},
  redirect: () => {},
  sendCodeForAttribute: () => {},
};

const AuthContext = React.createContext<AuthContextShape>(defaultValue);

interface ProviderProps extends RouteComponentProps {
  children: React.ReactNode;
}

class WithoutRouterAuthContextProvider extends React.Component<ProviderProps, AuthContextShape> {
  constructor(props: ProviderProps) {
    super(props);

    this.state = {
      ...defaultValue,
      updateSession: this.updateSession,
      signIn: this.signIn,
      signUp: this.signUp,
      signOut: this.signOut,
      updateUser: this.updateUser,
      setRedirect: this.setRedirect,
      redirect: this.redirect,
      sendCodeForAttribute: this.sendVerifyCode,
    };
  }

  public componentDidMount() {
    this.updateSession();
    this.updateUser();
  }

  private updateSession = () => {
    this.setState(state => ({ loading: state.loading + 1 }));
    Auth.currentSession()
      .then(session => {
        const idToken = session.getIdToken();
        const payload = idToken.payload as SessionPayload;
        const groups = (payload['cognito:groups'] || []) as UserGroup[];

        const user: User = {
          firstName: payload.given_name,
          lastName: payload.family_name,
          email: payload.email,
          emailVerified: payload.email_verified,
          phone: payload.phone_number,
          phoneVerified: payload.phone_number_verified,
          groups,
        };

        this.setState(state => ({
          loaded: true,
          loggedIn: session.isValid(),
          cognitoSession: session,
          user,
          loading: state.loading - 1,
          error: false,
          errorCode: undefined,
          errorMessage: undefined,
        }));
      })
      .catch(this.handleUserResponse);
  };

  private updateUser = () => {
    this.setState(state => ({ loading: state.loading + 1 }));
    Auth.currentAuthenticatedUser()
      .then(this.handleUserResponse)
      .catch(e => this.handleUserResponse(e, false));
  };

  public signUp = (opts: SignUpOpts) => {
    this.setState(state => ({ loading: state.loading + 1 }));

    const signUpParams: SignUpParams = {
      username: opts.email,
      password: opts.password,
      attributes: {
        given_name: opts.firstName,
        family_name: opts.lastName,
        phone_number: opts.phone,
        email: opts.email,
      },
    };

    Auth.signUp(signUpParams)
      .then(result => {
        if (!result.userConfirmed) {
          this.setState(
            state => ({
              loading: state.loading - 1,
              resendCodeForNewUser: this.resendNewUserConfirmSignUp(opts.email),
              verifyCodeForyNewUser: this.confirmSignUp(signUpParams),
            }),
            () => this.redirect('/signup/verify')
          );
        } else {
          this.setState(state => ({
            loggedIn: true,
            cognitoUser: result.user,
            loading: state.loading - 1,
          }));
        }
      })
      .catch(this.catchReason);
  };

  private confirmSignUp = (opts: SignInOpts) => (code: string) => {
    this.setState(state => ({ loading: state.loading + 1 }));

    Auth.confirmSignUp(opts.username, code)
      .then(() => {
        this.setState(state => ({
          loading: state.loading - 1,
          resendCodeForNewUser: undefined,
          verifyCodeForyNewUser: undefined,
        }));
        this.updateSession();
        this.updateUser();
        this.signIn({ username: opts.username, password: opts.password });
      })
      .catch(this.catchReason);
  };

  private resendNewUserConfirmSignUp = (email: string) => () => {
    this.setState(state => ({ loading: state.loading + 1 }));

    Auth.resendSignUp(email)
      .then(() => {
        this.setState(state => ({ loading: state.loading - 1 }));
      })
      .catch(this.catchReason);
  };

  private sendVerifyCode = (attr: VerifyAttributeType) => {
    const { cognitoUser, user } = this.state;

    if (cognitoUser && user) {
      if (attr === 'email' && user.emailVerified) {
        this.setState({
          error: true,
          errorMessage: 'Your email is already confirmed, no need to resend the verification code.',
          errorCode: 'EmailAlreadyVerified',
        });
        return;
      } else if (attr === 'phone' && user.phoneVerified) {
        this.setState({
          error: true,
          errorMessage:
            'Your phone number is already confirmed, no need to resend the verification code.',
          errorCode: 'PhoneAlreadyVerified',
        });
        return;
      }

      this.setState(state => ({
        loading: state.loading + 1,
      }));

      Auth.verifyCurrentUserAttribute(attr === 'email' ? attr : 'phone_number')
        .then(() => {
          this.setState(state => ({
            loading: state.loading - 1,
            verifyCodeForAttribute: this.verifyCode(attr),
          }));
          this.updateSession();
          this.updateUser();
        })
        .catch(this.catchReason);
    } else {
      this.setState({
        error: true,
        errorMessage: 'No user is logged in to verify',
        errorCode: 'NoLoggedInUser',
      });
    }
  };

  private verifyCode = (attr: VerifyAttributeType) => (code: string) => {
    const { cognitoUser, user } = this.state;
    this.setState(state => ({
      loading: state.loading + 1,
    }));

    if (cognitoUser && user) {
      Auth.verifyCurrentUserAttributeSubmit(attr, code)
        .then(r => {
          console.log('Verify current user attribute submit response: ', r);
          this.setState(state => ({
            loading: state.loading - 1,
            verifyCodeForAttribute: undefined,
          }));
          this.updateSession();
          this.updateUser();
        })
        .catch(this.catchReason);
    } else {
      this.setState({
        error: true,
        errorMessage: 'No user is logged in to verify',
        errorCode: 'NoLoggedInUser',
      });
    }
  };

  private signIn = (opts: SignInOpts) => {
    this.setState(state => ({ loading: state.loading + 1 }));

    const waitTime = 2200;

    Auth.signIn(opts)
      .then(user => {
        setTimeout(() => {
          this.handleUserResponse(user);
          this.updateSession();
          this.redirect();
        }, waitTime);
      })
      .catch(reason => {
        setTimeout(() => {
          this.updateSession();
          if (reason.code === 'UserNotConfirmedException') {
            this.setState(state => ({
              loading: state.loading - 1,
              resendCodeForNewUser: this.resendNewUserConfirmSignUp(opts.username),
              verifyCodeForyNewUser: this.confirmSignUp(opts),
            }));
            this.redirect('/signup/verify');
          } else {
            this.catchReason(reason);
          }
        }, waitTime);
      });
  };

  private signOut = () => {
    Auth.signOut()
      .then(() =>
        this.setState({
          loggedIn: false,
          loading: 0,
          error: false,
          errorMessage: undefined,
          errorCode: undefined,
          cognitoUser: undefined,
          user: undefined,
          cognitoSession: undefined,
          redirectTo: undefined,
        })
      )
      .then(() => this.redirect('/'));
  };

  private setRedirect = (to: string) => this.setState({ redirectTo: to });

  private redirected = () => this.setState({ redirectTo: undefined });

  private redirect = (path?: string) => {
    const { history } = this.props;
    history.push({
      pathname: path || this.state.redirectTo || '/app',
      search: App.webEnv === 'production' ? '' : `?env=${App.webEnv}`,
    });
    this.redirected();
  };

  private handleUserResponse = (user: any, reportError: boolean = false) => {
    if (user instanceof CognitoUser) {
      this.setState(state => ({
        loaded: true,
        loggedIn: true,
        cognitoUser: user,
        loading: state.loading - 1,
        error: false,
        errorCode: undefined,
        errorMessage: undefined,
      }));
    } else {
      this.setState(state => ({
        loading: state.loading - 1,
      }));
    }
  };

  private catchReason = (reason: any) => {
    this.setState(state => ({
      loading: state.loading - 1,
      error: true,
      errorCode: reason.code,
      errorMessage: reason.message,
    }));
  };

  public render() {
    const { children } = this.props;

    if (!this.state.loaded) {
      return null;
    };

    return <AuthContext.Provider value={this.state}>{children}</AuthContext.Provider>;
  }
}

export const AuthContextProvider = withRouter(WithoutRouterAuthContextProvider);

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
