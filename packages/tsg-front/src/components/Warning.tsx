import React from 'react';

import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import TypographyStyle from 'styles/TypographyStyle';

interface WarningProps extends Partial<WithStyles> {
  classes: Record<string, string>;
  children: React.ReactNode;
}
const Warning: React.SFC<WarningProps> = props => {
  const { classes, children } = props;
  return <div className={classes.defaultFontStyle + ' ' + classes.warningText}>{children}</div>;
};

export default withStyles(TypographyStyle)(Warning);
