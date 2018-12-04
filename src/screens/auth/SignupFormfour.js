import React, { Component } from 'react';
import { View, Text, Dimensions, ScrollView, TouchableOpacity, DeviceEventEmitter, Platform,ActivityIndicator,Modal,Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import StepIndicatorView from '../../components/stpeindicatorview';
import { colors, normalize, scale, verticalScale, moderateScale, fonts } from '../../config';
import Button from '../../components/button';
//import CheckBox from "../../components/checkbox";
import Icon from 'react-native-vector-icons/FontAwesome';
const { height, width } = Dimensions.get('window');
import CheckBox from 'react-native-modest-checkbox';
import { connect } from 'react-redux';
import { registraion } from '../../actions/Signupactions';
import Spinner from '../../components/spinner';
import RestClient from '../../utils/restclient';
import { toast } from '../../components/toast';
import { resetNavigationTo } from '../../utils';
import Tickcomponet from '../../components/tickcomponent';
class SignupupFormfour extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isChecked: false,
			visible: false,
		};
	}

	handlePressCheckedBox = checked => {
		this.setState({
			isChecked: checked,
		});
	};
	submit = () => {
		let context = this;
		const { SignupReducer, navigation } = this.props;

		let body = {
			user_id: this.props.userid,
			api_token: this.props.token,
		}
		console.log("bodddy",body)
		context.setState({ visible: true });
		RestClient.post('/apis/saveDeclaration', {}, body).then(response => {
			context.setState({ visible: false });
			console.log('login resposne',response);
			resetNavigationTo('Main', navigation);
			
		}).catch((error)=>{
		console.log('error',error)
		context.setState({ visible: false });
		});






	};
	register = () => {
		this.setState({ visible: true });
		const { SignupReducer, navigation } = this.props;
		if (!this.state.isChecked) {
			toast({ text: 'Please accept the terms of service', type: 'danger' });
			return;
		}
		console.log(this.props.SignupReducer, 'sdmnfsdfls');
		//debugger;
	};
	render() {
		return (
			<View
				style={{
					flex: 1,
					backgroundColor: '#fff',
					paddingHorizontal: scale(10),
					paddingTop: verticalScale(5),
				}}
			>
				<Tickcomponet step={6} />
				<View
					style={{
						flex: 0.1,
						paddingHorizontal: scale(10),
						paddingTop: verticalScale(5),
					}}
				>
					<Text
						style={{
							fontFamily: fonts.fontPrimaryLight,
							fontSize: normalize(32),
							color: '#000000',
							opacity: 0.8,
						}}
					>
						Declaration
					</Text>
				</View>
				<View
					style={{
						flex: 0.9,
						marginTop: verticalScale(5),
						marginBottom: verticalScale(5),
					}}
				>
					<ScrollView
						style={{
							flex: 0.5,
							paddingTop: verticalScale(5),
							marginLeft: scale(2),
						}}
					>
						<Text
							style={{
								fontFamily: fonts.fontPrimaryLight,
								fontSize: normalize(15),
								marginHorizontal: scale(10),
								color: '#000000',
								opacity: 0.8,
								textAlign: 'left',
							}}
						>I confirm my consent to the use and processing of personal details, including sensitive data, by the data controllers at Doctors Market Ltd and relevant third parties for the following purposes:
					   </Text>
						 <Text style={{
								fontFamily: fonts.fontPrimaryLight,
								fontSize: normalize(15),
								marginHorizontal: scale(10),
								color: '#000000',
								opacity: 0.8,
								textAlign: 'left',
							}}>Registration of my services with the data controllers.</Text>
						<View style={{flexDirection : 'row'}}><Image
							source={require('../../images/circle.jpg')}
							style={{ width: 15, height: 14, marginLeft: moderateScale(10),marginTop : moderateScale(5) }}
						/><Text style={{
								fontFamily: fonts.fontPrimaryLight,
								fontSize: normalize(15),
								marginHorizontal: scale(10),
								color: '#000000',
								opacity: 0.8,
								textAlign: 'left',
							}}>Associated administration, including but not limited to policy and claims administration </Text></View>
						<View style={{flexDirection : 'row'}}><Image
							source={require('../../images/circle.jpg')}
							style={{ width: 15, height: 14, marginLeft: moderateScale(10),marginTop : moderateScale(5) }}
						/><Text style={{
								fontFamily: fonts.fontPrimaryLight,
								fontSize: normalize(15),
								marginHorizontal: scale(10),
								color: '#000000',
								opacity: 0.8,
								textAlign: 'left',
							}}>Fraud prevention</Text></View>
						<View style={{flexDirection : 'row'}}><Image
							source={require('../../images/circle.jpg')}
							style={{ width: 15, height: 14, marginLeft: moderateScale(10),marginTop : moderateScale(5) }}
						/><Text style={{
								fontFamily: fonts.fontPrimaryLight,
								fontSize: normalize(15),
								marginHorizontal: scale(10),
								color: '#000000',
								opacity: 0.8,
								textAlign: 'left',
							}}>Payment for my services</Text></View>
						<View style={{flexDirection : 'row'}}><Image
							source={require('../../images/circle.jpg')}
							style={{ width: 15, height: 14, marginLeft: moderateScale(10),marginTop : moderateScale(5) }}
						/><Text style={{
								fontFamily: fonts.fontPrimaryLight,
								fontSize: normalize(15),
								marginHorizontal: scale(10),
								color: '#000000',
								opacity: 0.8,
								textAlign: 'left',
							}}>Enquiries into my professional practice in connection with my registration.</Text></View>
						<Text style={{
								fontFamily: fonts.fontPrimaryLight,
								fontSize: normalize(15),
								marginHorizontal: scale(10),
								color: '#000000',
								opacity: 0.8,
								textAlign: 'left',
							}}>I will inform Doctors’ Market Ltd immediately if my employment with the NHS or any other employer is suspended or terminated for whatever reason and/or if my GMC/or appropriate governing bodies’ registration is changed for whatever reason.  I will inform Doctors Market should any of the details submitted on this form change.
	
						</Text>
					</ScrollView>
					<View
						style={{
							flex: 0.2,
							alignItems: 'flex-start',
							justifyContent: 'center',
							paddingLeft: scale(10),
						}}
					>
						{/* <CheckBox
							label="I accept the Declaration"
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
						/> */}
					</View>
					<View
						style={{
							flex: 0.3,

							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<Button
							label={'SUBMIT'}
							disabled={false}
							onPress={this.submit}
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
									marginBottom: verticalScale(10),
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
				</View>
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
				{/* {this.props.loader && <Spinner visible={this.props.loader} text={'Signing....'} />} */}
			</View>
		);
	}
}

const mapStateToProps = ({ SignupReducer , Loginreducer}) => {
	const { userid, token } = Loginreducer;
	const { loader } = SignupReducer;
	return {
		SignupReducer,
		loader,
		userid,
		token
	};
};

export default connect(
	mapStateToProps,
	{ registraion }
)(SignupupFormfour);
