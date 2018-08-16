import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import React from 'react';

import TypographyStyle from 'styles/TypographyStyle';

interface InfoProps extends Partial<WithStyles> {
  classes: Record<string, string>;
}

const Info: React.SFC<InfoProps> = props => {
  const { classes, children } = props;
  return <div className={classes.defaultFontStyle + ' ' + classes.infoText}>{children}</div>;
};

export default withStyles(TypographyStyle)(Info);
