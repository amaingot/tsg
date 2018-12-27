import * as React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';

interface Props extends NavLinkProps {
  to: string;
}

const CustomLink: React.SFC<Props> = (props: Props) => {
  const { to, ...rest } = props;

  return (
    <NavLink
      to={{
        pathname: to,
        search: App.webEnv === 'production' ? '' : `?env=${App.webEnv}`,
      }}
      {...rest}
    />
  );
};

export default CustomLink;
