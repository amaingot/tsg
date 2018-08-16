import withStyles, { StyleRules, WithStyles } from '@material-ui/core/styles/withStyles';
import React from 'react';

const style: StyleRules<string> = {
  root: {
    '&:after,&:before': {
      display: 'table',
      content: '" "',
    },
    '&:after': {
      clear: 'both',
    },
  },
};

interface ClearfixProps extends Partial<WithStyles> {
  classes: Record<string, string>;
}

const Clearfix: React.SFC<ClearfixProps> = props => {
  const { classes } = props;
  return <div className={classes.root} />;
};

export default withStyles(style)(Clearfix);
