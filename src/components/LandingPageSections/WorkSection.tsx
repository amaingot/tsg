import * as React from 'react';

import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import Button from 'src/components/Button';
import CustomInput from 'src/components/CustomInput';
import GridContainer from 'src/components/GridContainer';
import GridItem from 'src/components/GridItem';

import workStyle from 'src/styles/jss/landingPageSections/workStyle';

class WorkSection extends React.Component<WithStyles> {
  public render() {
    const { classes } = this.props;
    return (
      <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <h2 className={classes.title}>Work with us</h2>
            <h4 className={classes.description}>
              Divide details about your product or agency work into parts. Write a few lines about
              each one and contact us about any further collaboration. We will responde get back to
              you in a couple of hours.
            </h4>
            <form>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Your Name"
                    id="name"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Your Email"
                    id="email"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <CustomInput
                  labelText="Your Message"
                  id="message"
                  formControlProps={{
                    fullWidth: true,
                    className: classes.textArea,
                  }}
                  inputProps={{
                    multiline: true,
                    rows: 5,
                  }}
                />
                <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={4} className={classes.textCenter}>
                    <Button color="primary">Send Message</Button>
                  </GridItem>
                </GridContainer>
              </GridContainer>
            </form>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(workStyle)(WorkSection);
