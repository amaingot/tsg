import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

import Copyright from "./Copyright";
import { APP_TITLE } from "../utils/constants";
import TopNavBar from "./TopNavBar";
import Footer from "./Footer";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: "wrap",
  },
  toolbarTitle: {
    flexGrow: 1,
    cursor: "pointer",
  },
  fullWidthLayout: {
    width: "auth",
    margin: theme.spacing(0, 0, 2, 0),
    padding: theme.spacing(0, 0, 2, 0),
  },
  footer: {
    margin: theme.spacing(2),
    marginTop: theme.spacing(6),
  },
  logo: {
    maxHeight: theme.spacing(6),
    marginRight: theme.spacing(2),
  },
  navButton: {
    leftMargin: theme.spacing(4),
  },
}));

interface Props {
  title?: string;
  showTopNav?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  fullWidth?: boolean;
  showFooter?: boolean;
}

const Layout: React.FC<Props> = (props) => {
  const classes = useStyles();
  const {
    title = "",
    showTopNav = true,
    size = "xl",
    fullWidth = false,
    showFooter = false,
  } = props;

  const pageTitle = `${APP_TITLE} ${title && `| ${title}`}`;

  React.useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  return (
    <React.Fragment>
      <CssBaseline />
      {showTopNav && <TopNavBar title={pageTitle} />}
      <Container
        maxWidth={size}
        component="main"
        className={(fullWidth && classes.fullWidthLayout) || undefined}
      >
        {props.children}
      </Container>
      <footer className={classes.footer}>
        {showFooter && <Footer />}
        <Copyright />
      </footer>
    </React.Fragment>
  );
};

export default Layout;
