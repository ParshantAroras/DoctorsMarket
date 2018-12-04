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
import { contactdetailupdate, reset } from '../../actions/Loginactions';
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
import Button from '../../components/button';
import RestClient from '../../utils/restclient';
import { resetNavigationTo } from '../../utils';
class Contactdetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			country: this.props.userdata.country ? this.props.userdata.country : '',
			county: this.props.userdata.county ? this.props.userdata.county : '',
			town: this.props.userdata.town ? this.props.userdata.town : '',
			street: this.props.userdata.street ? this.props.userdata.street : '',
			postcode: this.props.userdata.postcode ? this.props.userdata.postcode : '',
			home_tel_no: this.props.userdata.home_tel_no ? this.props.userdata.home_tel_no : '',
			countryerror: '',
			visible: false,
			nationalerror: '',
			staterror: '',
			cityerror: '',
			streeterror: '',
			postalerror: '',
			telephoneerror: '',
			nationality: { value: '', id: '' },
			loader: false,
		};
	}

	async componentWillMount() {
		const { userdata } = this.props;
		var result = country.find(obj => {
			//  console.log(obj.id, userdata.locum_specialties_id);
			return obj.id == userdata.nationalities_id;
		});
		console.log(result);
		this.setState({ nationality: result });
	}

	onSubmit = () => {
		Keyboard.dismiss();
		this.setState({
			countryerror: '',
			nationalerror: '',
			staterror: '',
			cityerror: '',
			streeterror: '',
			postalerror: '',
			telephoneerror: '',
		});

		const {
			country,
			county,
			town,
			nationality,
			street,
			postcode,
			home_tel_no,
			countryerror,
			nationalerror,
			staterror,
			cityerror,
			streeterror,
			postalerror,
			telephoneerror,
		} = this.state;
		const { navigation } = this.props;
		if (country.length === 0) {
			this.setState({
				countryerror: 'Please fill the country name',
			});
			return;
		}

		if (country.length > 2 && !Regex.validateString(country)) {
			this.setState({
				countryerror: 'Country name contain illegal charecter',
			});
			return;
		}

		if (county.length === 0) {
			this.setState({
				staterror: 'Please fill the state name',
			});
			return;
		}

		if (county.length > 2 && !Regex.validateString(county)) {
			this.setState({
				staterror: 'County name contain illegal charecter',
			});
			return;
		}

		if (!nationality.value && !nationality.id) {
			this.setState({
				nationalerror: 'Please select nationality',
			});
			return;
		}

		if (town.length === 0) {
			this.setState({
				cityerror: 'Please fill city name',
			});
			return;
		}

		if (town.length > 16) {
			this.setState({
				cityerror: 'City name exeed the limit',
			});
			return;
		}

		if ((!town && town.length > 2) || /^\s*$/.test(town)) {
			this.setState({
				cityerror: 'City name contains illegal charecter',
			});
			return;
		}

		if (street.length === 0) {
			this.setState({
				streeterror: 'Please fill street name',
			});
			return;
		}

		if ((!street && street.length > 2) || /^\s*$/.test(street)) {
			this.setState({
				streeterror: 'Street name contains illegal charecter',
			});
			return;
		}
		if (street.length > 16) {
			this.setState({
				streeterror: 'Street name exeed the limit',
			});
			return;
		}
		if (postcode.length === 0) {
			this.setState({
				postalerror: 'Please fill street name',
			});
			return;
		}
		if (home_tel_no.length === 0) {
			this.setState({
				telephoneerror: 'Please fill telephone number',
			});
			return;
		}

		if (home_tel_no.length > 2 && !Regex.validateNumbers(home_tel_no)) {
			this.setState({
				telephoneerror: 'Telephone number contains illegal charecter',
			});
			return;
		}
		let body = {
			country,
			nationalities_id: nationality.id,
			county,
			town,
			street,
			postcode,
			home_tel_no,
			id: this.props.userid,
			api_token: this.props.token,
		};
		console.log(body);
		this.setState({ loader: true });
		RestClient.post('/apis/updateContactDetails', {}, body).then(response => {
			console.log(response, 'resposne');
			if (response.status === 200) {
				this.props.contactdetailupdate(response.data);
				toast({ text: response.message });
				this.setState({ loader: false });
			} else if (response.status === 401) {
				this.props.reset();
				resetNavigationTo('auth', navigation);
				toast({ text: response.message });
			} else {
				toast({ text: response.message });
				this.setState({ loader: false });
			}
			//this.props.profiledetailupdate(response.data);
		});

		//	navigate('Signupthree');
	};

	_handleFocusNextField = nextField => {
		this.refs[nextField].focus();
	};

	render() {
		//alert(this.state.visible);
		// console.log(this.props.position, "streetname");
		const {
			navigation: { navigate },
			SignupUpdate,
		} = this.props;

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
						<TextField
							ref="country"
							value={this.state.country}
							defaultValue={''}
							keyboardType="default"
							autoCapitalize="none"
							autoCorrect={false}
							enablesReturnKeyAutomatically={true}
							onFocus={this.onFocus}
							onChangeText={data => this.setState({ country: data })}
							onSubmitEditing={() => this.refs['country'].blur()}
							returnKeyType="next"
							label="Country"
							disabled={false}
							error={this.state.countryerror}
							tintColor={'#02B2FE'}
						/>
						<View style={{ flex: 1 }}>
							<Dropdown
								error={this.state.nationalerror}
								label={'Select Nationalty'}
								data={country}
								fontSize={15}
								pickerStyle={{
									borderWidth: 1,
									borderColor: '#666666',
									borderRadius: 5,
								}}
								value={this.state.nationality.value}
								itemTextStyle={[
									{
										fontSize: 16,
										fontFamily: fonts.fontPrimaryLight,
									},
								]}
								onChangeText={(value, index) => {
									this.setState({ nationality: { value, id: country[index].id } });
								}}
							/>
						</View>

						<TextField
							ref="state"
							value={this.state.county}
							defaultValue={''}
							keyboardType="default"
							autoCapitalize="none"
							autoCorrect={false}
							enablesReturnKeyAutomatically={true}
							onFocus={this.onFocus}
							onChangeText={data => this.setState({ county: data })}
							onSubmitEditing={this._handleFocusNextField.bind(this, 'city')}
							returnKeyType="next"
							label="County"
							error={this.state.staterror}
							tintColor={'#02B2FE'}
						/>
						<TextField
							ref="city"
							value={this.state.town}
							defaultValue={''}
							keyboardType="default"
							autoCapitalize="none"
							autoCorrect={false}
							enablesReturnKeyAutomatically={true}
							onFocus={this.onFocus}
							onChangeText={data => this.setState({ town: data })}
							onSubmitEditing={this._handleFocusNextField.bind(this, 'street')}
							returnKeyType="next"
							label="City"
							error={this.state.cityerror}
							tintColor={'#02B2FE'}
						/>

						<TextField
							ref="street"
							value={this.state.street}
							defaultValue={''}
							keyboardType="default"
							autoCapitalize="none"
							autoCorrect={false}
							enablesReturnKeyAutomatically={true}
							onFocus={this.onFocus}
							onChangeText={data => this.setState({ street: data })}
							onSubmitEditing={this._handleFocusNextField.bind(this, 'postalcode')}
							returnKeyType="next"
							label="Street name"
							error={this.state.streeterror}
							tintColor={'#02B2FE'}
						/>

						<TextField
							ref="postalcode"
							value={this.state.postcode}
							defaultValue={''}
							keyboardType="numeric"
							autoCapitalize="none"
							autoCorrect={false}
							enablesReturnKeyAutomatically={true}
							onFocus={this.onFocus}
							onChangeText={data => this.setState({ postcode: data })}
							onSubmitEditing={this._handleFocusNextField.bind(this, 'telephone')}
							returnKeyType="done"
							label="Postal code"
							error={this.state.postalerror}
							tintColor={'#02B2FE'}
						/>

						<TextField
							ref="telephone"
							value={this.state.home_tel_no}
							defaultValue={''}
							keyboardType="numeric"
							autoCapitalize="none"
							autoCorrect={false}
							enablesReturnKeyAutomatically={true}
							onFocus={this.onFocus}
							onChangeText={data => this.setState({ home_tel_no: data })}
							onSubmitEditing={this.onSubmitEmail}
							returnKeyType="done"
							label="Telephone"
							error={this.state.telephoneerror}
							tintColor={'#02B2FE'}
						/>

						<View
							style={{
								flex: 0.2,
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<Button
								label={'SAVE'}
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
						<View style={{ width, height: 40 }} />
					</View>
					{this.state.loader && <Spinner visible={this.state.loader} text={'Changing details....'} />}
				</KeyboardAwareScrollView>
			</View>
		);
	}
}

const mapStateToProps = ({ Loginreducer }) => {
	const { userid, token, userdata } = Loginreducer;
	return {
		userid,
		token,
		userdata,
	};
};
export default connect(
	mapStateToProps,
	{ contactdetailupdate, reset }
)(Contactdetail);
