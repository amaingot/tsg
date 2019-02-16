import withStyles from '@material-ui/core/styles/withStyles';
import * as React from 'react';

import Button from 'src/components/Button';
import Card from 'src/components/Card';
import CardBody from 'src/components/CardBody';
import CardFooter from 'src/components/CardFooter';
import CardHeader from 'src/components/CardHeader';
import CustomInput from 'src/components/CustomInput';
import GridContainer from 'src/components/GridContainer';
import GridItem from 'src/components/GridItem';
import { withAuth, WithAuthProps } from 'src/enhancers/withAuth';

import loginPageStyle from 'src/styles/jss/views/loginPageStyle';
import { CommonProps } from 'src/utils/commonProps';
import CustomRedirect from 'src/utils/CustomRedirect';

interface State {
  cardAnimaton: string;
  email: string;
  password: string;
}

class LoginPage extends React.Component<WithAuthProps & CommonProps, State> {
  constructor(props: WithAuthProps & CommonProps) {
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
    const { auth } = this.props;
    const signInOpts = {
      username: this.state.email,
      password: this.state.password,
    };
    auth.signIn(signInOpts);
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
    const { classes, auth } = this.props;

    if (auth.loading) {
      return <div />;
    }

    if (auth.loggedIn) {
      return <CustomRedirect to={auth.redirectTo || '/app'} />;
    }

    return (
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={9} md={5}>
            <form>
              <Card login className={classes[this.state.cardAnimaton]}>
                <CardHeader
                  className={`${classes.cardHeader} ${classes.textCenter}`}
                  color="success"
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
                    myColor="success"
                    simple
                    mySize="lg"
                    block
                  >
                    Login
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

const StyledLoginPage = withStyles(loginPageStyle)(LoginPage);

export default withAuth(StyledLoginPage);
