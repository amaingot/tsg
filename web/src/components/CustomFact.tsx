import * as React from 'react';

import Grid from '@material-ui/core/Grid';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '../utils/Theme';

const useStyles = makeStyles(theme => ({
  root: {
    margin: `${theme.spacing(1)}px 0`,
  },
  iconContainer: {
    marginRight: theme.spacing(1),
  },
}));

interface CustomFactProps {
  label: string;
  icon: React.ComponentType<SvgIconProps>;
  value?: string | null;
  type?: 'phone' | 'email';
}

const CustomFact: React.FC<CustomFactProps> = props => {
  const { label, icon: Icon, value } = props;
  const classes = useStyles();

  if (!value) {
    return null;
  }
  return (
    <Grid container aria-label={label} className={classes.root}>
      <Grid item className={classes.iconContainer}>
        <Icon color="primary" />
      </Grid>
      <Grid item>
        <Typography variant="body2">{value}</Typography>
      </Grid>
    </Grid>
  );
};

export default CustomFact;
