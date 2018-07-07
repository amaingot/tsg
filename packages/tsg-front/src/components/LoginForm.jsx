import React from 'react';
import styled from 'styled-components';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

const FormItem = Form.Item;

const StyledForm = styled(Form)`
	max-width: 300px;
`;

const StyledButton = styled(Button)`
	width: 100%;
`;

const ForgotLink = styled.a`
	float: right;
`;

class LoginForm extends React.Component {
	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
			} else {
				console.log('Received errors of form: ', err);
			}
		});
	};

	render() {
		const { getFieldDecorator } = this.props.form;

		return (
			<StyledForm onSubmit={this.handleSubmit}>
				<FormItem>
					{getFieldDecorator('userName', {
						rules: [{ required: true, message: 'Please input your username!' }],
					})(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />)}
				</FormItem>
				<FormItem>
					{getFieldDecorator('password', {
						rules: [{ required: true, message: 'Please input your Password!' }],
					})(
						<Input
							prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
							type="password"
							placeholder="Password"
						/>
					)}
				</FormItem> BM
				<FormItem>
					{getFieldDecorator('remember', {
						valuePropName: 'checked',
						initialValue: true,
					})(<Checkbox>Remember me</Checkbox>)}
					<ForgotLink href="">Forgot password</ForgotLink>
					<StyledButton type="primary" htmlType="submit" className="login-form-button">
						Log in
					</StyledButton>
				</FormItem>
			</StyledForm>
		);
	}
}

export default Form.create()(LoginForm);
