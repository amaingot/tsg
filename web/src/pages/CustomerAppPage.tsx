import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  CircularProgress,
} from "@material-ui/core";

import Layout from "../components/Layout";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  gridContainer: {
    marginTop: 16,
  },
});

const CustomerAppPage: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const { loggedIn, loading } = useAuth();

  React.useEffect(() => {
    if (!loggedIn && !loading) {
      history.push("/login");
    }
  }, [loading, loggedIn, history]);

  if (loading) {
    return (
      <CircularProgress
        size={64}
        style={{ margin: "4rem auto", display: "block" }}
      />
    );
  }

  return (
    <Layout showDrawerNav>
      <Grid container spacing={4} className={classes.gridContainer}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="A Card" />
            <CardContent>
              <Typography>Some card content</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Another Card" />
            <CardContent>
              <Typography>Some more card content</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default CustomerAppPage;
