// nodejs library to set properties for components
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// nodejs library that concatenates classes
import classNames from 'classnames';
import React from 'react';
// @material-ui/icons

// core components
import cardStyle from 'styles/jss/components/cardStyle';
import { CommonProps } from 'utils/commonProps';

interface Props extends CommonProps {
  plain?: boolean;
  profile?: boolean;
  blog?: boolean;
  raised?: boolean;
  background?: boolean;
  pricing?: boolean;
  testimonial?: boolean;
  color?: 'primary' | 'info' | 'success' | 'warning' | 'danger' | 'rose';
  product?: boolean;
  chart?: boolean;
  login?: boolean;
}

const Card: React.SFC<Props> = ({ ...props }) => {
  const {
    classes,
    className,
    children,
    plain,
    profile,
    blog,
    raised,
    background,
    pricing,
    color,
    product,
    testimonial,
    chart,
    login,
    ...rest
  } = props;

  const cardClasses = classNames({
    [classes.card]: true,
    [classes.cardPlain]: plain,
    [classes.cardProfile]: profile || testimonial,
    [classes.cardBlog]: blog,
    [classes.cardRaised]: raised,
    [classes.cardBackground]: background,
    [classes.cardPricingColor]:
      (pricing && color !== undefined) || (pricing && background !== undefined),
    [classes[color || 'primary']]: color,
    [classes.cardPricing]: pricing,
    [classes.cardProduct]: product,
    [classes.cardChart]: chart,
    [classes.cardLogin]: login,
    [className || '']: className !== undefined,
  });

  return (
    <div className={cardClasses} {...rest}>
      {children}
    </div>
  );
};

export default withStyles(cardStyle)(Card);
