import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

import { COPYRIGHT_OWNERS } from "../utils/constants";

export default function Copyright() {
  return (
    <>
      <Typography
        variant="body2"
        color="textSecondary"
        align="center"
        gutterBottom
      >
        {"Copyright © "}
        <Link color="inherit" href="https://hmm.dev/">
          {COPYRIGHT_OWNERS}
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </>
  );
}
