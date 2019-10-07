import React from "react";
import { RouteComponentProps } from "react-router";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

import { makeStyles } from "@material-ui/core/styles";

import HomeNavBar from "../components/HomeNavBar";
import Footer from "../components/Footer";
import PricingTierItem from "../components/PricingTierItem";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    },
    ul: {
      margin: 0,
      padding: 0
    },
    li: {
      listStyle: "none"
    }
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6)
  }
}));

const PricingPage: React.FC<RouteComponentProps> = props => {
  const { history } = props;
  const classes = useStyles();

  const onClick = (tier: string) => () => {
    history.push("/sign-up", { tier });
  };

  return (
    <React.Fragment>
      <HomeNavBar />
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Pricing
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="textSecondary"
          component="p"
        >
          Quickly build an effective pricing table for your potential customers
          with this layout. It&apos;s built with default Material-UI components
          with little customization.
        </Typography>
      </Container>
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          <PricingTierItem
            title="Free"
            price="0"
            description={[
              "2 users included",
              "100 customers",
              "Help center access",
              "Email support"
            ]}
            buttonText="Sign up for free"
            buttonVariant="outlined"
            onClick={onClick("free")}
          />
          <PricingTierItem
            title="Pro"
            subheader="Most popular"
            price="30"
            description={[
              "20 users included",
              "500 customers",
              "Help center access",
              "Priority email support"
            ]}
            buttonText="Get started"
            buttonVariant="contained"
            onClick={onClick("pro-plus")}
          />
          <PricingTierItem
            title="Pro Plus"
            price="80"
            description={[
              "50 users included",
              "3,000 customers",
              "Help center access",
              "Phone & email support"
            ]}
            buttonText="Contact us"
            buttonVariant="outlined"
            onClick={onClick("pro-plus")}
          />
        </Grid>
      </Container>
      <Footer />
    </React.Fragment>
  );
};

export default PricingPage;
