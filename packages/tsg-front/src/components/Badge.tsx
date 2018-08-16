import React from 'react';

import { WithTheme } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';

import BadgeStyle from 'styles/BadgeStyle';
import { Color } from 'styles/Theme';

interface BadgeProps {
  classes: Record<string, string>;
  color?: Color;
}

const Badge: React.SFC<BadgeProps & Partial<WithTheme>> = props => {
  const { classes, color, children } = props;
  return <span className={classes.badge + ' ' + classes[color || 'gray']}>{children}</span>;
};

export default withStyles(BadgeStyle)(Badge);
