import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';
import * as React from 'react';

import cardTextStyle from 'src/styles/jss/components/cardTextStyle';
import { CommonProps } from 'src/utils/commonProps';

interface Props extends CommonProps {
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
