import classNames from 'classnames';
import * as React from 'react';

import Grid from '@material-ui/core/Grid';
import { StyleRulesCallback, WithStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { siteLayoutStyles } from 'src/layouts/SiteLayout';

const styles: StyleRulesCallback = theme => ({
  ...siteLayoutStyles(theme),
  footer: {
    marginTop: theme.spacing.unit * 8,
    borderTop: `1px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit * 6}px 0`,
  },
});

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

type SiteFooterProps = WithStyles;

const SiteFooter: React.FunctionComponent<SiteFooterProps> = props => {
  const { classes } = props;

  return (
    <footer className={classNames(classes.footer, classes.layout)}>
      <Grid container spacing={32} justify="space-evenly">
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

export default withStyles(styles)(SiteFooter);
