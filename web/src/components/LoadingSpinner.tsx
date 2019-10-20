import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  fullPageContainer: {
    position: "fixed",
    top: 0,
    left: 0,
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  normalContainer: {
    position: "relative",
    width: "100%",
    height: "100%",
    minHeight: "50vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
});

interface Props {
  fullPage?: boolean;
}

const LoadingSpinner: React.FC<Props> = props => {
  const { fullPage = false } = props;

  const classes = useStyles();

  return (
    <div
      className={fullPage ? classes.fullPageContainer : classes.normalContainer}
    >
      <CircularProgress size="6rem" />
    </div>
  );
};

export default LoadingSpinner;
