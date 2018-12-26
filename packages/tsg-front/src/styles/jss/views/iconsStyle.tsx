// ##############################
// // // Icons styles
// #############################

import { StyleRules } from '@material-ui/core/styles';
import { boxShadow } from 'styles/jss/material-dashboard-pro-react';

const iconsStyle: StyleRules<string> = {
  iframe: {
    width: '100%',
    height: '500px',
    border: '0',
    ...boxShadow,
  },
  iframeContainer: {
    margin: '0 -20px 0',
  },
};

export default iconsStyle;