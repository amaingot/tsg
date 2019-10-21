import React from "react";
import { RouteComponentProps } from "react-router";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import BuildIcon from "@material-ui/icons/Build";
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

const ComingSoonPage: React.FC<RouteComponentProps> = props => {
  const classes = useStyles();
  const { history } = props;

  const goBack = () => {
    history.goBack();
  };
  const goHome = () => {
    history.push("/");
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <BuildIcon />
        </Avatar>
        <Typography variant="h4" gutterBottom>
          Coming Soon!
        </Typography>

        <Typography variant="caption" gutterBottom>
          Looks like you found something that I'm working on! Check back soon
          for all of the future progress!
        </Typography>
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={goHome}
        >
          Go Home
        </Button>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={goBack}
        >
          Go Back
        </Button>
      </div>
    </Container>
  );
};

export default ComingSoonPage;
