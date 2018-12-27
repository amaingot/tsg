import React from 'react';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';

import infoStyle from 'styles/jss/components/infoStyle';
import { CommonProps } from 'utils/commonProps';

interface Props extends CommonProps {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  iconColor?: 'primary' | 'warning' | 'danger' | 'success' | 'info' | 'rose' | 'gray';
}

const InfoArea: React.SFC<Props> = ({ ...props }) => {
  const { classes, title, description, iconColor } = props;
  return (
    <div className={classes.infoArea}>
      <div className={classes.iconWrapper + ' ' + classes[iconColor || 'gray']}>
        <props.icon className={classes.icon} />
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
