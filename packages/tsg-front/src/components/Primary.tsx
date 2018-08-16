import React from 'react';

import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import TypographyStyle from 'styles/TypographyStyle';

interface PrimaryProps extends Partial<WithStyles> {
  classes: Record<string, string>;
}

const Primary: React.SFC<PrimaryProps> = props => {
  const { classes, children } = props;
  return <div className={classes.defaultFontStyle + ' ' + classes.primaryText}>{children}</div>;
};

export default withStyles(TypographyStyle)(Primary);
