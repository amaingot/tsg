import React from 'react';

import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import TypographyStyle from 'styles/TypographyStyle';

interface SmallProps extends Partial<WithStyles> {
  classes: Record<string, string>;
  children: React.ReactNode;
}
const Small: React.SFC<SmallProps> = props => {
  const { classes, children } = props;
  return <div className={classes.defaultFontStyle + ' ' + classes.smallText}>{children}</div>;
};

export default withStyles(TypographyStyle)(Small);
