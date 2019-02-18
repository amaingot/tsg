import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import Button from '@material-ui/core/Button';
import { StyleRulesCallback, withStyles, WithStyles } from '@material-ui/core/styles';
import Hero from 'src/components/Hero';
import CustomNavLink from 'src/utils/CustomLink';

const styles: StyleRulesCallback = theme => ({
  button: {
    marginTop: `${theme.spacing.unit * 4}px`,
  },
});

type Props = RouteComponentProps & WithStyles;

const HomePage: React.SFC<Props> = props => {
  const { classes } = props;

  return (
    <React.Fragment>
      <Hero
        title="Home Page"
        description="This is a great home page that is super simple. From here check us out! Go a head and sign in if you are already a customer or sign up if you want to be one!"
        align="left"
        action={
          <CustomNavLink to="/signup">
            <Button className={classes.button} variant="contained" size="large">
              Sign Up
            </Button>
          </CustomNavLink>
        }
      />
    </React.Fragment>
  );
};

export default withStyles(styles)(HomePage);
