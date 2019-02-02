import * as React from 'react';

import LinearProgress from '@material-ui/core/LinearProgress';
import withStyles from '@material-ui/core/styles/withStyles';

import customLinearProgressStyle from 'src/styles/jss/components/customLinearProgressStyle';
import { CommonProps } from 'src/utils/commonProps';

interface Props extends CommonProps {
  color?: 'primary' | 'warning' | 'danger' | 'success' | 'info' | 'rose' | 'gray';
}

const CustomLinearProgress: React.SFC<Props> = ({ ...props }) => {
  const { classes, color, ...rest } = props;

  return (
    <LinearProgress
      {...rest}
      classes={{
        root: classes.root + ' ' + classes[(color || 'gray') + 'Background'],
        bar: classes.bar + ' ' + classes[color || 'gray'],
      }}
    />
  );
};

CustomLinearProgress.defaultProps = {
  color: 'gray',
};

export default withStyles(customLinearProgressStyle)(CustomLinearProgress);
