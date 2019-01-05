import React from 'react';

import withStyles, { StyleRules } from '@material-ui/core/styles/withStyles';
import { CommonProps } from 'utils/commonProps';

const style: StyleRules<string> = {
  clearfix: {
    '&:after,&:before': {
      display: 'table',
      content: '" "',
    },
    '&:after': {
      clear: 'both',
    },
  },
};

const Clearfix: React.SFC<CommonProps> = ({ ...props }) => {
  const { classes } = props;

  return <div className={classes.clearfix} />;
};

export default withStyles(style)(Clearfix);
