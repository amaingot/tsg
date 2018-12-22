// ##############################
// // // Badge component styles
// #############################

import { StyleRules } from '@material-ui/core/styles';
import {
  dangerColor,
  grayColor,
  infoColor,
  primaryColor,
  roseColor,
  successColor,
  warningColor,
} from 'styles/jss/material-dashboard-pro-react';

const badgeStyle: StyleRules<string> = {
  badge: {
    borderRadius: '12px',
    padding: '5px 12px',
    textTransform: 'uppercase',
    fontSize: '10px',
    fontWeight: 700,
    lineHeight: '1',
    color: '#fff',
    textAlign: 'center',
    verticalAlign: 'baseline',
    display: 'inline-block',
  },
  primary: {
    backgroundColor: primaryColor,
  },
  warning: {
    backgroundColor: warningColor,
  },
  danger: {
    backgroundColor: dangerColor,
  },
  success: {
    backgroundColor: successColor,
  },
  info: {
    backgroundColor: infoColor,
  },
  rose: {
    backgroundColor: roseColor,
  },
  gray: {
    backgroundColor: grayColor,
  },
};

export default badgeStyle;
