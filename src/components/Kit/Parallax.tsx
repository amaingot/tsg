import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';
import * as React from 'react';

// core components
import parallaxStyle from 'src/styles/jss/components/kit/parallaxStyle';
import { CommonProps } from 'src/utils/commonProps';

interface Props extends CommonProps {
  className?: string;
  filter?: boolean;
  style?: string;
  image?: string;
  small?: boolean;
}

interface State {
  transform: string;
}

class Parallax extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const windowScrollTop = window.pageYOffset / 3;
    this.state = {
      transform: 'translate3d(0,' + windowScrollTop + 'px,0)',
    };
  }

  public componentDidMount() {
    const windowScrollTop = window.pageYOffset / 3;
    this.setState({
      transform: 'translate3d(0,' + windowScrollTop + 'px,0)',
    });
    window.addEventListener('scroll', this.resetTransform);
  }

  public componentWillUnmount() {
    window.removeEventListener('scroll', this.resetTransform);
  }

  public resetTransform = () => {
    const windowScrollTop = window.pageYOffset / 3;
    this.setState({
      transform: 'translate3d(0,' + windowScrollTop + 'px,0)',
    });
  };

  public render() {
    const { classes, filter, className, children, style = {}, image, small } = this.props;
    const parallaxClasses = classNames({
      [classes.parallax]: true,
      [classes.filter]: filter,
      [classes.small]: small,
      [className || '']: className !== undefined,
    });

    return (
      <div
        className={parallaxClasses}
        style={{
          ...style,
          backgroundImage: 'url(' + image + ')',
          ...this.state,
        }}
        ref="parallax"
      >
        {children}
      </div>
    );
  }
}

export default withStyles(parallaxStyle)(Parallax);
