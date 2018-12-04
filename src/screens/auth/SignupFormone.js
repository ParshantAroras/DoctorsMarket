import React, { Component } from 'react';
import { View, Text, Dimensions, Keyboard, Platform, TouchableOpacity } from 'react-native';
import { normalize, scale, verticalScale, moderateScale, fonts, ScrollView, } from '../../config';
const { width } = Dimensions.get('window');
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { TextField } from 'react-native-material-textfield';
import FormInput from '../../components/FormInput';
import StepIndicatorView from '../../components/stpeindicatorview';
import { SignupUpdate } from '../../actions/Signupactions';
import { connect } from 'react-redux';
import Regex from '../../utils/regex';
import CheckBox from 'react-native-modest-checkbox';
import FCM, { FCMEvent, NotificationActionType } from 'react-native-fcm';
import Button from '../../components/button';
import { toast } from '../../components/toast';
import { Dropdown } from 'react-native-material-dropdown';
import title from '../../utils/titles';
import { registraion } from '../../actions/Signupactions';
import Spinner from '../../components/spinner';
class SignupFormone extends Component {
	constructor(props) {
		super(props);
		this.state = {
			confirmpassword: '',
			Forenameerror: '',
			secondnameerror: '',
			emailerror: '',
			phonenumbererror: '',
			gendererror: '',
			passworderror: '',
			matcherror: '',
			valuated: false,
			isChecked: false,
			visible: false,
			titleerror: '',
		};
		this.openWebView = this.openWebView.bind(this);
	}

	componentWillMount() {
		const { SignupUpdate } = this.props;

		if (Platform.OS === 'android') {
			FCM.requestPermissions();
		} else {
			FCM.requestPermissions({ badge: false, sound: true, alert: true })
				.then(() => console.log('granted'))
				.catch(() => console.tron.log('notification permission rejected'));
		}
		FCM.getFCMToken().then(token => {
			console.log('TOKEN (getFCMToken)', token);
			if (token) {
				SignupUpdate({ prop: 'device_token', value: token });
			}
		});
	}

	onFocus = () => {};
	onSubmit = () => {
		Keyboard.dismiss();
		this.setState({
			Forenameerror: '',
			secondnameerror: '',
			emailerror: '',
			phonenumbererror: '',
			gendererror: '',
			passworderror: '',
			matcherror: '',
			titleerror: '',
		});
		const {
			email,
			Forename,
			Surname,
			phonenumber,
			gender,
			password,
			title,
			device_token,
			navigation: { navigate },
		} = this.props;
		const {
			Forenameerror,
			secondnameerror,
			emailerror,
			phonenumbererror,
			gendererror,
			passworderror,
			matcherror,
		} = this.state;
		this.setState({ valuated: true });
		const { navigation } = this.props;
		if (!this.state.isChecked) {
			toast({ text: 'Please accept the terms of service', type: 'danger' });
			return;
		}

		if (!title.value && !title.id) {
			this.setState({
				titleerror: 'Please select title',
			});
			return;
		}
		if (Forename.length < 2) {
			this.setState({
				Forenameerror: 'Name should contain minum two charecter',
			});
			return;
		}

		if (Surname.length < 2) {
			this.setState({
				secondnameerror: 'Name should contain minum two charecter',
			});
			return;
		}

		if (Forename.length > 2 && !Regex.validateString(Forename)) {
			this.setState({
				Forenameerror: 'Name contain illegal charecter',
			});
			return;
		}

		if (Surname.length > 2 && !Regex.validateString(Surname)) {
			this.setState({
				secondnameerror: 'Name contain illegal charecter',
			});
			return;
		}

		if (!Regex.validateEmail(email)) {
			this.setState({
				emailerror: 'Please enter valid email adress',
			});
			return;
		}

		// if (!Regex.validateMobileWithEleventDigit(phonenumber)) {
		// 	this.setState({
		// 		phonenumbererror: 'Please enter valid mobile numer',
		// 	});
		// 	return;
		// }

		if (!password) {
			this.setState({
				passworderror: 'Please enter a password',
			});
			return;
		}

		if (password.length < 6) {
			this.setState({
				passworderror: 'Password must be in between 6-10 characters.',
			});
			return;
		}

		if (password.length > 16) {
			this.setState({
				passworderror: 'Password is too long.',
			});
			return;
		}

		if (password != this.state.confirmpassword || this.state.confirmpassword.length == 0) {
			this.setState({
				matcherror: 'Password does not match',
			});
			return;
		}
		let body = {
			title_id: title.id,
			first_name: Forename,
			last_name: Surname,
			email: email,
			password: password,
			// phone: phonenumber,
			device_token: device_token ? device_token : '',
		};

		this.props.registraion({ body, navigation });
	};
	_handleFocusNextField = nextField => {
		this.refs[nextField].focus();
	};

