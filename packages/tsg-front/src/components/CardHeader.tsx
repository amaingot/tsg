import { WithTheme } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';
import React from 'react';

import CardHeaderStyle from 'styles/CardHeaderStyle';
import { Color } from 'styles/Theme';

interface CardHeaderProps {
  classes: Record<string, string>;
  className?: string;
  color?: Color;
  plain?: boolean;
}

const CardHeader: React.SFC<CardHeaderProps & Partial<WithTheme>> = props => {
  const { classes, className, children, color, plain, ...rest } = props;
  const cardHeaderClasses = classNames({
    [classes.root]: true,
    [classes[color + 'CardHeader']]: color,
    [classes.cardHeaderPlain]: plain,
    [className || '']: className !== undefined,
  });
  return (
    <div className={cardHeaderClasses} {...rest}>
      {children}
    </div>
  );
};

export default withStyles(CardHeaderStyle)(CardHeader);
