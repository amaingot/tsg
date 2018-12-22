import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';
import React from 'react';

import cardTextStyle from 'styles/jss/components/cardTextStyle';

interface Props extends WithStyles {
  children?: React.ReactNode;
  className?: string;
  color?: 'warning' | 'success' | 'danger' | 'info' | 'primary' | 'rose';
}

const CardText: React.SFC<Props> = ({ ...props }) => {
  const { classes, className, children, color, ...rest } = props;
  const cardTextClasses = classNames({
    [classes.cardText]: true,
    [classes[color + 'CardHeader']]: color,
    [className || '']: className !== undefined,
  });
  return (
    <div className={cardTextClasses} {...rest}>
      {children}
    </div>
  );
};

export default withStyles(cardTextStyle)(CardText);
