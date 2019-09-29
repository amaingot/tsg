import classNames from 'classnames';
import * as React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { useSiteLayoutStyles } from '../layouts/SiteLayout';
import { makeStyles } from '../utils/Theme';

const useStyles = makeStyles(theme => ({
  footer: {
    marginTop: theme.spacing(8),
    borderTop: `1px solid ${theme.palette.divider}`,
    padding: `${theme.spacing(6)} 0`,
  },
}));

interface FooterItem {
  title: string;
  description: string[];
}

const footers: FooterItem[] = [
  {
    title: 'Company',
    description: ['Team', 'History', 'Contact us', 'Locations'],
  },
  {
    title: 'Features',
    description: ['Cool stuff', 'Random feature', 'Team feature', 'Developer stuff', 'Another one'],
  },
  {
    title: 'Resources',
    description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
  },
  {
    title: 'Legal',
    description: ['Privacy policy', 'Terms of use'],
  },
];


const SiteFooter: React.FC = () => {
  const classes = useStyles();
  const siteLayoutClasses = useSiteLayoutStyles();

  return (
    <footer className={classNames(classes.footer, siteLayoutClasses.layout)}>
      <Grid container spacing={10} justify="space-evenly">
        {footers.map(footer => (
          <Grid item xs key={footer.title}>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              {footer.title}
            </Typography>
            {footer.description.map(item => (
              <Typography key={item} variant="subtitle1" color="textSecondary">
                {item}
              </Typography>
            ))}
          </Grid>
        ))}
      </Grid>
    </footer>
  );
};

export default SiteFooter;
