import * as React from 'react';

import { PropTypes } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '../utils/Theme';

const useStyles = makeStyles(theme => ({
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing(8)}px 0 ${theme.spacing(6)}px`,
  },
}));

interface HeroProps {
  title: string;
  description: string;
  action?: React.ReactNode;
  align?: PropTypes.Alignment;
}

const Hero: React.FC<HeroProps> = props => {
  const { title, description, action, align = 'center' } = props;
  const classes = useStyles();

  return (
    <div className={classes.heroContent}>
      <Typography component="h1" variant="h2" align={align} color="textPrimary" gutterBottom>
        {title}
      </Typography>
      <Typography variant="h6" align={align} color="textSecondary" component="p">
        {description}
      </Typography>
      {action}
    </div>
  );
};

export default Hero;
