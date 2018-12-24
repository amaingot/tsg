import cx from 'classnames';
import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';

import headingStyle from 'styles/jss/components/headingStyle';
import { CommonProps } from 'utils/commonProps';

interface Props extends CommonProps {
  title?: React.ReactNode;
  category?: React.ReactNode;
  textAlign?: 'right' | 'left' | 'center';
}

const Heading: React.SFC<Props> = ({ ...props }) => {
  const { textAlign, category, title, classes } = props;
  const heading =
    classes.heading +
    ' ' +
    cx({
      [classes[textAlign + 'TextAlign']]: !!textAlign,
    });

  if (title || category) {
    return (
      <div className={heading}>
        {title ? <h3 className={classes.title}>{title}</h3> : null}
        {category ? <p className={classes.category}>{category}</p> : null}
      </div>
    );
  }
  return null;
};

export default withStyles(headingStyle)(Heading);
