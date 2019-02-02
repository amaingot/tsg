import { StyleRules } from '@material-ui/core/styles';
import {
  dangerCardHeader,
  infoCardHeader,
  primaryCardHeader,
  roseCardHeader,
  successCardHeader,
  warningCardHeader,
} from 'src/styles/jss/material-dashboard-pro-react';

const cardIconStyle: StyleRules<string> = {
  cardIcon: {
    '&$warningCardHeader,&$successCardHeader,&$dangerCardHeader,&$infoCardHeader,&$primaryCardHeader,&$roseCardHeader': {
      borderRadius: '3px',
      backgroundColor: '#999',
      padding: '15px',
      marginTop: '-20px',
      marginRight: '15px',
      float: 'left',
    },
  },
  warningCardHeader,
  successCardHeader,
  dangerCardHeader,
  infoCardHeader,
  primaryCardHeader,
  roseCardHeader,
};

export default cardIconStyle;
