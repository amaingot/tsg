import * as React from 'react';

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '../utils/Theme';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import Typography from '@material-ui/core/Typography';

import HeaderIcon from '../components/HeaderIcon';

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    marginTop: theme.spacing(3),
  },
}));

export interface VerifyCodeFormProps {
  title: string;
  resendCode?: () => void;
  submit?: (code: string) => void;
  loading: boolean;
  serverError?: string;
  icon: React.ComponentType<SvgIconProps>;
}

export interface VerifyCodeFormState {
  code: string;
  localError?: string;
}

class VerifyCodeForm extends React.Component<VerifyCodeFormProps, VerifyCodeFormState> {
  constructor(props: VerifyCodeFormProps) {
    super(props);
    this.state = {
      code: '',
    };
  }

  public handleCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.currentTarget.value;
    const cleanInput = userInput.replace(/[^0-9]/g, '');

    if (userInput !== cleanInput) {
      this.setState({
        localError: 'Only numbers are allowed',
      });
    } else if (cleanInput.length > 6) {
      this.setState({
        localError: 'The code is only six digits long',
      });
    } else {
      this.setState({
        code: cleanInput,
        localError: undefined,
      });
    }
  };

  public validate = (): boolean => {
    if (this.state.code.length !== 6) {
      this.setState({
        localError: 'Please enter the correct code, The code is exactly 6 digits long',
      });
      return false;
    }

    return true;
  };

  public handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { submit } = this.props;
    const inputsAreValid = this.validate();

    if (submit && inputsAreValid) {
      submit(this.state.code);
    }
  };

  public renderForm() {
    const { serverError, resendCode, loading } = this.props;
    const classes = useStyles();

    const hasError = !!serverError || !!this.state.localError;

    return (
      <form className={classes.form} onSubmit={this.handleSubmit}>
        <FormControl margin="normal" required fullWidth error={hasError} disabled={loading}>
          <InputLabel htmlFor="code">Verification Code</InputLabel>
          <Input
            id="code"
            name="code"
            autoComplete="code"
            autoFocus
            onChange={this.handleCode}
            value={this.state.code}
          />
          {!hasError && (
            <FormHelperText>
              Check your email inbox for a message with a six digit code.
            </FormHelperText>
          )}
          {serverError && <FormHelperText>{serverError}</FormHelperText>}
          {this.state.localError && <FormHelperText>{this.state.localError}</FormHelperText>}
        </FormControl>
        <Button fullWidth className={classes.submit} onClick={resendCode} disabled={loading}>
          Send code again
        </Button>
        <Button
          type="submit"
          color="primary"
          fullWidth
          variant="contained"
          className={classes.submit}
          disabled={loading}
        >
          Verify
        </Button>
      </form>
    );
  }

  public render() {
    const { loading, title, icon } = this.props;
    return (
      <>
        <HeaderIcon icon={icon} loading={loading} />
        <Typography component="h1" variant="h5">
          {title}
        </Typography>
        {this.renderForm()}
      </>
    );
  }
}

export default VerifyCodeForm;
