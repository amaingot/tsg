import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';
import React from 'react';

import cardFooterStyle from 'styles/jss/components/cardFooterStyle';
import { CommonProps } from 'utils/commonProps';

interface Props extends CommonProps {
  plain?: boolean;
  profile?: boolean;
  pricing?: boolean;
  testimonial?: boolean;
  stats?: boolean;
  chart?: boolean;
  product?: boolean;
}

const CardFooter: React.SFC<Props> = ({ ...props }) => {
  const {
    classes,
    className,
    children,
    plain,
    profile,
    pricing,
    testimonial,
    stats,
    chart,
    product,
    ...rest
  } = props;

  const cardFooterClasses = classNames({
    [classes.cardFooter]: true,
    [classes.cardFooterPlain]: plain,
    [classes.cardFooterProfile]: profile || testimonial,
    [classes.cardFooterPricing]: pricing,
    [classes.cardFooterTestimonial]: testimonial,
    [classes.cardFooterStats]: stats,
    [classes.cardFooterChart]: chart || product,
    [className || '']: className !== undefined,
  });

  return (
    <div className={cardFooterClasses} {...rest}>
      {children}
    </div>
  );
};

export default withStyles(cardFooterStyle)(CardFooter);
