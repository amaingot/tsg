import * as React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';

const styles: StyleRulesCallback<'actions'> = theme => ({
  actions: {
    margin: theme.spacing.unit,
  },
});

interface ModalProps {
  open: boolean;
  close: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  actions?: React.ReactNode;
}

const Modal: React.FunctionComponent<ModalProps & WithStyles<typeof styles>> = props => {
  const { open, close, title, description, children, actions, classes } = props;
  return (
    <Dialog open={open} onClose={close}>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>
        {description && <DialogContentText>{description}</DialogContentText>}
        {children}
      </DialogContent>
      {actions && <DialogActions className={classes.actions}>{actions}</DialogActions>}
    </Dialog>
  );
};

export default withStyles(styles)(Modal);
