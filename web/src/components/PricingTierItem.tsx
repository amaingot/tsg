import React from 'react';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import StarIcon from '@material-ui/icons/StarBorder';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  cardHeader: {
    backgroundColor: theme.palette.grey[200],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
}));

export interface PricingTierItemProps {
  title: string;
  subheader?: string;
  price: string;
  description: string[];
  buttonText: string;
  buttonVariant?: 'text' | 'outlined' | 'contained';
}

const PricingTierItem: React.FC<PricingTierItemProps> = props => {
  const classes = useStyles();
  const { title, price, description, buttonVariant, buttonText, subheader } = props;

  return (
    <Grid item key={title} xs={12} sm={title === 'Enterprise' ? 12 : 6} md={4}>
      <Card>
        <CardHeader
          title={title}
          subheader={subheader}
          titleTypographyProps={{ align: 'center' }}
          subheaderTypographyProps={{ align: 'center' }}
          action={title === 'Pro' ? <StarIcon /> : null}
          className={classes.cardHeader}
        />
        <CardContent>
          <div className={classes.cardPricing}>
            <Typography component="h2" variant="h3" color="textPrimary">
              ${price}
            </Typography>
            <Typography variant="h6" color="textSecondary">
              /mo
          </Typography>
          </div>
          <ul>
            {description.map(line => (
              <Typography component="li" variant="subtitle1" align="center" key={line}>
                {line}
              </Typography>
            ))}
          </ul>
        </CardContent>
        <CardActions>
          <Button fullWidth variant={buttonVariant} color="primary">
            {buttonText}
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );

};

export default PricingTierItem;