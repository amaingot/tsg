import * as React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

// core components
import Button from 'src/components/Button';

// import { RouteType } from 'src/routes';
import { withAuth, WithAuthProps } from 'src/enhancers/withAuth';
import headerLinksStyle from 'src/styles/jss/components/kit/headerLinksStyle';

const HeaderLinks: React.SFC<WithStyles & WithAuthProps> = props => {
  const { classes, auth } = props;

  // const renderButton = (route: RouteType) => (
  //   <ListItem className={classes.listItem}>
  //     <Button to={route.path} myColor="transparent" className={classes.navLink}>
  //       {route.name}
  //     </Button>
  //   </ListItem>
  // );

  return (
    <List className={classes.list}>
      {/* <ListItem className={classes.listItem}>
        <Button to="/login" myColor="transparent" className={classes.navLink}>
          Pricing
        </Button>
      </ListItem> */}
      {auth.loggedIn ? (
        <ListItem className={classes.listItem}>
          <Button to="/app" myColor="transparent" className={classes.navLink}>
            Application
          </Button>
        </ListItem>
      ) : (
        <ListItem className={classes.listItem}>
          <Button to="/app" myColor="transparent" className={classes.navLink}>
            App
          </Button>
          <Button to="/login" myColor="transparent" className={classes.navLink}>
            Login
          </Button>
        </ListItem>
      )}
      {/* <ListItem className={classes.listItem}>
        <Button myColor="transparent" className={classes.navLink}>
          Sign Up
        </Button>
      </ListItem> */}
    </List>
  );
};

export default withAuth<{}>(withStyles(headerLinksStyle)(HeaderLinks));
