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
            <h2 className={classes.title}>Interested? Let's talk!</h2>
            <h4 className={classes.description}>
              If you're interested in using Tennis Shop Guru to manage your tennis shop customer
              experience, we'd love to talk! Please enter your contact info below and we will reach
              out to you!
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
