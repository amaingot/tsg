import classNames from 'classnames';
import * as React from 'react';

import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import infoStyle from 'src/styles/jss/components/kit/infoStyle';

interface Props extends WithStyles {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  iconColor: 'primary' | 'warning' | 'danger' | 'success' | 'info' | 'rose' | 'gray';
  vertical?: boolean;
}

/**
 * Info Area Kit is from the Material Kit package.
 */
const InfoArea: React.SFC<Props> = (props: Props) => {
  const { classes, title, description, iconColor, vertical } = props;

  const iconWrapper = classNames({
    [classes.iconWrapper]: true,
    [classes[iconColor]]: true,
    [classes.iconWrapperVertical]: vertical,
  });

  const iconClasses = classNames({
    [classes.icon]: true,
    [classes.iconVertical]: vertical,
  });

  return (
    <div className={classes.infoArea}>
      <div className={iconWrapper}>
        <props.icon className={iconClasses} />
      </div>
      <div className={classes.descriptionWrapper}>
        <h4 className={classes.title}>{title}</h4>
        <p className={classes.description}>{description}</p>
      </div>
    </div>
  );
};

InfoArea.defaultProps = {
  iconColor: 'gray',
};

export default withStyles(infoStyle)(InfoArea);
