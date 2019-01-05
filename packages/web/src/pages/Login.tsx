import React from 'react';
import { connect } from 'react-redux';

// @material-ui/core components
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import withStyles from '@material-ui/core/styles/withStyles';

// @material-ui/icons
import Email from '@material-ui/icons/Email';
// import LockOutline from "@material-ui/icons/LockOutline";

// core components
import Button from 'components/Button';
import Card from 'components/Card';
import CardBody from 'components/CardBody';
import CardFooter from 'components/CardFooter';
import CardHeader from 'components/CardHeader';
import CustomInput from 'components/CustomInput';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';

import { LoginRequest } from 'store/auth/types';
import loginPageStyle from 'styles/jss/views/loginPageStyle';
import { CommonProps } from 'utils/commonProps';
import { login } from '../store/auth/actions';

interface Props extends CommonProps {
  login: (request: LoginRequest) => void;
}

interface State {
  cardAnimaton: string;
  email: string;
  password: string;
}

class LoginPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: 'cardHidden',
      email: '',
      password: '',
    };
  }

  public timeOutFunction: any;

  public componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    this.timeOutFunction = setTimeout(() => {
      this.setState({ cardAnimaton: '' });
    }, 700);
  }
  public componentWillUnmount() {
    clearTimeout(this.timeOutFunction);
    this.timeOutFunction = null;
  }

  public handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    this.props.login({
      email: this.state.email,
      password: this.state.password,
      // hardcoded to true for now
      stayLoggedIn: true,
    });
    this.setState({ email: '', password: '' });
  };

  public handleChange = (key: 'email' | 'password') => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (key === 'email') {
      this.setState({ email: e.currentTarget.value });
    }
    if (key === 'password') {
      this.setState({ password: e.currentTarget.value });
    }
  };

  public render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={6} md={4}>
            <form>
              <Card login className={classes[this.state.cardAnimaton]}>
                <CardHeader
                  className={`${classes.cardHeader} ${classes.textCenter}`}
                  color="primary"
                >
                  <h3 className={classes.cardTitle}>Log in</h3>
                </CardHeader>
                <CardBody>
                  <CustomInput
                    labelText="Email..."
                    id="email"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Email className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                      ),
                      onChange: this.handleChange('email'),
                      value: this.state.email,
                    }}
                  />
                  <CustomInput
                    labelText="Password"
                    id="password"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Icon className={classes.inputAdornmentIcon}>lock_outline</Icon>
                        </InputAdornment>
                      ),
                      onChange: this.handleChange('password'),
                      value: this.state.password,
                      type: 'password',
                    }}
                  />
                </CardBody>
                <CardFooter className={classes.justifyContentCenter}>
                  <Button
                    onClick={this.handleSubmit}
                    type="submit"
                    myColor="primary"
                    simple
                    mySize="lg"
                    block
                  >
                    Let's Go
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default connect(
  null,
  { login }
)(withStyles(loginPageStyle)(LoginPage));
