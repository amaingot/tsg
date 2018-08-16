import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';
import React from 'react';

import CardFooterStyle from 'styles/CardFooterStyle';

interface CardFooterProps extends Partial<WithStyles> {
  classes: Record<string, string>;
  className?: string;
}

const CardFooter: React.SFC<CardFooterProps> = props => {
  const { classes, className, children, ...rest } = props;
  const cardFooterClasses = classNames({
    [classes.root]: true,
    [className || '']: className !== undefined,
  });
  return (
    <div className={cardFooterClasses} {...rest}>
      {children}
    </div>
  );
};

export default withStyles(CardFooterStyle)(CardFooter);
