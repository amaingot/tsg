import React from 'react';
import styled from 'styled-components';

interface SPProps {
  transformValue: number;
  image: string | undefined;
}

const StyledParallax = styled<SPProps, 'div'>('div')`
  height: 90vh;
  max-height: 1000px;
  overflow: hidden;
  position: relative;
  background-position: center center;
  background-size: cover;
  margin: 0;
  padding: 0;
  border: 0;
  display: flex;
  align-items: center;
  background-image: url('${props => props.image}');
  transform: translate3d(0, ${props => props.transformValue}px,0);

  &.filter {
    &:before {
      background: rgba(0, 0, 0, 0.5);
    }
    &:after,
    &:before {
      position: absolute;
      z-index: 1;
      width: 100%;
      height: 100%;
      display: block;
      left: 0;
      top: 0;
      content: '';
    }
  }
  &.small {
    height: 380px;
  }
`;

interface ParallaxProps {
  className?: string;
  filter?: boolean;
  small?: boolean;
  children?: React.ReactNode;
  style?: string;
  image?: string;
}

interface ParallaxState {
  windowScrollTop: number;
}

export default class Parallax extends React.Component<ParallaxProps, ParallaxState> {
  constructor(props: ParallaxProps) {
    super(props);
    const windowScrollTop = window.pageYOffset / 3;
    this.state = {
      windowScrollTop,
    };
    this.resetTransform = this.resetTransform.bind(this);
  }

  public componentDidMount() {
    const windowScrollTop = window.pageYOffset / 3;
    this.setState({
      windowScrollTop,
    });
    window.addEventListener('scroll', this.resetTransform);
  }

  public componentWillUnmount() {
    window.removeEventListener('scroll', this.resetTransform);
  }

  public resetTransform() {
    const windowScrollTop = window.pageYOffset / 3;
    this.setState({
      windowScrollTop,
    });
  }

  public render() {
    const { filter, className, children, small, image } = this.props;

    const classes: string[] = [];

    if (className) {
      classes.push(className);
    }
    if (filter) {
      classes.push('filter');
    }
    if (small) {
      classes.push('small');
    }
    if (className) {
      classes.push(className);
    }

    return (
      <StyledParallax
        image={image}
        transformValue={this.state.windowScrollTop}
        className={classes.join(' ')}
        // ref="parallax"
      >
        {children}
      </StyledParallax>
    );
  }
}
