import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import React from 'react';

import TypographyStyle from 'styles/TypographyStyle';

interface DangerProps extends Partial<WithStyles> {
  classes: Record<string, string>;
}

const Danger: React.SFC<DangerProps> = props => {
  const { classes, children } = props;
  return <div className={classes.defaultFontStyle + ' ' + classes.dangerText}>{children}</div>;
};

export default withStyles(TypographyStyle)(Danger);
