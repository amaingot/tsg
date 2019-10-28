import React from "react";
import { RouteComponentProps } from "react-router";
import axios from "axios";
import queryString from "query-string";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import Copyright from "../components/Copyright";
import { ApiBaseURL } from "../utils/axios";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

interface Props extends RouteComponentProps {
  email: string;
}

const SignUpConfirmPage: React.FC<Props> = props => {
  const classes = useStyles();
  const { history } = props;

  const { search } = props.location;
  const searchValues = queryString.parse(search);
  const { id, code } = searchValues;

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string>();
  const [email, setEmail] = React.useState<string>();

  const confirmAccount = React.useCallback(async () => {
    if (typeof id !== "string" || typeof code !== "string") {
      history.push("/login");
      return;
    }

    setLoading(true);
    setError(undefined);

    const response = await axios({
      url: "/signup/confirm",
      baseURL: ApiBaseURL,
      method: "POST",
      data: {
        id,
        code
      }
    });
    if (response.status !== 200) {
      setError(response.data["message"]);
      window.Rollbar.error(response);
    } else {
      setEmail(response.data.email);
    }

    setLoading(false);
  }, [id, code, history]);

  const visitLogin = () => {
    history.push("/login", { email });
  };

  React.useEffect(() => {
    confirmAccount();
  }, [confirmAccount]);

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Thank you for verifying your account!
        </Typography>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={visitLogin}
          disabled={!!error || !email || loading}
        >
          Login In To Your Account
        </Button>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default SignUpConfirmPage;
