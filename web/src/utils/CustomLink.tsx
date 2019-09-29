import * as React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';

interface CustomRouteProps extends NavLinkProps {
  to: string;
}

const CustomNavLink: React.FC<CustomRouteProps> = (props: CustomRouteProps) => {
  const { to, ...rest } = props;

  return (
    <NavLink
      to={{
        pathname: to,
        // search: App.webEnv === 'production' ? '' : `?env=${App.webEnv}`,
      }}
      style={{
        textDecoration: 'none',
      }}
      {...rest}
    />
  );
};

export default CustomNavLink;
