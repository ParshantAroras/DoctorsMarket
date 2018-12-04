import React, { Component } from 'react';
import {
	View,
	Text,
	Dimensions,
	TouchableOpacity,
	ActivityIndicator,
	DeviceEventEmitter,
	Alert,
	Keyboard,
} from 'react-native';
import OpenAppSettings from 'react-native-app-settings';
import { colors, normalize, scale, verticalScale, moderateScale, fonts } from '../../config';
const { height, width } = Dimensions.get('window');
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import StepIndicator from '../../components/stepindicator';
import { TextField } from 'react-native-material-textfield';
import Icon from 'react-native-vector-icons/Ionicons';
import StepIndicatorView from '../../components/stpeindicatorview';
import { SignupUpdate, LocationUpdate } from '../../actions/Signupactions';
import { connect } from 'react-redux';
import Regex from '../../utils/regex';
//import NextButton from "../../compo/nents/nextbutton";
import { Dropdown } from 'react-native-material-dropdown';
import NextButton from '../../components/nextbutton';
import country from '../../utils/country';
import Spinner from '../../components/spinner';
import { locationfetching } from '../../utils/locationfetching';
import Modal from 'react-native-modalbox';
import { toast } from '../../components/toast';
import Permissions from 'react-native-permissions';
import Tickcomponet from '../../components/tickcomponent';
import title from '../../utils/titles';
import Genderfield from '../../components/genderfield';
import DatePickerComponent from '../../components/datepicker';
import moment from 'moment';
import RestClient from '../../utils/restclient';
import countryname from '../../utils/countryname';
import { reset, tabUpdate } from '../../actions/Loginactions';
import { resetNavigationTo } from '../../utils';
import { Toast } from 'native-base';
class SignupFormtwo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			countryerror: '',
			visible: false,
			nationalerror: '',
			staterror: '',
			cityerror: '',
			streeterror: '',
			postalerror: '',
			telephoneerror: '',
			titleerror: '',
			phonenumbererror: '',
			nameerror: '',
			Surnameerror: '',
			doberror: '',
			gendererror: '',
			Forenameerror: '',
			emailerror: '',
		};
	}

	async componentWillMount() {
		//alert(moment('yyyy-mm-dd'));
		//alert(moment('yyyy-mm-dd').isSame(Date.now(), 'day'));
		let context = this;
		if (!this.props.country && !this.state.state) {
			this.setState({ visible: true });

			Permissions.request('location', 'always').then(response => {
				console.log('Response: ' + response);
				if (response === 'allow' || response === 'authorized') {
					locationfetching()
						.then(res => {
							this.props.LocationUpdate(res);
							this.setState({ visible: false });
						})
						.catch(error => {
							context.setState({ visible: false });
							toast({ text: 'Unable to fetch location details', type: 'danger' });
						});
				} else if (response === 'denied') {
					context.setState({ visible: false });
					toast({ text: 'Unable to fetch location details', type: 'danger' });
				}
			});
		}
	}

	submit = () => {
		let context = this;
		Keyboard.dismiss();
		this.setState({
			countryerror: '',
			visible: false,
			nationalerror: '',
			staterror: '',
			cityerror: '',
			streeterror: '',
			postalerror: '',
			telephoneerror: '',
			titleerror: '',
			phonenumbererror: '',
			nameerror: '',
			Surnameerror: '',
			doberror: '',
			gendererror: '',
			emailerror: '',
			Forenameerror: '',
			streetNumbererror : ''
		});

		const {
			title,
			country,
			dob,
			nationality,
			postalcode,
			streetname,
			street_number,
			state,
			city,
			position,
			telephone,
			gender,
			phonenumber,
			Forename,
			Surname,
			userid,
			token,
			navigation,
			userData,
			userdata
		} = this.props;
		const {
			countryerror,
			visible,
			nationalerror,
			staterror,
			cityerror,
			streeterror,
			postalerror,
			telephoneerror,
			titleerror,
			phonenumbererror,
			nameerror,
			Surnameerror,
			doberror,
			gendererror,
			streetNumbererror
		} = this.state;
		console.log('userData',userdata)
		console.log(this.props);
		if (!title.value && !title.id) {
			this.setState({ titleerror: 'Please selct one' });
			Toast.show({
				text: 'Please selct title',
				buttonText: 'Okay',
				type: 'danger',
			});
			return;
		}

		if (Forename.length === 0) {
			this.setState({ Forenameerror: 'Please enter forename' });
			Toast.show({
				text: 'Please enter forename',
				buttonText: 'Okay',
				type: 'danger',
			});
			return;
		}
		if (!Regex.validateString(Forename)) {
			this.setState({ Forenameerror: 'Forename is not  valid' });
			Toast.show({
				text: 'Forename is not  valid',
				buttonText: 'Okay',
				type: 'danger',
			});
			return;
		}
		if (Surname.length === 0) {
			this.setState({ Surnameerror: 'Please enter Surname' });
			Toast.show({
				text: 'Please enter Surname',
				buttonText: 'Okay',
				type: 'danger',
			});
			return;
		}
		if (!Regex.validateString(Surname)) {
			this.setState({ Surnameerror: 'Surname is not a valid' });

			Toast.show({
				text: 'Surname is not a valid',
				buttonText: 'Okay',
				type: 'danger',
			});
			return;
		}
		if (userdata.email.length === 0) {
			this.setState({ emailerror: 'Please enter email' });
			Toast.show({
				text: 'Please enter email',
				buttonText: 'Okay',
				type: 'danger',
			});
			return;
		}
		if (!Regex.validateEmail(userdata.email)) {
			this.setState({ emailerror: 'Email is  not valid' });
			Toast.show({
				text: 'Email is  not valid',
				buttonText: 'Okay',
				type: 'danger',
			});
			return;
		}

		if (phonenumber.length === 0) {
			this.setState({ phonenumbererror: 'Please enter your phonenumber' });
			Toast.show({
				text: 'Please enter your phonenumber',
				buttonText: 'Okay',
				type: 'danger',
			});
			return;
		}

		if (!Regex.validateMobileWithEleventDigit(phonenumber)) {
			this.setState({ phonenumbererror: 'Phone number is not valid' });
			Toast.show({
				text: 'Phone number is not valid',
				buttonText: 'Okay',
				type: 'danger',
			});
			return;
		}
		if (dob.length === 0) {
			this.setState({ doberror: 'Select your date of birth' });
			Toast.show({
				text: 'Select your date of birth',
				buttonText: 'Okay',
				type: 'danger',
			});
			return;
		}
		if (dob === new Date().toJSON().split('T')[0]) {
			this.setState({ doberror: 'Date of Birth should not be current date' });
			Toast.show({
				text: 'Date of Birth should not be current date',
				buttonText: 'Okay',
				type: 'danger',
			});
			return;
		}
		if (gender.length === 0) {
			this.setState({ gendererror: 'Select your gender' });
			Toast.show({
				text: 'Select your gender',
				buttonText: 'Okay',
				type: 'danger',
			});
			return;
		}
		if (!country.hasOwnProperty('id')) {
			this.setState({ countryerror: 'Please select country' });
			Toast.show({
				text: 'Please select country',
				buttonText: 'Okay',
				type: 'danger',
			});
			return;
		}

		if (!nationality.hasOwnProperty('id')) {
			this.setState({ nationalerror: 'Please select nationality' });
			Toast.show({
				text: 'Please select nationality',
				buttonText: 'Okay',
				type: 'danger',
			});
			return;
		}
	

		if (city.length === 0) {
			this.setState({ cityerror: 'Please enter city name' });
			Toast.show({
				text: 'Please enter city name',
				buttonText: 'Okay',
				type: 'danger',
			});
			return;
		}

		if (!Regex.validateString(city)) {
			this.setState({ cityerror: 'City contains invlaid charecter' });
			Toast.show({
				text: 'City contains invlaid charecter',
				buttonText: 'Okay',
				type: 'danger',
			});
			return;
		}
		if (streetname.length === 0) {
			this.setState({ streeterror: 'Please enter street' });
			Toast.show({
				text: 'Please enter street',
				buttonText: 'Okay',
				type: 'danger',
			});
			return;
		}

		if (street_number.length === 0) {
			this.setState({ streetNumbererror: 'Please enter street Number' });
			Toast.show({
				text: 'Please enter street Number',
				buttonText: 'Okay',
				type: 'danger',
			});
			return;
		}

		if (postalcode.legnth === 0) {
			//	alert('lklk');
			this.setState({ postalerror: 'Please enter postal code' });
			Toast.show({
				text: 'Please enter postal code',
				buttonText: 'Okay',
				type: 'danger',
			});
			return;
		}

		if (telephone.length === 0) {
			this.setState({ telephoneerror: 'Please enter telephone number' });
			Toast.show({
				text: 'Please enter telephone number',
				buttonText: 'Okay',
				type: 'danger',
			});
			return;
		}
		if (!Regex.validateMobileWithEleventDigit(telephone)) {
			this.setState({ telephoneerror: 'Phone number is not valid' });
			Toast.show({
				text: 'Phone number is not valid',
				buttonText: 'Okay',
				type: 'danger',
			});
			return;
		}

		let body = {
			user_id: userid,
			api_token: token,
			user: {
				title_id: title.id,
				first_name: Forename,
				last_name: Surname,
				email: userdata.email,
				phone: phonenumber,
				doctor: {
					dob: dob,
					home_telephone: telephone,
					gender_id: gender === 'male' ? 1 : 0,
					street: streetname,
					street_number : street_number,
					// state: state,
					countries_id: country.id,
					nationalities_id: nationality.id,
					post_code: postalcode,
					city: city,
					latitude: position.lat ? position.lat : '',
					longitude: position.long ? position.long : '',
				},
			},
		};
		context.setState({ visible: true });

		RestClient.post('/apis/savePersonalDetails', {}, body).then(response => {
			context.setState({ visible: false });
			console.log(response, 'resposne',this.props);
			if (response.status === 200) {
				toast({ text: response.message });
				
				navigation.navigate('Signupthree');
				this.props.tabUpdate({value: 2});
			
			} else if (response.status === 401) {
				this.props.reset();
				toast({ text: response.message });
				resetNavigationTo('auth', navigation);
			}
		}).catch(err=>{
			console.log("errr",err)
			context.setState({ visible: false });
		});
	};

	_handleFocusNextField = nextField => {
		this.refs[nextField].focus();
	};

	_handleFocusNextField = nextField => {
		this.refs[nextField].focus();
	};
	onFocus = () => {};

	render() {
		console.log("his.props.email",this.props)
		const {
			navigation: { navigate },
			SignupUpdate,
		} = this.props;

		return (
			<View style={{ flex: 1, backgroundColor: '#fff' }}>
				<Tickcomponet step={2} />
				<KeyboardAwareScrollView
			     	extraHeight	 = {moderateScale(200)}
					style={{
						flex: 1,
						backgroundColor: '#fff',
						paddingHorizontal: scale(10),
					}}
				>
					<View
						style={{
							flex: 0.2,
							paddingHorizontal: scale(10),
							paddingTop: verticalScale(2),
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
							Personal Details
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
							maxLength={18}
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
							maxLength={18}
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
							error={this.state.Surnameerror}
							tintColor={'#02B2FE'}
						/>

						<TextField
							maxLength={30}
							ref="email"
							editable={false}
							value={this.props.userdata.email}
							defaultValue={''}
							keyboardType="email-address"
							autoCapitalize="none"
							autoCorrect={false}
							enablesReturnKeyAutomatically={true}
							onFocus={this.onFocus('email')}
							onChangeText={text => SignupUpdate({ prop: 'email', value: text })}
							onSubmitEditing={this._handleFocusNextField.bind(this, 'phonenumber')}
							returnKeyType="next"
							label="Email"
							error={this.state.emailerror}
							tintColor={'#02B2FE'}
						/>
						<TextField
							maxLength={11}
							ref="phonenumber"
							value={this.props.phonenumber ? this.props.phonenumber : ""}
							defaultValue={''}
							keyboardType="numeric"
							autoCapitalize="none"
							autoCorrect={false}
							enablesReturnKeyAutomatically={true}
							onFocus={this.onFocus}
							onChangeText={text => SignupUpdate({ prop: 'phonenumber', value: text })}
							returnKeyType="done"
							label="Phone number"
							error={this.state.phonenumbererror}
							tintColor={'#02B2FE'}
						/>
						<View
							style={{
								height: verticalScale(60),
								width,
								marginRight: 0,

								marginVertical: verticalScale(10),
							}}
						>
							<Text style={{ opacity: 0.7, marginBottom: 15 }}>Date of Birth</Text>
							<DatePickerComponent
								dob={this.props.dob}
								onDateChange={date => SignupUpdate({ prop: 'dob', value: date })}
							/>
							<Text
								style={{
									color: 'rgb(213, 0, 0)',
									fontSize: 12,
									marginVertical: verticalScale(2),
								}}
							>
								{this.state.doberror}
							</Text>
						</View>
						<View
							style={{
								height: verticalScale(70),
								width,
								marginRight: 0,

								marginTop: verticalScale(10),
							}}
						>
							<Text style={{ opacity: 0.7 }}>Gender</Text>

							<View
								style={{
									flexDirection: 'row',
									justifyContent: 'space-around',
									marginRight: scale(150),
									marginTop: verticalScale(10),
								}}
							>
								<Genderfield
									label="male"
									selected={this.props.gender === 'male'}
									onPress={() => SignupUpdate({ prop: 'gender', value: 'male' })}
								/>
								<Genderfield
									label="female"
									selected={this.props.gender === 'female'}
									onPress={() => SignupUpdate({ prop: 'gender', value: 'female' })}
								/>
								{/* <Genderfield
									label="others"
									selected={this.props.gender === 'others'}
									onPress={() => SignupUpdate({ prop: 'gender', value: 'others' })}
								/> */}
							</View>
							<Text
								style={{
									color: 'rgb(213, 0, 0)',
									fontSize: 12,
									marginVertical: verticalScale(2),
								}}
							>
								{this.state.gendererror}
							</Text>
						</View>
						<Dropdown
							error={this.state.countryerror}
							label={'Country'}
							data={countryname}
							fontSize={15}
							pickerStyle={{
								borderWidth: 1,
								borderColor: '#666666',
								borderRadius: 5,
							}}
							value={this.props.country.value}
							itemTextStyle={[
								{
									fontSize: 16,
									fontFamily: fonts.fontPrimaryLight,
								},
							]}
							onChangeText={(value, index) => {
								// console.log(value, country[index].id, "data");
								SignupUpdate({
									prop: 'country',
									value: { value, id: countryname[index].id },
								});
							}}
						/>
						<View style={{ flex: 1 }}>
							<Dropdown
								error={this.state.nationalerror}
								label={'Nationality'}
								data={country}
								fontSize={15}
								pickerStyle={{
									borderWidth: 1,
									borderColor: '#666666',
									borderRadius: 5,
								}}
								value={this.props.nationality.value}
								itemTextStyle={[
									{
										fontSize: 16,
										fontFamily: fonts.fontPrimaryLight,
									},
								]}
								onChangeText={(value, index) => {
									// console.log(value, country[index].id, "data");
									SignupUpdate({
										prop: 'nationality',
										value: { value, id: country[index].id },
									});
								}}
							/>
						</View>

						{/* <TextField
							maxLength={18}
							ref="state"
							value={this.props.state}
							defaultValue={''}
							keyboardType="default"
							autoCapitalize="none"
							autoCorrect={false}
							enablesReturnKeyAutomatically={true}
							onFocus={this.onFocus}
							onChangeText={data => SignupUpdate({ prop: 'state', value: data })}
							onSubmitEditing={this._handleFocusNextField.bind(this, 'city')}
							returnKeyType="next"
							label="State"
							error={this.state.staterror}
							tintColor={'#02B2FE'}
						/> */}
						<TextField
							maxLength={18}
							ref="city"
							value={this.props.city}
							defaultValue={''}
							keyboardType="default"
							autoCapitalize="none"
							autoCorrect={false}
							enablesReturnKeyAutomatically={true}
							onFocus={this.onFocus}
							onChangeText={data => SignupUpdate({ prop: 'city', value: data })}
							onSubmitEditing={this._handleFocusNextField.bind(this, 'street')}
							returnKeyType="next"
							label="City"
							error={this.state.cityerror}
							tintColor={'#02B2FE'}
						/>

						<TextField
							maxLength={18}
							ref="street"
							value={this.props.streetname}
							defaultValue={''}
							keyboardType="default"
							autoCapitalize="none"
							autoCorrect={false}
							enablesReturnKeyAutomatically={true}
							onFocus={this.onFocus}
							onChangeText={data => SignupUpdate({ prop: 'streetname', value: data })}
							onSubmitEditing={this._handleFocusNextField.bind(this, 'streetNumber')}
							returnKeyType="next"
							label="Street Address"
							error={this.state.streeterror}
							tintColor={'#02B2FE'}
						/>
							<TextField
							maxLength={18}
							ref="streetNumber"
							value={this.props.street_number}
							defaultValue={''}
							keyboardType="default"
							autoCapitalize="none"
							autoCorrect={false}
							enablesReturnKeyAutomatically={true}
							onFocus={this.onFocus}
							onChangeText={data => SignupUpdate({ prop: 'street_number', value: data })}
							onSubmitEditing={this._handleFocusNextField.bind(this, 'postalcode')}
							returnKeyType="next"
							label="Street Number"
							error={this.state.streetNumbererror}
							tintColor={'#02B2FE'}
						/>

						<TextField
							maxLength={7}
							ref="postalcode"
							value={this.props.postalcode}
							defaultValue={''}
							keyboardType="default"
							autoCapitalize="none"
							autoCorrect={false}
							enablesReturnKeyAutomatically={true}
							onFocus={this.onFocus}
							onChangeText={data => SignupUpdate({ prop: 'postalcode', value: data })}
							onSubmitEditing={this._handleFocusNextField.bind(this, 'telephone')}
							returnKeyType="done"
							label="Postal code"
							error={this.state.postalerror}
							tintColor={'#02B2FE'}
						/>

						<TextField
							maxLength={11}
							ref="telephone"
							value={this.props.telephone}
							defaultValue={''}
							keyboardType="numeric"
							autoCapitalize="none"
							autoCorrect={false}
							enablesReturnKeyAutomatically={true}
							onFocus={this.onFocus}
							onChangeText={data => SignupUpdate({ prop: 'telephone', value: data })}
							onSubmitEditing={this.onSubmitEmail}
							returnKeyType="done"
							label="Home Tel Number"
							error={this.state.telephoneerror}
							tintColor={'#02B2FE'}
						/>
						<View style={{ width, height: 40 }} />
					</View>
				</KeyboardAwareScrollView>
				<NextButton disabled={this.state.visible} onPress={this.submit} />
				{this.state.visible && (
					<Modal
						backdrop={false}
						isOpen={this.state.visible}
						onClosed={() => this.setState({ visible: false })}
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

							<Text style={{ color: '#02B2FE' }}>Loading ...</Text>
						</View>
					</Modal>
				)}
			</View>
		);
	}
}

const mapStateToProps = ({ SignupReducer, Loginreducer }) => {
	const { userid, token, userdata } = Loginreducer;
	const {
		title,
		country,
		dob,
		nationality,
		postalcode,
		streetname,
		street_number,
		state,
		city,
		position,
		telephone,
		gender,
		phonenumber,
		Forename,
		Surname,
		email,
	} = SignupReducer;
	return {
		country,
		nationality,
		postalcode,
		streetname,
		street_number,
		state,
		city,
		position,
		telephone,
		title,
		dob,
		email,
		gender,
		phonenumber,
		Forename,
		Surname,
		userid,
		token,
		userdata,
	};
};
export default connect(
	mapStateToProps,
	{ SignupUpdate, LocationUpdate, reset ,tabUpdate }
)(SignupFormtwo);
