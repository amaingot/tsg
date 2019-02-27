import { StyleRulesCallback } from '@material-ui/core/styles/withStyles';

const createDialogStyles: StyleRulesCallback<'fab' | 'button'> = theme => ({
  fab: {
    position: 'absolute',
    right: `${theme.spacing.unit * 3}px`,
    marginTop: `-${theme.spacing.unit * 6}px`,
  },
  button: {
    marginLeft: theme.spacing.unit,
  },
});

export default createDialogStyles;
