import { createMuiTheme, responsiveFontSizes, makeStyles as muiMakeStyles } from '@material-ui/core/styles';
import { Styles } from '@material-ui/styles/withStyles';

export const Theme = responsiveFontSizes(createMuiTheme({}));

export const makeStyles = <Props extends {} = {}>(styles: Styles<typeof Theme, Props>) => muiMakeStyles<typeof Theme, Props>(styles);