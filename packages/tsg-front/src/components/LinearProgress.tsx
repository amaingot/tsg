import React from 'react';

import { WithTheme } from '@material-ui/core';
import MuiLinearProgress from '@material-ui/core/LinearProgress';
import withStyles from '@material-ui/core/styles/withStyles';

import LinearProgressStyle from 'styles/LinearProgressStyle';
import { Color } from 'styles/Theme';

interface LinearProgressProps {
  classes: Record<string, string>;
  color?: Color;
}

const LinearProgress: React.SFC<LinearProgressProps & Partial<WithTheme>> = props => {
  const { classes, color, ...rest } = props;
  return (
    <MuiLinearProgress
      {...rest}
      classes={{
        root: classes.root + ' ' + classes[color + 'Background'],
        bar: classes.bar + ' ' + classes[color || 'gray'],
      }}
    />
  );
};

export default withStyles(LinearProgressStyle)(LinearProgress);
