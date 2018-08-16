import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';
import React from 'react';

import CardBodyStyle from 'styles/CardBodyStyle';

interface CardBodyProps extends Partial<WithStyles> {
  classes: Record<string, string>;
  className?: string;
}

const CardBody: React.SFC<CardBodyProps> = props => {
  const { classes, className, children, ...rest } = props;
  const cardBodyClasses = classNames({
    [classes.root]: true,
    [className || '']: className !== undefined,
  });
  return (
    <div className={cardBodyClasses} {...rest}>
      {children}
    </div>
  );
};

export default withStyles(CardBodyStyle)(CardBody);
