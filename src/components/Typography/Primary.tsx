import * as React from 'react';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';

import typographyStyle from 'src/styles/jss/components/typographyStyle';
import { CommonProps } from 'src/utils/commonProps';

const Primary: React.SFC<CommonProps> = ({ ...props }) => {
  const { classes, children } = props;
  return <div className={classes.defaultFontStyle + ' ' + classes.primaryText}>{children}</div>;
};

export default withStyles(typographyStyle)(Primary);
