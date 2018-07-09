import * as React from 'react';
import styled from '../utils/styled-components';

import Checkbox from 'antd/lib/checkbox';
import 'antd/lib/checkbox/style';
import Form from 'antd/lib/form';
import 'antd/lib/form/style';
import Icon from 'antd/lib/icon';
import 'antd/lib/icon/style';
import Input from 'antd/lib/input';
import 'antd/lib/input/style';

import { LoginRequest } from '../store/auth/types';
import LoginSubmitButton from './LoginSubmitButton';

const FormItem = Form.Item;

const StyledForm = styled(Form)`
  max-width: 300px;
`;

const ForgotLink = styled.a`
  float: right;
`;

interface LoginFormProps {
  form: any;
  onSubmit: (payload: LoginRequest) => any;
}

class LoginForm extends React.Component<LoginFormProps> {
  public handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        this.props.onSubmit({
          username: values.userName,
          password: values.password,
          stayLoggedIn: values.remeber
        });
      }
    });
  }

  public render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <StyledForm onSubmit={this.handleSubmit}>
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }]
          })(
            <Input
              prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder='Username'
              autoComplete='username'
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }]
          })(
            <Input
              prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
              type='password'
              placeholder='Password'
              autoComplete='current-password'
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true
          })(<Checkbox>Remember me</Checkbox>)}
          <ForgotLink href=''>Forgot password</ForgotLink>
          <LoginSubmitButton children='Login' onClick={this.handleSubmit} />
        </FormItem>
      </StyledForm>
    );
  }
}

export default Form.create()(LoginForm);
