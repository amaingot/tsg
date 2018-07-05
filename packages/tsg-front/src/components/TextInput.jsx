import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormFeedback, Label, Input } from 'reactstrap';

export default class TextInput extends Component {
	static propTypes = {
		name: PropTypes.string,
		label: PropTypes.string,
		error: PropTypes.string,
		type: PropTypes.string,
	};

	render() {
		const { name, label, error, type, ...rest } = this.props;
		const id = `id_${name}`,
			input_type = type ? type : 'text';
		return (
			<FormGroup color={error ? 'danger' : ''}>
				{label ? <Label htmlFor={id}>{label}</Label> : ''}
				<Input type={input_type} name={name} id={id} className={error ? 'is-invalid' : ''} {...rest} />
				{error ? <FormFeedback className="invalid-feedback">{error}</FormFeedback> : ''}
			</FormGroup>
		);
	}
}
