import React from 'react';

import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import TypographyStyle from 'styles/TypographyStyle';

interface SuccessProps extends Partial<WithStyles> {
  classes: Record<string, string>;
  children: React.ReactNode;
}
const Success: React.SFC<SuccessProps> = props => {
  const { classes, children } = props;
  return <div className={classes.defaultFontStyle + ' ' + classes.successText}>{children}</div>;
};

export default withStyles(TypographyStyle)(Success);
