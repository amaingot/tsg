import React from 'react';

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

import loginPageStyle from 'styles/jss/views/loginPageStyle';
import { CommonProps } from 'utils/commonProps';

interface State {
  cardAnimaton: string;
}

class LoginPage extends React.Component<CommonProps, State> {
  constructor(props: CommonProps) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: 'cardHidden',
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
                    }}
                  />
                </CardBody>
                <CardFooter className={classes.justifyContentCenter}>
                  <Button myColor="primary" simple mySize="lg" block>
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

export default withStyles(loginPageStyle)(LoginPage);
