import React from 'react';

// @material-ui/core components
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

// @material-ui/icons
import Email from '@material-ui/icons/Email';
import Face from '@material-ui/icons/Face';
// import LockOutline from "@material-ui/icons/LockOutline";

// core components
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardFooter from 'components/Card/CardFooter';
import CardHeader from 'components/Card/CardHeader';
import Button from 'components/CustomButtons/Button';
import CustomInput from 'components/CustomInput/CustomInput';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';

import loginPageStyle from 'styles/jss/views/loginPageStyle';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: 'cardHidden',
    };
  }
  public componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    this.timeOutFunction = setTimeout(
      function() {
        this.setState({ cardAnimaton: '' });
      }.bind(this),
      700
    );
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
                <CardHeader className={`${classes.cardHeader} ${classes.textCenter}`} color="rose">
                  <h4 className={classes.cardTitle}>Log in</h4>
                  <div className={classes.socialLine}>
                    {['fab fa-facebook-square', 'fab fa-twitter', 'fab fa-google-plus'].map(
                      (prop, key) => {
                        return (
                          <Button
                            color="transparent"
                            justIcon
                            key={key}
                            className={classes.customButtonClass}
                          >
                            <i className={prop} />
                          </Button>
                        );
                      }
                    )}
                  </div>
                </CardHeader>
                <CardBody>
                  <CustomInput
                    labelText="First Name.."
                    id="firstname"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Face className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                      ),
                    }}
                  />
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
                  <Button color="rose" simple size="lg" block>
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

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(loginPageStyle)(LoginPage);