	openWebView(url){
		console.log('his.props.navigation',this.props.navigation)
		this.props.navigation.navigate('WebView',{
			uri : url
		})
	}

	render() {
		const {
			navigation: { navigate },
			SignupUpdate,
		} = this.props;
		let { error, validemail } = this.state;

		return (
			<View style={{ flex: 1, backgroundColor: '#fff' }}>
				<KeyboardAwareScrollView
				enableResetScrollToCoords={false}
					style={{
						flex: 1,
						backgroundColor: '#fff',
						paddingHorizontal: scale(20),
					}}
				>
					<View
						style={{
							flex: 0.2,
							paddingHorizontal: scale(10),
							paddingTop: verticalScale(8),
						}}
					>
						<Text
							style={{
								fontFamily: fonts.fontPrimaryLight,
								fontSize: normalize(36),
								marginVertical: verticalScale(10),
								color: '#000000',
								opacity: 0.8,
							}}
						>
							Registration
						</Text>
					</View>
					<View style={{ flex: 0.8, paddingHorizontal: scale(10) }}>
						<Dropdown
							error={this.state.titleerror}
							label={'Title'}
							data={title}
							fontSize={15}
							pickerStyle={{
								borderWidth: 1,
								borderColor: '#666666',
								borderRadius: 5,
							}}
							value={this.props.title.value}
							itemTextStyle={[
								{
									fontSize: 16,
									fontFamily: fonts.fontPrimaryLight,
								},
							]}
							onChangeText={(value, index) => {
								SignupUpdate({
									prop: 'title',
									value: { value, id: title[index].id },
								});
							}}
						/>

					<TextField
							ref={this.Forename}
							value={this.props.Forename}
							defaultValue={''}
							keyboardType="default"
							autoCapitalize="sentences"
							autoCorrect={false}
							enablesReturnKeyAutomatically={true}
							onFocus={this.onFocus}
							onChangeText={text => SignupUpdate({ prop: 'Forename', value: text })}
							onSubmitEditing={this._handleFocusNextField.bind(this, 'Surname')}
							returnKeyType="next"
							label="Forename"
							error={this.state.Forenameerror}
							tintColor={'#02B2FE'}
						/>

						<TextField
							ref="Surname"
							value={this.props.Surname}
							defaultValue={''}
							keyboardType="default"
							autoCapitalize="sentences"
							autoCorrect={false}
							enablesReturnKeyAutomatically={true}
							onFocus={this.onFocus}
							onChangeText={text => SignupUpdate({ prop: 'Surname', value: text })}
							onSubmitEditing={this._handleFocusNextField.bind(this, 'email')}
							returnKeyType="next"
							label="Surname"
							error={this.state.secondnameerror}
							tintColor={'#02B2FE'}
						/>

						<TextField
							ref="email"
							value={this.props.email}
							defaultValue={''}
							keyboardType="email-address"
							autoCapitalize="none"
							autoCorrect={false}
							enablesReturnKeyAutomatically={true}
							onFocus={this.onFocus('email')}
							onChangeText={text => SignupUpdate({ prop: 'email', value: text })}
							onSubmitEditing={this._handleFocusNextField.bind(this, 'password')}
							returnKeyType="next"
							label="Email adress"
							error={this.state.emailerror}
							tintColor={'#02B2FE'}
						/>
						{/* <TextField
							ref="phonenumber"
							value={this.props.phonenumber}
							maxLength={11}
							defaultValue={''}
							keyboardType="numeric"
							autoCapitalize="none"
							autoCorrect={false}
							enablesReturnKeyAutomatically={true}
							onFocus={this.onFocus}
							onChangeText={text => SignupUpdate({ prop: 'phonenumber', value: text })}
							onSubmitEditing={this._handleFocusNextField.bind(this, 'password')}
							returnKeyType="done"
							label="Phone number"
							error={this.state.phonenumbererror}
							tintColor={'#02B2FE'}
						/> */}
						<TextField
							ref="password"
							value={this.props.password}
							defaultValue={''}
							keyboardType="default"
							autoCapitalize="none"
							autoCorrect={false}
							secureTextEntry={true}
							enablesReturnKeyAutomatically={true}
							onFocus={this.onFocus}
							onChangeText={text => SignupUpdate({ prop: 'password', value: text })}
							onSubmitEditing={() => this.refs['cpassword'].focus()}
							returnKeyType="next"
							label="Password"
							error={this.state.passworderror}
							tintColor={'#02B2FE'}
						/>

						<TextField
							ref="cpassword"
							value={this.state.confirmpassword}
							defaultValue={''}
							keyboardType="default"
							autoCapitalize="none"
							autoCorrect={false}
							enablesReturnKeyAutomatically={true}
							onFocus={this.onFocus}
							onChangeText={text => this.setState({ confirmpassword: text })}
							returnKeyType="done"
							label="Confirm password"
							error={this.state.matcherror}
							tintColor={'#02B2FE'}
							secureTextEntry={true}
						/>
					</View>
				
					<View
						style={{
							flex: 0.2,
							alignItems: 'flex-start',
							justifyContent: 'flex-start',
							paddingLeft: moderateScale(5),
							marginTop: moderateScale(10),
							flexDirection :'row'
						}}
					>
					<Text> View </Text>
				    <TouchableOpacity onPress={()=>{
						this.openWebView('/terms_conditions')
					}}>
						<Text style={{
							color : '#00B1FF'
						}}>
						  Terms of Service	
						</Text>
					</TouchableOpacity>   
					<Text> &  </Text>
					<TouchableOpacity onPress={()=>{
						this.openWebView('/privacy_policy')
					}}>
						<Text style={{
							color : '#00B1FF'
						}}>
						 Privacy Policy	
						</Text>
					</TouchableOpacity>   
					</View>
					
					<View
						style={{
							flex: 0.2,
							alignItems: 'flex-start',
							justifyContent: 'center',
							paddingLeft: scale(10),
							marginTop: verticalScale(13),
						}}
					>
						<CheckBox
							label="I accept the Terms of Service"
							labelStyle={{
								fontFamily: fonts.fontPrimaryLight,
								fontSize: normalize(15),
								color: '#000000',
								opacity: 0.8,
							}}
							checkboxStyle={{
								width: 20,
								height: 20,
							}}
							checked={this.state.isChecked}
							onChange={checked => this.setState({ isChecked: !this.state.isChecked })}
						/>
					</View>
					<View
						style={{
							flex: 0.3,
							alignItems: 'center',
							justifyContent: 'center',
							marginTop: verticalScale(30),
						}}
					>
						<Button
							label={'REGISTER'}
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
									marginVertical: 5,
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
					{this.props.loader && <Spinner visible={this.props.loader} text={'Signing....'} />}
					<View style={{ width, height: 50, backgroundColor: '#fff' }} />
				</KeyboardAwareScrollView>
			</View>
		);
	}
}

const mapStateToProps = ({ SignupReducer }) => {
	const { Forename, Surname, loader, email, phonenumber, gender, password, title, device_token } = SignupReducer;
	return {
		Forename,
		Surname,
		email,
		phonenumber,
		gender,
		password,
		title,
		loader,
		device_token,
	};
};
export default connect(
	mapStateToProps,
	{ SignupUpdate, registraion }
)(SignupFormone);
