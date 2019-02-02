import * as React from 'react';
import { Redirect, RedirectProps } from 'react-router';

interface Prop extends RedirectProps {
  to: string;
}

const CustomRedirect: React.SFC<Prop> = (props: Prop) => {
  const { to, ...rest } = props;

  return (
    <Redirect
      to={{
        pathname: to,
        search: App.webEnv === 'production' ? '' : `?env=${App.webEnv}`,
      }}
      {...rest}
    />
  );
};

export default CustomRedirect;
