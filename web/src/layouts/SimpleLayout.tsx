import classNames from 'classnames';
import * as React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { makeStyles } from '../utils/Theme';
import CustomNavLink from '../utils/CustomLink';

export const useSiteLayoutStyles = makeStyles(theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(3) * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    position: 'relative',
  },
  mainNormalWidth: {
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      width: 600,
    },
  },
  mainLargeWidth: {
    [theme.breakpoints.up(800 + theme.spacing(3) * 2)]: {
      width: 800,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
  },
  fab: {
    position: 'absolute',
    top: theme.spacing(4),
    left: theme.spacing(4),
  },
}));

interface Props {
  children: React.ReactNode;
  width?: 'small' | 'normal' | 'large';
}

const SimpleLayout: React.FC<Props> = props => {
  const { children, width } = props;
  const classes = useSiteLayoutStyles();

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

export default SimpleLayout;
