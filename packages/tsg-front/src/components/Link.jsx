import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link as ReactRouterLink } from 'react-router-dom';

class Link extends PureComponent {
  render() {
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

Link.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default Link;
