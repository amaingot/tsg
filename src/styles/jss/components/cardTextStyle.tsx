import { StyleRules } from '@material-ui/core/styles';
import {
  dangerCardHeader,
  infoCardHeader,
  primaryCardHeader,
  roseCardHeader,
  successCardHeader,
  warningCardHeader,
} from 'src/styles/jss/material-dashboard-pro-react';

const cardTextStyle: StyleRules<string> = {
  cardText: {
    float: 'none',
    display: 'inline-block',
    marginRight: '0',
    borderRadius: '3px',
    backgroundColor: '#999999',
    padding: '15px',
    marginTop: '-20px',
  },
  warningCardHeader,
  successCardHeader,
  dangerCardHeader,
  infoCardHeader,
  primaryCardHeader,
  roseCardHeader,
};

export default cardTextStyle;
