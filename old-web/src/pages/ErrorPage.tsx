import React from "react";
import { RouteComponentProps } from "react-router";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import ErrorIcon from "@material-ui/icons/Error";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(10),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  button: {
    margin: theme.spacing(2, 0, 0, 0)
  }
}));

const ErrorPage: React.FC<RouteComponentProps> = props => {
  const classes = useStyles();
  const { history } = props;

  const goToSupport = () => {
    history.push("/support");
  };
  const goBack = () => {
    history.push("/");
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <ErrorIcon />
        </Avatar>
        <Typography variant="h4" gutterBottom>
          Uh, oh! :(
        </Typography>

        <Typography variant="caption" gutterBottom>
          Looks like there has been an error! We will be looking into this
          shortly. If this continues to occur, please file a support ticket.
        </Typography>
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={goToSupport}
        >
          File a Support Ticket
        </Button>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={goBack}
        >
          Go Home
        </Button>
      </div>
    </Container>
  );
};

export default ErrorPage;
