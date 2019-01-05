import React from 'react';

// @material-ui/core components
import Grid, { GridProps } from '@material-ui/core/Grid';
import withStyles, { StyleRules } from '@material-ui/core/styles/withStyles';
import { CommonProps } from 'utils/commonProps';

const style: StyleRules<string> = {
  grid: {
    padding: '0 15px !important',
  },
};

const GridItem: React.SFC<CommonProps & GridProps> = ({ ...props }) => {
  const { classes, children, className, ...rest } = props;
  return (
    <Grid item {...rest} className={classes.grid + ' ' + className}>
      {children}
    </Grid>
  );
};

export default withStyles(style)(GridItem);
