import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';
import React from 'react';
import cardAvatarStyle from 'styles/jss/components/cardAvatarStyle';
import { CommonProps } from 'utils/commonProps';

interface Props extends CommonProps {
  profile?: boolean;
  plain?: boolean;
  testimonial?: boolean;
  testimonialFooter?: boolean;
}

const CardAvatar: React.SFC<Props> = ({ ...props }) => {
  const {
    classes,
    children,
    className,
    plain,
    profile,
    testimonial,
    testimonialFooter,
    ...rest
  } = props;
  const cardAvatarClasses = classNames({
    [classes.cardAvatar]: true,
    [classes.cardAvatarProfile]: profile,
    [classes.cardAvatarPlain]: plain,
    [classes.cardAvatarTestimonial]: testimonial,
    [classes.cardAvatarTestimonialFooter]: testimonialFooter,
    [className || '']: className !== undefined,
  });
  return (
    <div className={cardAvatarClasses} {...rest}>
      {children}
    </div>
  );
};

export default withStyles(cardAvatarStyle)(CardAvatar);
