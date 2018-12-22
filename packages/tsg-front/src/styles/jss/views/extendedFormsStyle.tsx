// ##############################
// // // ExtendedForms view styles
// #############################

import { StyleRules } from '@material-ui/core/styles';
import customCheckboxRadioSwitch from 'styles/jss/customCheckboxRadioSwitch';
import customSelectStyle from 'styles/jss/customSelectStyle';
import { cardTitle } from 'styles/jss/material-dashboard-pro-react';

const extendedFormsStyle: StyleRules<string> = {
  ...customCheckboxRadioSwitch,
  ...customSelectStyle,
  cardTitle,
  cardIconTitle: {
    ...cardTitle,
    marginTop: '15px',
    marginBottom: '0px',
  },
  label: {
    cursor: 'pointer',
    paddingLeft: '0',
    color: 'rgba(0, 0, 0, 0.26)',
    fontSize: '14px',
    lineHeight: '1.428571429',
    fontWeight: 400,
    display: 'inline-flex',
  },
  mrAuto: {
    marginRight: 'auto',
  },
  mlAuto: {
    marginLeft: 'auto',
  },
};

export default extendedFormsStyle;
