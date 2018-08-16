import classNames from 'classnames';
import React from 'react';

import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { SvgIconProps } from '@material-ui/core/SvgIcon';

import InfoStyle from 'styles/InfoStyle';
import { Color } from 'styles/Theme';

interface InfoAreaProps extends Partial<WithStyles> {
  classes: Record<string, string>;
  icon: React.ComponentType<SvgIconProps>;
  title: string;
  description: string;
  iconColor?: Color;
  vertical?: boolean;
}

const InfoArea: React.SFC<InfoAreaProps> = props => {
  const { classes, title, description, iconColor, vertical } = props;
  const iconWrapper = classNames({
    [classes.iconWrapper]: true,
    [classes[iconColor || 'gray']]: true,
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

export default withStyles(InfoStyle)(InfoArea);
