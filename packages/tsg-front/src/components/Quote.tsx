import React from 'react';

import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import TypographyStyle from 'styles/TypographyStyle';

interface QuoteProps extends Partial<WithStyles> {
  classes: Record<string, string>;
  text?: React.ReactNode;
  author?: React.ReactNode;
}

const Quote: React.SFC<QuoteProps> = props => {
  const { classes, text, author } = props;
  return (
    <blockquote className={classes.defaultFontStyle + ' ' + classes.quote}>
      <p className={classes.quoteText}>{text}</p>
      <small className={classes.quoteAuthor}>{author}</small>
    </blockquote>
  );
};

export default withStyles(TypographyStyle)(Quote);
