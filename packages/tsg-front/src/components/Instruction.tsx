import cx from 'classnames';
import React from 'react';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';

// core components
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';

import instructionStyle from 'styles/jss/components/instructionStyle';
import { CommonProps } from 'utils/commonProps';

interface Props extends CommonProps {
  title: React.ReactNode;
  text: React.ReactNode;
  image?: string;
  imageAlt?: string;
  imageClassName?: string;
}

const Instruction: React.SFC<Props> = ({ ...props }) => {
  const { classes, title, text, image, className, imageClassName, imageAlt } = props;
  const instructionClasses = cx({
    [classes.instruction]: true,
    [className || '']: className !== undefined,
  });

  const pictureClasses = cx({
    [classes.picture]: true,
    [imageClassName || '']: imageClassName !== undefined,
  });

  return (
    <div className={instructionClasses}>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <strong>{title}</strong>
          <p>{text}</p>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <div className={pictureClasses}>
            <img src={image} alt={imageAlt} className={classes.image} />
          </div>
        </GridItem>
      </GridContainer>
    </div>
  );
};

Instruction.defaultProps = {
  imageAlt: '...',
};

export default withStyles(instructionStyle)(Instruction);
