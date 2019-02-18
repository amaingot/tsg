import * as React from 'react';

import { PropTypes, StyleRulesCallback, WithStyles, withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const styles: StyleRulesCallback = theme => ({
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
});

interface HeroProps extends WithStyles {
  title: string;
  description: string;
  action?: React.ReactNode;
  align?: PropTypes.Alignment;
}

const Hero: React.FunctionComponent<HeroProps> = props => {
  const { classes, title, description, action, align = 'center' } = props;

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

export default withStyles(styles)(Hero);
