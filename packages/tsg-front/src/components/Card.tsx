import { WithTheme } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';
import React from 'react';

import CardStyle from 'styles/CardStyle';

interface CardProps {
  classes: Record<string, string>;
  className?: string;
  plain?: boolean;
  carousel?: boolean;
}

const Card: React.SFC<CardProps & Partial<WithTheme>> = props => {
  const { classes, className, children, plain, carousel, ...rest } = props;
  const cardClasses = classNames({
    [classes.root]: true,
    [classes.cardPlain]: plain,
    [classes.cardCarousel]: carousel,
    [className || '']: className !== undefined,
  });
  return (
    <div className={cardClasses} {...rest}>
      {children}
    </div>
  );
};

export default withStyles(CardStyle)(Card);
