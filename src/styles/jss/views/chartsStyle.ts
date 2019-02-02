// ##############################
// // // IconCard styles
// #############################

import { StyleRules } from '@material-ui/core/styles';
import {
  cardTitle,
  dangerColor,
  grayColor,
  infoColor,
  primaryColor,
  roseColor,
  successColor,
  warningColor,
} from 'src/styles/jss/material-dashboard-pro-react';

const chartsStyle: StyleRules<string> = {
  cardTitle,
  cardCategory: {
    margin: '0',
    color: '#999999',
  },
  cardIconTitle: {
    ...cardTitle,
    marginTop: '15px',
    marginBottom: '0px',
  },
  legendTitle: {
    color: grayColor,
    margin: '10px 0 !important',
    display: 'flex',
  },
  primary: {
    color: primaryColor,
  },
  warning: {
    color: warningColor,
  },
  danger: {
    color: dangerColor,
  },
  success: {
    color: successColor,
  },
  info: {
    color: infoColor,
  },
  rose: {
    color: roseColor,
  },
  gray: {
    color: grayColor,
  },
  cardFooter: {
    display: 'block',
  },
};

export default chartsStyle;
