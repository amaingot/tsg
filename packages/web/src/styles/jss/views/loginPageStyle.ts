// ##############################
// // // LoginPage view styles
// #############################

import { StyleRulesCallback, Theme } from '@material-ui/core';
import { cardTitle, container } from 'styles/jss/material-dashboard-pro-react';

const loginPageStyle: StyleRulesCallback<string> = (theme: Theme) => ({
  container: {
    ...container,
    zIndex: 4,
    [theme.breakpoints.down('sm')]: {
      paddingBottom: '100px',
    },
  },
  cardTitle: {
    ...cardTitle,
    color: '#FFFFFF',
  },
  textCenter: {
    textAlign: 'center',
  },
  justifyContentCenter: {
    justifyContent: 'center !important',
  },
  customButtonClass: {
    '&,&:focus,&:hover': {
      color: '#FFFFFF',
    },
    marginLeft: '5px',
    marginRight: '5px',
  },
  inputAdornment: {
    marginRight: '18px',
  },
  inputAdornmentIcon: {
    color: '#555',
  },
  cardHidden: {
    opacity: 0,
    transform: 'translate3d(0, -60px, 0)',
  },
  cardHeader: {
    marginBottom: '20px',
  },
  socialLine: {
    padding: '0.9375rem 0',
  },
});

export default loginPageStyle;