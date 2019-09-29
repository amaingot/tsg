import { makeStyles } from './Theme';

const useDialogStyles = makeStyles(theme => ({
  fab: {
    position: 'absolute',
    right: `${theme.spacing(3)}px`,
    marginTop: `-${theme.spacing(6)}px`,
  },
  button: {
    marginLeft: theme.spacing(1),
  },
}));

export default useDialogStyles;
