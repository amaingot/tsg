import * as React from 'react';

import Grid from '@material-ui/core/Grid';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import Typography from '@material-ui/core/Typography';

const styles: StyleRulesCallback<'iconContainer' | 'root'> = theme => ({
  root: {
    margin: `${theme.spacing.unit}px 0`,
  },
  iconContainer: {
    marginRight: theme.spacing.unit,
  },
});

interface CustomFactProps extends WithStyles<typeof styles> {
  label: string;
  icon: React.ComponentType<SvgIconProps>;
  value?: string | null;
  type?: 'phone' | 'email';
}

const CustomFact: React.SFC<CustomFactProps> = props => {
  const { label, icon: Icon, value, classes } = props;
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

export default withStyles(styles)(CustomFact);
