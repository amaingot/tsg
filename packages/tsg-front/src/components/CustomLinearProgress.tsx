import React from 'react';

// @material-ui/core components
import LinearProgress from '@material-ui/core/LinearProgress';
import withStyles from '@material-ui/core/styles/withStyles';

import customLinearProgressStyle from 'styles/jss/components/customLinearProgressStyle';

function CustomLinearProgress({ ...props }) {
  const { classes, color, ...rest } = props;
  return (
    <LinearProgress
      {...rest}
      classes={{
        root: classes.root + ' ' + classes[color + 'Background'],
        bar: classes.bar + ' ' + classes[color],
      }}
    />
  );
}

CustomLinearProgress.defaultProps = {
  color: 'gray',
};

CustomLinearProgress.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(['primary', 'warning', 'danger', 'success', 'info', 'rose', 'gray']),
};

export default withStyles(customLinearProgressStyle)(CustomLinearProgress);
