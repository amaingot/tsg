import React from "react";
import { RouteComponentProps } from "react-router";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  }
}));

const SupportPage: React.FC<RouteComponentProps> = () => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Support
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <script
              type="text/javascript"
              src="https://s3.amazonaws.com/assets.freshdesk.com/widget/freshwidget.js"
            ></script>
            <style type="text/css" media="screen, projection">
              @import
              url(https://s3.amazonaws.com/assets.freshdesk.com/widget/freshwidget.css);
            </style>
            <iframe
              title="Feedback Form"
              className="freshwidget-embedded-form"
              id="freshwidget-embedded-form"
              src="https://maingot.freshdesk.com/widgets/feedback_widget/new?&widgetType=embedded&formTitle=File+a+Ticket&submitTitle=Submit+a+Ticket&submitThanks=Thank+you+for+reaching+out!+We+will+get+back+to+you+soon!&screenshot=No&searchArea=no&captcha=yes"
              scrolling="no"
              height="500px"
              width="100%"
              frameBorder="0"
            ></iframe>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default SupportPage;
