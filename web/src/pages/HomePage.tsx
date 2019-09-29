import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import Button from '@material-ui/core/Button';
import Hero from '../components/Hero';
import CustomNavLink from '../utils/CustomLink';
import { makeStyles } from '../utils/Theme';

const useStyles = makeStyles(theme => ({
  button: {
    marginTop: `${theme.spacing(4)}px`,
  },
}));


const HomePage: React.FC<RouteComponentProps> = props => {
  const classes = useStyles();

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

export default HomePage;
