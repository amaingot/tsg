// ##############################
// // // ValidationForms view styles
// #############################

import { StyleRules } from '@material-ui/core/styles';
import customCheckboxRadioSwitch from 'styles/jss/customCheckboxRadioSwitch';
import { cardTitle, dangerColor } from 'styles/jss/material-dashboard-pro-react';

const validationFormsStyle: StyleRules<string> = {
  ...customCheckboxRadioSwitch,
  cardTitle: {
    ...cardTitle,
    color: '#FFFFFF',
  },
  cardIconTitle: {
    ...cardTitle,
    marginTop: '15px',
    marginBottom: '0px',
  },
  formCategory: {
    marginBottom: '0',
    color: '#999999',
    fontSize: '14px',
    padding: '10px 0 10px',
  },
  center: {
    textAlign: 'center',
  },
  justifyContentCenter: {
    justifyContent: 'center',
  },
  registerButton: {
    float: 'right',
  },
  danger: {
    color: dangerColor + '!important',
  },
};

export default validationFormsStyle;
