import classNames from 'classnames';
import * as React from 'react';

import Paper, { PaperProps } from '@material-ui/core/Paper';
import { makeStyles } from '../utils/Theme';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  withPadding: {
    padding: theme.spacing(3),
  },
  fullHeight: {
    height: '100%',
  },
}));

interface Props extends PaperProps {
  children: React.ReactNode;
  withPadding?: boolean;
  fullHeight?: boolean;
}

const PagePaper: React.FC<Props> = props => {
  const { children, withPadding, fullHeight, ...rest } = props;
  const classes = useStyles();


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

export default PagePaper;
