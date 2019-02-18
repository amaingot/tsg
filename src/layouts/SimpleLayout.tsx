import classNames from 'classnames';
import * as React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';
import { StyleRulesCallback, withStyles, WithStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CustomNavLink from 'src/utils/CustomLink';

export const siteLayoutStyles: StyleRulesCallback = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    position: 'relative',
  },
  mainNormalWidth: {
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      width: 600,
    },
  },
  mainLargeWidth: {
    [theme.breakpoints.up(800 + theme.spacing.unit * 3 * 2)]: {
      width: 800,
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    marginBottom: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  fab: {
    position: 'absolute',
    top: theme.spacing.unit * 4,
    left: theme.spacing.unit * 4,
  },
});

interface Props extends WithStyles {
  children: React.ReactNode;
  width?: 'small' | 'normal' | 'large';
}

const SimpleLayout: React.FunctionComponent<Props> = props => {
  const { classes, children, width } = props;
  return (
    <React.Fragment>
      <main
        className={classNames(classes.main, {
          [classes.mainNormalWidth]: width === 'normal',
          [classes.mainLargeWidth]: width === 'large',
        })}
      >
        <CssBaseline />
        <Paper className={classes.paper}>{children}</Paper>
      </main>
      <CustomNavLink to="/">
        <Fab className={classes.fab}>
          <ArrowBackIcon />
        </Fab>
      </CustomNavLink>
    </React.Fragment>
  );
};

export default withStyles(siteLayoutStyles)(SimpleLayout);
