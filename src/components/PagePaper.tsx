import classNames from 'classnames';
import * as React from 'react';

import Paper, { PaperProps } from '@material-ui/core/Paper';
import { StyleRulesCallback, withStyles, WithStyles } from '@material-ui/core/styles';

const styles: StyleRulesCallback<'root' | 'withPadding' | 'fullHeight'> = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  withPadding: {
    padding: theme.spacing.unit * 3,
  },
  fullHeight: {
    height: '100%',
  },
});

interface Props extends PaperProps {
  children: React.ReactNode;
  withPadding?: boolean;
  fullHeight?: boolean;
}

const PagePaper: React.FunctionComponent<Props & WithStyles<typeof styles>> = props => {
  const { children, classes, withPadding, fullHeight, ...rest } = props;

  const paperClasses = classNames(classes.root, {
    [classes.withPadding]: withPadding,
    [classes.fullHeight]: fullHeight,
  });

  return (
    <Paper {...rest} className={paperClasses}>
      {children}
    </Paper>
  );
};

export default withStyles(styles)(PagePaper);
