import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';
import * as React from 'react';

// core components
import cardHeaderStyle from 'src/styles/jss/components/cardHeaderStyle';
import { CommonProps } from 'src/utils/commonProps';

interface Props extends CommonProps {
  color?: 'warning' | 'success' | 'danger' | 'info' | 'primary' | 'rose';
  plain?: boolean;
  image?: boolean;
  contact?: boolean;
  signup?: boolean;
  stats?: boolean;
  icon?: boolean;
  text?: boolean;
}

const CardHeader: React.SFC<Props> = ({ ...props }) => {
  const {
    classes,
    className,
    children,
    color,
    plain,
    image,
    contact,
    signup,
    stats,
    icon,
    text,
    ...rest
  } = props;

  const cardHeaderClasses = classNames({
    [classes.cardHeader]: true,
    [classes[color + 'CardHeader']]: color,
    [classes.cardHeaderPlain]: plain,
    [classes.cardHeaderImage]: image,
    [classes.cardHeaderContact]: contact,
    [classes.cardHeaderSignup]: signup,
    [classes.cardHeaderStats]: stats,
    [classes.cardHeaderIcon]: icon,
    [classes.cardHeaderText]: text,
    [className || '']: className !== undefined,
  });

  return (
    <div className={cardHeaderClasses} {...rest}>
      {children}
    </div>
  );
};

export default withStyles(cardHeaderStyle)(CardHeader);
