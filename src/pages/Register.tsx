import * as React from 'react';

// @material-ui/core components
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

// @material-ui/icons
import Check from '@material-ui/icons/Check';
import Code from '@material-ui/icons/Code';
import Group from '@material-ui/icons/Group';
import Timeline from '@material-ui/icons/Timeline';

// core components
import Button from 'src/components/Button';
import Card from 'src/components/Card';
import CardBody from 'src/components/CardBody';
import CustomInput from 'src/components/CustomInput';
import GridContainer from 'src/components/GridContainer';
import GridItem from 'src/components/GridItem';
import InfoArea from 'src/components/InfoArea';

import { withAuth, WithAuthProps } from 'src/enhancers/withAuth';
import registerPageStyle from 'src/styles/jss/views/registerPageStyle';

interface State {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agree: boolean;
}

class RegisterPage extends React.Component<WithStyles & WithAuthProps, State> {
  constructor(props: WithStyles & WithAuthProps) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      agree: false,
    };
  }

  public toggleAgree = () => this.setState(state => ({ agree: !state.agree }));
  public handleFirstName = (e: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ firstName: e.currentTarget.value });
  public handleLastName = (e: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ lastName: e.currentTarget.value });
  public handleEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ email: e.currentTarget.value });
  public handlePassword = (e: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ password: e.currentTarget.value });
  public handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ confirmPassword: e.currentTarget.value });

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
                      title="Graphs"
                      description="We've created the marketing campaign of the website. It was a very interesting collaboration."
                      icon={Timeline}
                      iconColor="rose"
                    />
                    <InfoArea
                      title="Now in pretty code"
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
                    <form className={classes.form}>
                      <CustomInput
                        formControlProps={{
                          fullWidth: true,
                          className: classes.customFormControlClasses,
                        }}
                        inputProps={{
                          placeholder: 'First Name...',
                          onChange: this.handleFirstName,
                          value: this.state.firstName,
                        }}
                      />
                      <CustomInput
                        formControlProps={{
                          fullWidth: true,
                          className: classes.customFormControlClasses,
                        }}
                        inputProps={{
                          placeholder: 'Last Name...',
                          value: this.state.lastName,
                          onChange: this.handleFirstName,
                        }}
                      />
                      <CustomInput
                        formControlProps={{
                          fullWidth: true,
                          className: classes.customFormControlClasses,
                        }}
                        inputProps={{
                          placeholder: 'Email...',
                          value: this.state.email,
                          onChange: this.handleEmail,
                        }}
                      />
                      <CustomInput
                        formControlProps={{
                          fullWidth: true,
                          className: classes.customFormControlClasses,
                        }}
                        inputProps={{
                          placeholder: 'Password...',
                          value: this.state.password,
                          onChange: this.handlePassword,
                        }}
                      />
                      <CustomInput
                        formControlProps={{
                          fullWidth: true,
                          className: classes.customFormControlClasses,
                        }}
                        inputProps={{
                          placeholder: 'Confirm Password...',
                          value: this.state.confirmPassword,
                          onChange: this.handleConfirmPassword,
                        }}
                      />
                      <FormControlLabel
                        classes={{
                          root: classes.checkboxLabelControl,
                          label: classes.checkboxLabel,
                        }}
                        control={
                          <Checkbox
                            checked={this.state.agree}
                            onClick={this.toggleAgree}
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
                          Get started!
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

export default withAuth(withStyles(registerPageStyle)(RegisterPage));
