import React from 'react';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';

import typographyStyle from 'styles/jss/components/typographyStyle';

function Success({ ...props }) {
  const { classes, children } = props;
  return <div className={classes.defaultFontStyle + ' ' + classes.successText}>{children}</div>;
}

export default withStyles(typographyStyle)(Success);
