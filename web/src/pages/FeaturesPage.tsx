import React from "react";
import { RouteComponentProps } from "react-router";

import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import { makeStyles } from "@material-ui/core/styles";

import HomeNavBar from "../components/HomeNavBar";
import Footer from "../components/Footer";

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

const FeaturesPage: React.FC<RouteComponentProps> = () => {
  const classes = useStyles();

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
          Features
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
      <Footer />
    </React.Fragment>
  );
};

export default FeaturesPage;
