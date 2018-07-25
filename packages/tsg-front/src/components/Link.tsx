import * as React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

interface LinkProps {
  to: string;
  label: string;
}

class Link extends React.PureComponent<LinkProps> {
  public render() {
    const { to, label } = this.props;

    return (
      <ReactRouterLink
        to={{
          pathname: to,
          search: App.webEnv === 'production' ? '' : `?env=${App.webEnv}`,
        }}
      >
        {label}
      </ReactRouterLink>
    );
  }
}

export default Link;
