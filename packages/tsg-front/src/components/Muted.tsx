import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import React from 'react';

import TypographyStyle from 'styles/TypographyStyle';

interface MutedProps extends Partial<WithStyles> {
  classes: Record<string, string>;
  children: React.ReactNode;
}

const Muted: React.SFC<MutedProps> = props => {
  const { classes, children } = props;
  return <div className={classes.defaultFontStyle + ' ' + classes.mutedText}>{children}</div>;
};

export default withStyles(TypographyStyle)(Muted);
