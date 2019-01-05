import React from 'react';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';

import typographyStyle from 'styles/jss/components/typographyStyle';
import { CommonProps } from 'utils/commonProps';

const Danger: React.SFC<CommonProps> = ({ ...props }) => {
  const { classes, children } = props;
  return <div className={classes.defaultFontStyle + ' ' + classes.dangerText}>{children}</div>;
};

export default withStyles(typographyStyle)(Danger);
