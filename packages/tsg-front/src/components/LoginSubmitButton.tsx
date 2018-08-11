import Button, { ButtonProps } from 'antd/lib/button';
import * as React from 'react';
import styled from 'styled-components';

class UnstyledLoginSubmitButton extends React.Component<ButtonProps & any, any> {
  public render() {
    return <Button htmlType="submit" {...this.props} />;
  }
}

const LoginSubmitButton = styled(UnstyledLoginSubmitButton)`
  width: 100%;
`;

export default LoginSubmitButton;
