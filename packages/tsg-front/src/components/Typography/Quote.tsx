import React from 'react';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';

import typographyStyle from 'styles/jss/components/typographyStyle';
import { CommonProps } from 'utils/commonProps';

interface Props extends CommonProps {
  text: React.ReactNode;
  author: React.ReactNode;
}

function Quote(props: Props) {
  const { classes, text, author } = props;
  return (
    <blockquote className={classes.defaultFontStyle + ' ' + classes.quote}>
      <p className={classes.quoteText}>{text}</p>
      <small className={classes.quoteAuthor}>{author}</small>
    </blockquote>
  );
}

export default withStyles(typographyStyle)(Quote);
