// ##############################
// // // SweetAlert view styles
// #############################

import { StyleRules } from '@material-ui/core/styles';
import buttonStyle from 'src/styles/jss/components/buttonStyle';

const sweetAlertStyle: StyleRules<string> = {
  cardTitle: {
    marginTop: '0',
    marginBottom: '3px',
    color: '#3C4858',
    fontSize: '18px',
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
  ...buttonStyle,
};

export default sweetAlertStyle;
