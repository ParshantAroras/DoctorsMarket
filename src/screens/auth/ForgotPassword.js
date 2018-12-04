import React, { Component } from 'react';
import { View, Text, Dimensions, Keyboard, DeviceEventEmitter, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { colors, normalize, scale, verticalScale, moderateScale, fonts } from '../../config';
import { TextField } from 'react-native-material-textfield';
import Button from '../../components/button';
const { height, width } = Dimensions.get('window');
import Regex from '../../utils/regex';
import Spinner from '../../components/spinner';
import RestClient from '../../utils/restclient';
import Modal from 'react-native-modalbox';
import { toast } from '../../components/toast';
export default class ForgotPassword extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			emailerror: '',
			loader: false,
		};
	}

	async onSubmit() {
		const { email } = this.state;
		await this.setState({ emailerror: '' });
		if (!Regex.validateEmail(email)) {
			this.setState({
				emailerror: 'Please enter valid email adress',
			});
			return;
		}
		this.setState({ loader: true });

		RestClient.post('/apis/forgotPassword', {}, { email: this.state.email }).then(response => {
			console.log(response, 'resposne');

			/*   DeviceEventEmitter.emit(
        "showToast",
        response.message
      );
      */
			toast({ text: response.message });
			this.setState({ loader: false });
		});
	}

	render() {
		return (
			<KeyboardAwareScrollView
				style={{
					flex: 1,
					backgroundColor: '#fff',
					paddingHorizontal: normalize(10),
					paddingTop: verticalScale(8),
				}}
			>
				<View style={{ flex: 0.2, paddingVertical: verticalScale(5) }}>
					<Text
						style={{
							fontFamily: fonts.fontPrimaryLight,
							fontSize: normalize(36),
							marginLeft: scale(10),
							color: '#000000',
							opacity: 0.8,
						}}
					>
						Forgot Password ?
					</Text>
				</View>
				<View style={{ flex: 0.1 }}>
					<Text
						style={{
							fontFamily: fonts.fontPrimaryLight,
							fontSize: normalize(14),
							marginLeft: scale(10),
							marginTop: normalize(5),
							color: '#000000',
							opacity: 0.5,
							textAlign: 'left',
						}}
					>
						Please enter your registerred email address to get new password
					</Text>
				</View>
				<View
					style={{
						flex: 0.3,
						paddingHorizontal: normalize(10),
						marginTop: verticalScale(10),
					}}
				>
					<TextField
						ref="email"
						value={this.state.email}
						defaultValue={''}
						keyboardType="email-address"
						autoCapitalize="none"
						autoCorrect={false}
						enablesReturnKeyAutomatically={true}
						onFocus={this.onFocus}
						onChangeText={text => this.setState({ email: text })}
						onSubmitEditing={() => Keyboard.dismiss()}
						returnKeyType="next"
						label="Email Address"
						error={this.state.emailerror}
						tintColor={'#02B2FE'}
					/>
				</View>
				<View style={{ flex: 0.3, marginHorizontal: scale(25) }}>
					<Button
						label={'RESET PASSWORD'}
						disabled={false}
						onPress={this.onSubmit.bind(this)}
						styles={{
							button: {
								height: verticalScale(50),
								width: width - 70,
								alignItems: 'center',
								justifyContent: 'center',
								borderRadius: 5,
								paddingLeft: 15,
								paddingRight: 15,
								borderRadius: 50,
								marginVertical: verticalScale(40),
							},

							label: [
								{
									fontSize: normalize(16),
									color: '#FFFFFF',
									letterSpacing: 5,
								},
							],
						}}
					/>
				</View>
				{this.state.loader && (
					<Modal
						backdrop={false}
						isOpen={this.state.loader}
						onClosed={() => this.setState({ loader: false })}
						style={{
							flex: 1,
							backgroundColor: 'transparent',
							alignItems: 'center',
							justifyContent: 'center',
						}}
						position={'center'}
					>
						<View
							style={{
								flex: 1,
								backgroundColor: 'transparent',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<ActivityIndicator color={'#02B2FE'} size={'large'} />

							<Text style={{ color: '#02B2FE' }}>sending email....</Text>
						</View>
					</Modal>
				)}
			</KeyboardAwareScrollView>
		);
	}
}
