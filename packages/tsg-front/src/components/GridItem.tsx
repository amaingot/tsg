import React from 'react';

import Grid, { GridProps } from '@material-ui/core/Grid';
import withStyles, { StyleRules, WithStyles } from '@material-ui/core/styles/withStyles';

const style: StyleRules<string> = {
  grid: {
    position: 'relative',
    width: '100%',
    minHeight: '1px',
    paddingRight: '15px',
    paddingLeft: '15px',
    flexBasis: 'auto',
  },
};

interface GridItemProps extends Partial<WithStyles> {
  classes: Record<string, string>;
  className?: string;
  children?: React.ReactNode;
}

const GridItem: React.SFC<GridItemProps & GridProps> = props => {
  const { classes, children, className, ...rest } = props;
  return (
    <Grid item {...rest} className={classes.grid + ' ' + className}>
      {children}
    </Grid>
  );
};

export default withStyles(style)(GridItem);
