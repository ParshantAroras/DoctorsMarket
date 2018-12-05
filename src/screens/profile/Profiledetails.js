import React, { Component } from 'react';
import { View, Text, Dimensions, Keyboard } from 'react-native';
import { colors, normalize, scale, verticalScale, moderateScale, fonts } from '../../config';
const { height, width } = Dimensions.get('window');
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { TextField } from 'react-native-material-textfield';
import Genderfield from '../../components/genderfield';
import NextButton from '../../components/nextbutton';
import FormInput from '../../components/FormInput';
import StepIndicatorView from '../../components/stpeindicatorview';
import countryname from '../../utils/countryname';
import country from '../../utils/country';
import { profiledetailupdate, reset } from '../../actions/Loginactions';
import { connect } from 'react-redux';

import Button from '../../components/button';
import { Dropdown } from 'react-native-material-dropdown';

import { toast } from '../../components/toast';	
import Regex from '../../utils/regex';
import RestClient from '../../utils/restclient';
import Spinner from '../../components/spinner';
import { resetNavigationTo } from '../../utils';
import DatePickerComponent from '../../components/datepicker';
import title from '../../utils/titles';
import { Toast } from 'native-base';
import moment from 'moment';
import Events from '../../utils/Events';


class ProfileDetail extends Component {
	constructor(props) {
		super(props);
		let {first_name,last_name,email,phone,title_id,doctor: {countries_id,dob,nationalities_id,city,street,street_number,post_code,home_telephone,gender_id} } = this.props.navigation.state.params.profileData;
		
		this.state = {
			titleValue: title[title_id-1].value,
			titleId: title_id,
			Forename: first_name ? first_name : '',
			secondname: last_name ? last_name : '',
			Forenameerror: '',
			secondnameerror: '',
			email: email ? email : '',
			emailerror: '',
			phonenumber: phone ? phone : '',
			phonenumbererror: '',
			dob: dob ? moment(dob).format('YYYY-MM-DD') : '',
			doberror: '',
			countryerror: '',
			nationalerror: '',
			cityerror: '',
			streeterror: '',
			streetNumbererror: '',
			postalerror: '',
			telephoneerror: '',
			nationalityId: nationalities_id,
			nationalityValue : country[nationalities_id-1].value,
			countryId: countries_id,
			countryValue: countryname[countries_id-1].value,
			city,
			streetname : street,
			gender_id,
			street_number,
			postalcode : post_code,
			telephone: home_telephone,
			loader: false,
			disable : true
		};
	}
	componentDidMount(){
		Events.on('backButtonPage', this.backButtonPage);
		Events.on('editButtonPage', this.editButtonPage);

	}
	componentWillUnmount(){
		Events.removeListener('backButtonPage', this.backButtonPage);
		Events.removeListener('editButtonPage', this.editButtonPage);
	}
	backButtonPage=(data)=>{
		this.props.navigation.pop();
	}
	editButtonPage=(data)=>{
		this.setState({disable: false})
	}
	onFocus = () => {};
	save = () => {
		//	alert();
		Keyboard.dismiss();
		let context = this;
		this.setState({
			Forenameerror: '',
			secondnameerror: '',
			emailerror: '',
			phonenumbererror: '',
			titleerror: '',		
			doberror: '',
			countryerror: '',
			nationalerror: '',
			cityerror: '',
			streeterror: '',
			streetNumbererror: '',
			postalerror: '',
			telephoneerror: '',
		});
		const { userid, token, navigation } = this.props;

		const {
			Forename,
			secondname,
			titleValue,
			titleId,
			Forenameerror,
			secondnameerror,
			email,
			emailerror,
			phonenumber,
			phonenumbererror,
			dob,
			doberror,
			countryId,
			countryValue,
			countryerror,
			nationalityId,
			nationalityValue,
			city,
			cityerror,
			streetname,
			streeterror,
			street_number,
			streetNumbererror,
			postalcode,
			postalerror,
			telephone,
			telephoneerror,
			gender_id
		} = this.state;
		if (!titleValue && !titleId) {
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
		if (secondname.length === 0) {
			this.setState({ secondnameerror: 'Please enter Surname' });
			Toast.show({
				text: 'Please enter Surname',
				buttonText: 'Okay',
				type: 'danger',
			});
			return;
		}
		if (!Regex.validateString(secondname)) {
			this.setState({ secondnameerror: 'Surname is not a valid' });

			Toast.show({
				text: 'Surname is not a valid',
				buttonText: 'Okay',
				type: 'danger',
			});
			return;
		}

		if (email.length === 0) {
			this.setState({ emailerror: 'Please enter email' });
			Toast.show({
				text: 'Please enter email',
				buttonText: 'Okay',
				type: 'danger',
			});
			return;
		}
		if (!Regex.validateEmail(email)) {
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
		if (!countryValue && !countryId) {
			this.setState({ countryerror: 'Please select country' });
			Toast.show({
				text: 'Please select country',
				buttonText: 'Okay',
				type: 'danger',
			});
			return;
		}
		if (!nationalityId && !nationalityValue) {
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
		if (postalcode.length == 0) {
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
				title_id: titleId,
				first_name: Forename,
				last_name: secondname,
				email: email,
				phone: phonenumber,
				doctor: {
					dob: dob,
					home_telephone: telephone,
					gender_id: gender_id ? 1 : 0,
					street: streetname,
					street_number : street_number,
					// state: state,
					countries_id: countryId,
					nationalities_id: nationalityId,
					post_code: postalcode,
					city: city
					// latitude: position.lat ? position.lat : '',
					// longitude: position.long ? position.long : '',
				},
			},
		};

		this.setState({ loader: true });


		RestClient.post('/apis/savePersonalDetails', {}, body).then(response => {
			context.setState({ visible: false });
			console.log(response, 'resposne',this.props);
			if (response.status === 200) {
				navigation.pop();
				toast({ text: response.message });
				// navigation.navigate('Signupthree');
			} else if (response.status === 401) {
	
				toast({ text: response.message });
			
			}
		}).catch(err=>{
			console.log("errr",err)
			context.setState({ visible: false });
		});
	};
	_handleFocusNextField = nextField => {
		this.refs[nextField].focus();
	};

	render() {
		console.log(this.props.userdata, 'userdata');
		let context = this;
		const {
			navigation: { navigate },
			SignupUpdate,
		} = this.props;
		let { error, validemail,disable } = this.state;
		console.log(validemail, 'validemail');
		return (
			<View style={{ flex: 1, backgroundColor: '#fff' }}>
				<KeyboardAwareScrollView
					style={{
						flex: 1,
						backgroundColor: '#fff',
						paddingHorizontal: scale(10),
						paddingTop: verticalScale(18),
					}}
				>

					<View style={{ flex: 0.8, paddingHorizontal: scale(10) }}>
						<Dropdown
								error={this.state.titleerror}
								label={'Title'}
								data={title}
								fontSize={15}
								disabled={disable}
								pickerStyle={{
									borderWidth: 1,
									borderColor: '#666666',
									borderRadius: 5,
								}}
								value={this.state.titleValue}
								itemTextStyle={[
									{
										fontSize: 16,
										fontFamily: fonts.fontPrimaryLight,
									},
								]}
								onChangeText={(value, index) => {
									context.setState({titleId: title[index].id, titleValue: title[index].value})
								}}
							/>
						<TextField
							maxLength={18}
							ref={this.Forename}
							value={this.state.Forename}
							disabled={disable}
							defaultValue={''}
							keyboardType="default"
							autoCapitalize="sentences"
							autoCorrect={false}
							enablesReturnKeyAutomatically={true}
							onFocus={this.onFocus}
							onChangeText={text => this.setState({ Forename: text })}
							onSubmitEditing={this._handleFocusNextField.bind(this, 'Surname')}
							returnKeyType="next"
							label="First name"
							error={this.state.Forenameerror}
							tintColor={'#02B2FE'}
						/>

						<TextField
					    	maxLength={18}
							ref="Surname"
							value={this.state.secondname}
							defaultValue={''}
							disabled={disable}
							keyboardType="default"
							autoCapitalize="sentences"
							autoCorrect={false}
							enablesReturnKeyAutomatically={true}
							onFocus={this.onFocus}
							onChangeText={text => this.setState({ secondname: text })}
							onSubmitEditing={this._handleFocusNextField.bind(this, 'email')}
							returnKeyType="next"
							label="Last name"
							error={this.state.secondnameerror}
							tintColor={'#02B2FE'}
						/>

						<TextField
					     	maxLength={30}
							ref="email"
							value={this.state.email}
							editable={false}
							disabled={disable}
							defaultValue={''}
							keyboardType="default"
							autoCapitalize="sentences"
							autoCorrect={false}
							enablesReturnKeyAutomatically={true}
							onFocus={this.onFocus}
							onChangeText={text => this.setState({ email: text })}
							onSubmitEditing={this._handleFocusNextField.bind(this, 'phonenumber')}
							returnKeyType="next"
							label="Email Adress"
							error={this.state.emailerror}
							tintColor={'#02B2FE'}
						/>

						<TextField
							maxLength={11}
							ref="phonenumber"
							value={this.state.phonenumber}
							defaultValue={''}
							disabled={disable}
							keyboardType="numeric"
							autoCapitalize="none"
							autoCorrect={false}
							enablesReturnKeyAutomatically={true}
							onFocus={this.onFocus}
							onChangeText={text => this.setState({ phonenumber: text })}
							onSubmitEditing={() => {
								Keyboard.dismiss();
							}}
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
						        disabled={disable}
								dob={this.state.dob}
								onDateChange={date => this.setState({ dob: date })}
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
									selected={this.state.gender_id === true}
									onPress={() => {!disable &&context.setState({gender_id : true})}}
								/>
								<Genderfield
									label="female"
									selected={this.state.gender_id === false}
									onPress={() => {!disable &&context.setState({gender_id : false})}}
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
							disabled={disable}
							pickerStyle={{
								borderWidth: 1,
								borderColor: '#666666',
								borderRadius: 5,
							}}
							value={this.state.countryValue}
							itemTextStyle={[
								{
									fontSize: 16,
									fontFamily: fonts.fontPrimaryLight,
								},
							]}
							onChangeText={(value, index) => {
								context.setState({countryId: countryname[index].id, countryValue: countryname[index].value})
							}}
						/>
						<View style={{ flex: 1 }}>
							<Dropdown
								error={this.state.nationalerror}
								label={'Nationality'}
								data={country}
								disabled={disable}
								fontSize={15}
								pickerStyle={{
									borderWidth: 1,
									borderColor: '#666666',
									borderRadius: 5,
								}}
								value={this.state.nationalityValue}
								itemTextStyle={[
									{
										fontSize: 16,
										fontFamily: fonts.fontPrimaryLight,
									},
								]}
								onChangeText={(value, index) => {
									context.setState({nationalityId: country[index].id, nationalityValue: country[index].value})
								}}
							/>
						</View>
						<TextField
							maxLength={18}
							ref="city"
							value={this.state.city}
							defaultValue={''}
							disabled={disable}
							keyboardType="default"
							autoCapitalize="none"
							autoCorrect={false}
							enablesReturnKeyAutomatically={true}
							onFocus={this.onFocus}
							onChangeText={text => this.setState({ city: text })}
							onSubmitEditing={this._handleFocusNextField.bind(this, 'street')}
							returnKeyType="next"
							label="City"
							error={this.state.cityerror}
							tintColor={'#02B2FE'}
						/>

						<TextField
							maxLength={18}
							ref="street"
							value={this.state.streetname}
							defaultValue={''}
							disabled={disable}
							keyboardType="default"
							autoCapitalize="none"
							autoCorrect={false}
							enablesReturnKeyAutomatically={true}
							onFocus={this.onFocus}
							onChangeText={text => this.setState({ streetname: text })}
							onSubmitEditing={this._handleFocusNextField.bind(this, 'streetNumber')}
							returnKeyType="next"
							label="Street Address"
							error={this.state.streeterror}
							tintColor={'#02B2FE'}
						/>
							<TextField
							maxLength={18}
							ref="streetNumber"
							disabled={disable}
							value={this.state.street_number}
							defaultValue={''}
							keyboardType="default"
							autoCapitalize="none"
							autoCorrect={false}
							enablesReturnKeyAutomatically={true}
							onFocus={this.onFocus}
							onChangeText={text => this.setState({ street_number: text })}
							onSubmitEditing={this._handleFocusNextField.bind(this, 'postalcode')}
							returnKeyType="next"
							label="Street Number"
							error={this.state.streetNumbererror}
							tintColor={'#02B2FE'}
						/>

						<TextField
							maxLength={7}
							ref="postalcode"
							disabled={disable}
							value={this.state.postalcode}
							defaultValue={''}
							keyboardType="default"
							autoCapitalize="none"
							autoCorrect={false}
							enablesReturnKeyAutomatically={true}
							onFocus={this.onFocus}
							onChangeText={text => this.setState({ postalcode: text })}
							onSubmitEditing={this._handleFocusNextField.bind(this, 'telephone')}
							returnKeyType="done"
							label="Postal code"
							error={this.state.postalerror}
							tintColor={'#02B2FE'}
						/>

						<TextField
							maxLength={11}
							ref="telephone"
							disabled={disable}
							value={this.state.telephone}
							defaultValue={''}
							keyboardType="numeric"
							autoCapitalize="none"
							autoCorrect={false}
							enablesReturnKeyAutomatically={true}
							onFocus={this.onFocus}
							onChangeText={text => this.setState({ telephone: text })}
							onSubmitEditing={this.onSubmitEmail}
							returnKeyType="done"
							label="Home Tel Number"
							error={this.state.telephoneerror}
							tintColor={'#02B2FE'}
						/>
						<View style={{ width, height: 40 }} />
					</View>
					{!disable &&<View
						style={{
							flex: 0.2,
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<Button
							label={'SAVE'}
							disabled={false}
							onPress={this.save}
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
					</View>}
				
					<View style={{ width, height: 50, backgroundColor: '#fff' }} />
				</KeyboardAwareScrollView>
				{this.state.loader && <Spinner visible={this.state.loader} text="Changing details..." />}
			</View>
		);
	}
}

const mapStateToProps = ({ Loginreducer }) => {
	const {  userid, token } = Loginreducer;
	return {
		userid,
		token,
	};
};
export default connect(
	mapStateToProps,
	{ profiledetailupdate, reset }
)(ProfileDetail);
