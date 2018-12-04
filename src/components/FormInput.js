import React, { Component } from 'react';
import { View } from 'react-native';
import { TextField } from 'react-native-material-textfield';
class FormInputbox extends Component {
	render() {
		const { label, values, defaultValue, onFocus } = this.props;
		return (
			<View style={{ flex: 1 }}>
				<TextField
					ref={this.emailRef}
					value={'dfd'}
					defaultValue={'Surname'}
					keyboardType="email-address"
					autoCapitalize="none"
					autoCorrect={false}
					enablesReturnKeyAutomatically={true}
					onFocus={onFocus}
					onChangeText={this.onChangeText}
					onSubmitEditing={this.onSubmitEmail}
					returnKeyType="next"
					label="password"
					error={''}
					tintColor={'#02B2FE'}
				/>
			</View>
		);
	}
}

export default FormInputbox;
