import React, { Component } from 'react';
import { AppRegistry, ScrollView, View, Text, Dimensions, KeyboardAvoidingView,Keyboard } from 'react-native';
const { height, width } = Dimensions.get('window');
import { TextField } from 'react-native-material-textfield';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import NextButton from '../../components/nextbutton';
import Entypo from 'react-native-vector-icons/Entypo';
import Button from '../../components/button';
import { LoginUpdate, LoginChecking, reset } from '../../actions/Loginactions';
import Spinner from '../../components/spinner';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { colors, normalize, scale, verticalScale, moderateScale, fonts } from '../../config';
import { connect } from 'react-redux';
import Regex from '../../utils/regex';
class LoginScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			secureTextEntry: true,
			emailerror: '',
			passworderror: '',
		};
		this.renderPasswordAccessory = this.renderPasswordAccessory.bind(this);
	}
	componentWillMount() {
		this.props.reset();
	}

	renderPasswordAccessory() {
		let { secureTextEntry } = this.state;

		let name = secureTextEntry ? 'visibility' : 'visibility-off';

		return (
			<MaterialIcon
				size={24}
				name={name}
				color={TextField.defaultProps.baseColor}
				onPress={this.renderPasswordAccessory}
				suppressHighlighting
			/>
		);
	}
	onSubmit = () => {
		Keyboard.dismiss();
		const {
			navigation: { navigate },
			email,
			password,
			deviceToken
		} = this.props;
		console.log(this.props.email, this.props.password, 'passs');
		this.setState({ emailerror: '', passworderror: '' });

		if (!Regex.validateEmail(email)) {
			this.setState({
				emailerror: 'Please enter valid email adress',
			});
			return;
		}

		if (!password) {
			this.setState({
				passworderror: 'Please enter your  password',
			});
			return;
		}

		let body = {
			email,
			password,
			device_token : deviceToken
		};
		this.props.LoginChecking({ body, navigate: navigate });
	};
	onFocus = () => {};

	_handleFocusNextField = nextField => {
		this.refs[nextField].focus();
	};

	render() {
		let { secureTextEntry } = this.state;

		const {
			navigation: { navigate },
			LoginUpdate,
		} = this.props;

		//let defaultEmail = "test@gmail.com".replace(/\s+/g, "_").toLowerCase();

		return (
			<KeyboardAwareScrollView
				style={{
					padding: 8,
					backgroundColor: '#fff',
					paddingTop: verticalScale(8),
				}}
			>
				<View style={{ flex: 0.2, paddingHorizontal: scale(10) }}>
					<Text
						style={{
							fontFamily: fonts.fontPrimaryLight,
							fontSize: normalize(36),
							marginLeft: scale(10),
							color: '#000000',
							opacity: 0.8,
						}}
					>
						Login
					</Text>
				</View>
				<View
					style={{
						margin: 8,
						marginTop: 24,
						flex: 0.3,
						paddingHorizontal: scale(10),
					}}
				>
					<TextField
						ref="email"
						value={this.props.email}
						defaultValue={''}
						keyboardType="email-address"
						autoCapitalize="none"
						autoCorrect={false}
						enablesReturnKeyAutomatically={true}
						onFocus={this.onFocus}
						onChangeText={data => LoginUpdate({ prop: 'email', value: data })}
						onSubmitEditing={this._handleFocusNextField.bind(this, 'password')}
						returnKeyType="next"
						label="Email Address"
						error={this.state.emailerror}
						tintColor={'#02B2FE'}
					/>

					<TextField
						ref="password"
						value={this.props.password}
						secureTextEntry={this.state.secureTextEntry}
						autoCapitalize="none"
						autoCorrect={false}
						enablesReturnKeyAutomatically={true}
						clearTextOnFocus={true}
						onFocus={this.onFocus}
						onChangeText={data => LoginUpdate({ prop: 'password', value: data })}
						onSubmitEditing={this.onSubmitPassword}
						returnKeyType="done"
						label="Password"
						error={this.state.passworderror}
						title=""
						maxLength={30}
						tintColor={'#02B2FE'}
					/>
				</View>
				<View
					style={{
						width,
						height: verticalScale(25),
						alignItems: 'flex-end',
					}}
				>
					<Text
						onPress={() => navigate('ForgotPassword')}
						style={{
							fontFamily: fonts.fontPrimaryLight,
							fontSize: normalize(13),
							paddingRight: scale(32),
							letterSpacing: 2,
							color: '#02B2FE',
							paddingBottom: verticalScale(8),
						}}
					>
						Forgot?
					</Text>
				</View>
				<View
					style={{
						flex: 0.5,
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<Button
						label={'LOGIN'}
						disabled={false}
						onPress={this.onSubmit}
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
				{this.props.loader && <Spinner visible={this.props.loader} text={'Loging....'} />}
			</KeyboardAwareScrollView>
		);
	}
}
const mapStateToProps = ({ Loginreducer , Notireducer}) => {
	console.log('Notireducer',Notireducer)
	const {deviceToken} = Notireducer;
	const { email, password, loader } = Loginreducer;
	return {
		email,
		password,
		loader,
		deviceToken
	};
};
export default connect(
	mapStateToProps,
	{ LoginUpdate, LoginChecking, reset }
)(LoginScreen);
