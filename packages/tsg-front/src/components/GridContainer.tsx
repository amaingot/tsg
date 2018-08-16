import React from 'react';

import Grid, { GridProps } from '@material-ui/core/Grid';
import withStyles, { StyleRules, WithStyles } from '@material-ui/core/styles/withStyles';

const style: StyleRules<string> = {
  grid: {
    marginRight: '-15px',
    marginLeft: '-15px',
    width: 'auto',
  },
};

interface GridContainerProps extends Partial<WithStyles> {
  classes: Record<string, string>;
  className?: string;
  children?: React.ReactNode;
}

const GridContainer: React.SFC<GridContainerProps & GridProps> = props => {
  const { classes, children, className, ...rest } = props;
  return (
    <Grid container {...rest} className={classes.grid + ' ' + className}>
      {children}
    </Grid>
  );
};

export default withStyles(style)(GridContainer);
