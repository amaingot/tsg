import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';
import * as React from 'react';

import cardBodyStyle from 'src/styles/jss/components/cardBodyStyle';
import { CommonProps } from 'src/utils/commonProps';

interface CardBodyProps extends CommonProps {
  background?: boolean;
  plain?: boolean;
  formHorizontal?: boolean;
  pricing?: boolean;
  signup?: boolean;
  color?: boolean;
  profile?: boolean;
  calendar?: boolean;
}

const CardBody: React.SFC<CardBodyProps> = ({ ...props }) => {
  const {
    classes,
    className,
    children,
    background,
    plain,
    formHorizontal,
    pricing,
    signup,
    color,
    profile,
    calendar,
    ...rest
  } = props;

  const cardBodyClasses = classNames({
    [classes.cardBody]: true,
    [classes.cardBodyBackground]: background,
    [classes.cardBodyPlain]: plain,
    [classes.cardBodyFormHorizontal]: formHorizontal,
    [classes.cardPricing]: pricing,
    [classes.cardSignup]: signup,
    [classes.cardBodyColor]: color,
    [classes.cardBodyProfile]: profile,
    [classes.cardBodyCalendar]: calendar,
    [className || '']: className !== undefined,
  });

  return (
    <div className={cardBodyClasses} {...rest}>
      {children}
    </div>
  );
};

export default withStyles(cardBodyStyle)(CardBody);
