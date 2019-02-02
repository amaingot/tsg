import * as React from 'react';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';

import badgeStyle from 'src/styles/jss/components/badgeStyle';
import { CommonProps } from 'src/utils/commonProps';

interface Props extends CommonProps {
  color?: 'primary' | 'warning' | 'danger' | 'success' | 'info' | 'rose' | 'gray';
  children?: React.ReactNode;
}

const Badge: React.SFC<Props> = (props: Props) => {
  const { classes, color, children } = props;

  return <span className={classes.badge + ' ' + classes[color || 'primary']}>{children}</span>;
};

export default withStyles(badgeStyle)(Badge);
