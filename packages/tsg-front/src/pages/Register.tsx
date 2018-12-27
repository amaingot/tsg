import React from 'react';

// @material-ui/core components
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

// @material-ui/icons
// import LockOutline from "@material-ui/icons/LockOutline";
import Check from '@material-ui/icons/Check';
import Code from '@material-ui/icons/Code';
import Email from '@material-ui/icons/Email';
import Face from '@material-ui/icons/Face';
import Group from '@material-ui/icons/Group';
import Timeline from '@material-ui/icons/Timeline';

// core components
import Button from 'components/Button';
import Card from 'components/Card';
import CardBody from 'components/CardBody';
import CustomInput from 'components/CustomInput';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import InfoArea from 'components/InfoArea';

import registerPageStyle from 'styles/jss/views/registerPageStyle';

interface State {
  checked: number[];
}

class RegisterPage extends React.Component<WithStyles, State> {
  constructor(props: WithStyles) {
    super(props);
    this.state = {
      checked: [],
    };
  }

  public handleToggle = (value: number) => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };

  public render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={10}>
            <Card className={classes.cardSignup}>
              <h2 className={classes.cardTitle}>Register</h2>
              <CardBody>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={5}>
                    <InfoArea
                      title="Marketing"
                      description="We've created the marketing campaign of the website. It was a very interesting collaboration."
                      icon={Timeline}
                      iconColor="rose"
                    />
                    <InfoArea
                      title="Fully Coded in HTML5"
                      description="We've developed the website with HTML5 and CSS3. The client has access to the code using GitHub."
                      icon={Code}
                      iconColor="primary"
                    />
                    <InfoArea
                      title="Built Audience"
                      description="There is also a Fully Customizable CMS Admin Dashboard for this product."
                      icon={Group}
                      iconColor="info"
                    />
                  </GridItem>
                  <GridItem xs={12} sm={8} md={5}>
                    <div className={classes.center}>
                      <Button justIcon round myColor="twitter">
                        <i className="fab fa-twitter" />
                      </Button>
                      {` `}
                      <Button justIcon round myColor="dribbble">
                        <i className="fab fa-dribbble" />
                      </Button>
                      {` `}
                      <Button justIcon round myColor="facebook">
                        <i className="fab fa-facebook-f" />
                      </Button>
                      {` `}
                      <h4 className={classes.socialTitle}>or be classical</h4>
                    </div>
                    <form className={classes.form}>
                      <CustomInput
                        formControlProps={{
                          fullWidth: true,
                          className: classes.customFormControlClasses,
                        }}
                        inputProps={{
                          startAdornment: (
                            <InputAdornment position="start" className={classes.inputAdornment}>
                              <Face className={classes.inputAdornmentIcon} />
                            </InputAdornment>
                          ),
                          placeholder: 'First Name...',
                        }}
                      />
                      <CustomInput
                        formControlProps={{
                          fullWidth: true,
                          className: classes.customFormControlClasses,
                        }}
                        inputProps={{
                          startAdornment: (
                            <InputAdornment position="start" className={classes.inputAdornment}>
                              <Email className={classes.inputAdornmentIcon} />
                            </InputAdornment>
                          ),
                          placeholder: 'Email...',
                        }}
                      />
                      <CustomInput
                        formControlProps={{
                          fullWidth: true,
                          className: classes.customFormControlClasses,
                        }}
                        inputProps={{
                          startAdornment: (
                            <InputAdornment position="start" className={classes.inputAdornment}>
                              <Icon className={classes.inputAdornmentIcon}>lock_outline</Icon>
                            </InputAdornment>
                          ),
                          placeholder: 'Password...',
                        }}
                      />
                      <FormControlLabel
                        classes={{
                          root: classes.checkboxLabelControl,
                          label: classes.checkboxLabel,
                        }}
                        control={
                          <Checkbox
                            tabIndex={-1}
                            onClick={this.handleToggle(1)}
                            checkedIcon={<Check className={classes.checkedIcon} />}
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{
                              checked: classes.checked,
                              root: classes.checkRoot,
                            }}
                          />
                        }
                        label={
                          <span>
                            I agree to the <a href="#pablo">terms and conditions</a>.
                          </span>
                        }
                      />
                      <div className={classes.center}>
                        <Button round myColor="primary">
                          Get started
                        </Button>
                      </div>
                    </form>
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(registerPageStyle)(RegisterPage);
