// ##############################
// // // RegularForms view styles
// #############################

import { StyleRules } from '@material-ui/core/styles';
import customCheckboxRadioSwitch from 'styles/jss/customCheckboxRadioSwitch';
import { cardTitle, dangerColor, successColor } from 'styles/jss/material-dashboard-pro-react';

const regularFormsStyle: StyleRules<string> = {
  ...customCheckboxRadioSwitch,
  cardIconTitle: {
    ...cardTitle,
    marginTop: '15px',
    marginBottom: '0px',
  },
  staticFormGroup: {
    marginLeft: '0',
    marginRight: '0',
    paddingBottom: '10px',
    margin: '8px 0 0 0',
    position: 'relative',
    '&:before,&:after': {
      display: 'table',
      content: '" "',
    },
    '&:after': {
      clear: 'both',
    },
  },
  staticFormControl: {
    marginBottom: '0',
    paddingTop: '8px',
    paddingBottom: '8px',
    minHeight: '34px',
  },
  inputAdornment: {
    marginRight: '8px',
    position: 'relative',
  },
  inputAdornmentIconSuccess: {
    color: successColor + '!important',
  },
  inputAdornmentIconError: {
    color: dangerColor + '!important',
  },
};

export default regularFormsStyle;