// ##############################
// // // Notifications view styles
// #############################

import { StyleRulesCallback, Theme } from '@material-ui/core';
import { defaultFont } from 'styles/jss/material-dashboard-pro-react';
import modalStyle from 'styles/jss/modalStyle';

const notificationsStyle: StyleRulesCallback<string> = (theme: Theme) => ({
  cardTitle: {
    marginTop: '0',
    marginBottom: '3px',
    color: '#3C4858',
    fontSize: '18px',
  },
  cardHeader: {
    zIndex: 3,
  },
  cardSubtitle: {
    ...defaultFont,
    color: '#999999',
    fontSize: '14px',
    margin: '0 0 10px',
  },
  center: {
    textAlign: 'center',
  },
  right: {
    textAlign: 'right',
  },
  left: {
    textAlign: 'left',
  },
  marginRight: {
    marginRight: '5px',
  },
  modalSectionTitle: {
    marginTop: '30px',
  },
  ...modalStyle(theme),
});

export default notificationsStyle;
