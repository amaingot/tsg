import classNames from 'classnames';
import * as React from 'react';

import Paper from '@material-ui/core/Paper';
import { StyleRulesCallback, withStyles, WithStyles } from '@material-ui/core/styles';

const styles: StyleRulesCallback = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  withPadding: {
    padding: theme.spacing.unit * 4,
  },
});

interface Props extends WithStyles {
  children: React.ReactNode;
  withPadding?: boolean;
}

const PagePaper: React.FunctionComponent<Props> = props => {
  const { children, classes, withPadding } = props;

  const paperClasses = classNames(classes.root, {
    [classes.withPadding]: withPadding,
  });

  return <Paper className={paperClasses}>{children}</Paper>;
};

export default withStyles(styles)(PagePaper);
