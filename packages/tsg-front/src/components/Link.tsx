import { History } from 'history';
import * as React from 'react';
import { connect } from 'react-redux';
import { ReduxShape } from 'store/index';

interface LinkProps {
  to: string;
  children?: React.ReactNode;
  router: History;
}

class Link extends React.PureComponent<LinkProps> {
  public onClick = () => {
    const { router, to } = this.props;

    const newLocation = {
      pathname: to,
      search: App.webEnv === 'production' ? '' : `?env=${App.webEnv}`,
    };

    router.push(newLocation);
  };

  public render() {
    const { children } = this.props;

    return <div onClick={this.onClick}>{children}</div>;
  }
}

const mapState2Props = (state: ReduxShape) => {
  return {
    router: state.router,
  };
};

export default connect(mapState2Props)(Link);
