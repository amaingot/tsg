import * as React from 'react';

import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import { SvgIconProps } from '@material-ui/core/SvgIcon';

import { makeStyles } from '../utils/Theme';

const iconSize = 72;

const useStyles = makeStyles(theme => ({
  avatar: {
    margin: theme.spacing(1),
    height: `${iconSize - theme.spacing(1)}px`,
    width: `${iconSize - theme.spacing(1)}px`,
  },
  icon: {
    fontSize: `${iconSize / 2}px`,
  },
  progress: {
    position: 'absolute',
    left: `calc(50% - ${iconSize / 2}px)`,
    marginTop: `-${iconSize + theme.spacing(1) / 2}px`,
  },
}));

interface HeaderIconProps {
  loading?: boolean;
  icon: React.ComponentType<SvgIconProps>;
}

const HeaderIcon: React.FC<HeaderIconProps> = props => {
  const { loading, icon: Icon } = props;
  const classes = useStyles();

  return (
    <div>
      <Avatar className={classes.avatar}>
        <Icon className={classes.icon} />
      </Avatar>
      {loading && <CircularProgress size={iconSize} className={classes.progress} />}
    </div>
  );
};

export default HeaderIcon;
