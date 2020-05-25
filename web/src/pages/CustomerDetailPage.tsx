import React from "react";

import {
  makeStyles,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles({
  gridContainer: {
    // marginTop: 16,
  },
});

const CustomerDetailPage: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Customer Detail
      </Typography>
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
    </>
  );
};

export default CustomerDetailPage;
