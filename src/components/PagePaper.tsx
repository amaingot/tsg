import * as React from 'react';

import Paper from '@material-ui/core/Paper';
import { StyleRulesCallback, withStyles, WithStyles } from '@material-ui/core/styles';

const styles: StyleRulesCallback = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
});

const PagePaper: React.FunctionComponent<{ children: React.ReactNode } & WithStyles> = props => {
  const { children, classes } = props;
  return <Paper className={classes.root}>{children}</Paper>;
};

export default withStyles(styles)(PagePaper);
