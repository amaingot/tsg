import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';
import React from 'react';

import cardIconStyle from 'styles/jss/components/cardIconStyle';
import { CommonProps } from 'utils/commonProps';

interface Props extends CommonProps {
  children?: React.ReactNode;
  className?: string;
  color?: 'warning' | 'success' | 'danger' | 'info' | 'primary' | 'rose';
}

const CardIcon: React.SFC<Props> = ({ ...props }) => {
  const { classes, className, children, color, ...rest } = props;
  const cardIconClasses = classNames({
    [classes.cardIcon]: true,
    [classes[color + 'CardHeader']]: color,
    [className || '']: className !== undefined,
  });

  return (
    <div className={cardIconClasses} {...rest}>
      {children}
    </div>
  );
};

export default withStyles(cardIconStyle)(CardIcon);
