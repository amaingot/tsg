import React from "react";
import clsx from "clsx";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  fullPageContainer: {
    position: "fixed",
    top: 0,
    left: 0,
    height: "100vh",
    width: "100vw"
  },
  normalContainer: {
    position: "relative",
    width: "100%",
    height: "100%"
  },
  withMinHeight: {
    minHeight: "50vh"
  }
});

type SpinnerSize = "sm" | "md" | "lg";

interface Props {
  fullPage?: boolean;
  minHeight?: boolean;
  size?: SpinnerSize;
}

const LoadingSpinner: React.FC<Props> = props => {
  const { minHeight = false, fullPage = false, size = "md" } = props;

  const classes = useStyles();

  const style = clsx(
    classes.container,
    fullPage ? classes.fullPageContainer : classes.normalContainer,
    minHeight && classes.withMinHeight
  );

  let progressSize = "4rem";

  if (size === "sm") {
    progressSize = "2rem";
  }

  if (size === "lg") {
    progressSize = "6rem";
  }

  return (
    <div className={style}>
      <CircularProgress size={progressSize} />
    </div>
  );
};

export default LoadingSpinner;
