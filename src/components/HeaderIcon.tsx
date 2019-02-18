import * as React from 'react';

import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
// import green from '@material-ui/core/colors/green';
import withStyles, { StyleRulesCallback, WithStyles } from '@material-ui/core/styles/withStyles';
import { SvgIconProps } from '@material-ui/core/SvgIcon';

const iconSize = 72;

const styles: StyleRulesCallback = theme => ({
  avatar: {
    margin: theme.spacing.unit,
    height: `${iconSize - theme.spacing.unit}px`,
    width: `${iconSize - theme.spacing.unit}px`,
  },
  icon: {
    fontSize: `${iconSize / 2}px`,
  },
  progress: {
    // color: green[500],
    position: 'absolute',
    left: `calc(50% - ${iconSize / 2}px)`,
    marginTop: `-${iconSize + theme.spacing.unit / 2}px`,
  },
});

interface HeaderIconProps extends WithStyles<typeof styles> {
  loading?: boolean;
  icon: React.ComponentType<SvgIconProps>;
}

const HeaderIcon: React.FunctionComponent<HeaderIconProps> = props => {
  const { classes, loading, icon: Icon } = props;
  return (
    <div>
      <Avatar className={classes.avatar}>
        <Icon className={classes.icon} />
      </Avatar>
      {loading && <CircularProgress size={iconSize} className={classes.progress} />}
    </div>
  );
};

export default withStyles(styles)(HeaderIcon);
