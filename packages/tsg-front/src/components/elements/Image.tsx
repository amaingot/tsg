import * as React from 'react';
import styled from 'styled-components';

interface ImageProps extends React.ImgHTMLAttributes<any> {
  fluid?: boolean;
  rounded?: boolean;
  roundedCircle?: boolean;
  raised?: boolean;
  gallery?: boolean;
  cardTop?: boolean;
  cardBottom?: boolean;
  card?: boolean;
  cardOverlay?: boolean;
}

const StyledImage = styled.img`
  &.fluid {
    max-width: 100%;
    height: auto;
  }

  &.rounded {
    border-radius: 6px;
  }

  &.roundedCircle {
    border-radius: 50%;
  }

  &.raised {
    box-shadow: 0 5px 15px -8px rgba(0, 0, 0, 0.24), 0 8px 10px -5px rgba(0, 0, 0, 0.2);
  }

  &.gallery {
    width: 100%;
    margin-bottom: 2.142rem;
  }

  &.cardTop {
    width: 100%;
    border-top-left-radius: calc(0.25rem - 1px);
    border-bottom-right-radius: calc(0.25rem - 1px);
  }

  &.card {
    width: 100%;
    border-radius: calc(0.25rem - 1px);
  }

  &.cardOverlay {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 1.25rem;
  }
`;

const Image: React.SFC<ImageProps> = props => {
  const {
    fluid,
    rounded,
    roundedCircle,
    raised,
    gallery,
    cardTop,
    cardBottom,
    card,
    cardOverlay,
    ...rest
  } = props;

  let classNames = '';
  if (fluid) {
    classNames += ' fluid';
  }

  if (rounded) {
    classNames += ' rounded';
  }

  if (roundedCircle) {
    classNames += ' roundedCircle';
  }

  if (raised) {
    classNames += ' raised';
  }

  if (gallery) {
    classNames += ' gallery';
  }

  if (fluid) {
    classNames += ' fluid';
  }

  if (fluid) {
    classNames += ' fluid';
  }

  return (
    <StyledImage className={classNames} {...rest}>
      {props.children}
    </StyledImage>
  );
};

export default Image;
