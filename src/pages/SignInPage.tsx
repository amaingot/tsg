import * as React from 'react';

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import HeaderIcon from 'src/components/HeaderIcon';
import { withAuth, WithAuthProps } from 'src/enhancers/withAuth';
import SimpleLayout from 'src/layouts/SimpleLayout';

const styles: StyleRulesCallback = theme => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  loadingContainer: {
    minHeight: '170px',
    margin: 'auto',
    padding: '100px 0',
  },
});

type Props = WithStyles & WithAuthProps;

interface State {
  email: string;
  password: string;
  rememberMe: boolean;
}

class SignInPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      rememberMe: false,
    };
  }

  public componentDidUpdate() {
    const { auth } = this.props;
    if (auth.loggedIn) {
      auth.redirect();
    }
  }

  public handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      email: e.currentTarget.value,
    });
  };

  public handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      password: e.currentTarget.value,
    });
  };

  public handleRememberMe = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(prevState => ({
      rememberMe: !prevState.rememberMe,
    }));
  };

  public handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { signIn } = this.props.auth;

    signIn({
      username: this.state.email,
      password: this.state.password,
    });
  };

  public renderForm(loading: boolean) {
    const { classes, auth } = this.props;

    return (
      <form className={classes.form} onSubmit={this.handleSubmit}>
        <FormControl margin="normal" required fullWidth disabled={loading}>
          <InputLabel htmlFor="email">Email Address</InputLabel>
          <Input
            id="email"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={this.handleEmail}
            value={this.state.email}
          />
        </FormControl>
        <FormControl margin="normal" required fullWidth disabled={loading}>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            name="password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={this.handlePassword}
            value={this.state.password}
          />
        </FormControl>
        <Typography color="error" variant="body1" component="p">
          {auth.error ? `Error: ${auth.errorMessage}` : ' '}
        </Typography>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          disabled={loading}
        >
          Sign in
        </Button>
      </form>
    );
  }

  public render() {
    const { auth } = this.props;
    const loading = !!auth.loading;

    return (
      <SimpleLayout>
        <HeaderIcon icon={LockOutlinedIcon} loading={loading} />
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {this.renderForm(loading)}
      </SimpleLayout>
    );
  }
}

const StyledSignInPage = withStyles(styles)(SignInPage);

export default withAuth(StyledSignInPage);
