import * as React from 'react';

// @material-ui/core components
import Grid, { GridProps } from '@material-ui/core/Grid';
import withStyles, { StyleRules } from '@material-ui/core/styles/withStyles';
import { CommonProps } from 'src/utils/commonProps';

const style: StyleRules<string> = {
  grid: {
    margin: '0 -15px',
    width: 'calc(100% + 30px)',
    // '&:before,&:after':{
    //   display: 'table',
    //   content: '" "',
    // },
    // '&:after':{
    //   clear: 'both',
    // }
  },
};

const GridContainer: React.SFC<CommonProps & GridProps> = ({ ...props }) => {
  const { classes, children, className, ...rest } = props;
  return (
    <Grid container {...rest} className={classes.grid + ' ' + className}>
      {children}
    </Grid>
  );
};

export default withStyles(style)(GridContainer);
