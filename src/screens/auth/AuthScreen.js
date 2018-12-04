import React, { Component } from 'react';
import {
	Modal,
	ActivityIndicator,
	Text,
	View,
	Image,
	DeviceEventEmitter,
	TouchableOpacity,
	Dimensions,
	Platform,
} from 'react-native';
import Swiper from 'react-native-swiper';
import OpenAppSettings from 'react-native-app-settings';
import { Icon } from 'react-native-elements';
import Button from '../../components/button';
import { intialState } from '../../actions/Signupactions';
import { ViewContainer } from '../../components/viewcontainer';
import { colors, normalize, scale, verticalScale, moderateScale, fonts } from '../../config';
import { resetNavigationTo } from '../../utils';
import { Images } from '../../Themes/Images';
const { height, width } = Dimensions.get('window');
import { connect } from 'react-redux';
import FCM, { FCMEvent, NotificationActionType } from 'react-native-fcm';
import { SignupUpdate } from '../../actions/Signupactions';

//import Button from "../../components/button";
const styles = {
	wrapper: {},
	slide1: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#9DD6EB',
	},
	slide2: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#97CAE5',
	},
	slide3: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#92BBD9',
	},
	text: {
		color: '#fff',
		fontSize: 30,
		fontWeight: 'bold',
	},
};

class AuthScreen extends Component {
	constructor(props) {
		super(props);
	}

	async componentWillMount() {
		const { SignupUpdate } = this.props;

		/*	let a1 = [{ a: 1, b: 2 }, { a: 3, b: 6 }, { a: 1, b: 4 }];
		let a2 = [{ a: 1, b: 6 }, { a: 1, b: 11 }];
		a2.map((item1, index) => {
			a1.map(item2 => {
				if (item2.b == item1.b) {
					a2.splice(index, 1);
				}
			});
		});
		console.log(a2);

		debugger;
		*/

		/*	FCM.getFCMToken().then(token => {
			console.log('TOKEN (getFCMToken)', token);
			if (token) {
				SignupUpdate({ prop: 'device_token', value: token });
			}
			// this.setState({ token: token || "" });
		});
		*/
	}

	loginUser = () => {
		//alert("koo")
		const {
			navigation: { navigate },
		} = this.props;

		navigate('Login');
	};
	registerUser = () => {
		this.props.intialState();
		const {
			navigation: { navigate },
		} = this.props;
		navigate('Signupone');
	};

	render() {
		return (
			<View style={{ flex: 1, backgroundColor: '#fff' }}>
				<View
					style={{
						flex: 0.3,
						paddingTop: 45,
						paddingLeft: 36,
						alignItems: 'flex-start',
						justifyContent: 'center',
					}}
				>
					<Image source={require('../../images/monogram.png')} style={{ width: 45, height: 80 }} />
				</View>
				<View style={{ flex: 0.2, paddingLeft: 36 }}>
					<Text
						style={{
							fontFamily: fonts.fontPrimaryLight,
							textAlign: 'left',
							fontSize: normalize(30),
							color: '#000000',
							opacity: 0.4,
						}}
					>
						Welcome to
					</Text>
					<Text
						style={{
							fontFamily: fonts.fontPrimaryLight,
							textAlign: 'left',
							fontSize: normalize(30),
							color: '#000000',
							opacity: 0.4,
						}}
					>
						Doctors Market
					</Text>
				</View>
				<View
					style={{
						flex: 0.4,
						alignItems: 'center',
						justifyContent: 'flex-start',
					}}
				>
					<Button
						label={'LOGIN'}
						disabled={false}
						onPress={() => this.loginUser()}
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

					<TouchableOpacity
						style={{
							height: verticalScale(50),
							width: width - 70,
							alignItems: 'center',
							justifyContent: 'center',
							borderRadius: 5,
							paddingLeft: 15,
							paddingRight: 15,
							borderRadius: 50,
							marginVertical: 5,
							backgroundColor: '#fff',
							borderWidth: 1,
							borderColor: '#02B2FE',
							marginTop: verticalScale(18),
						}}
						onPress={() => this.registerUser()}
					>
						<Text
							style={{
								fontFamily: fonts.fontPrimaryBold,
								color: '#02B2FE',
								letterSpacing: 5,
							}}
						>
							REGISTER NOW
						</Text>
					</TouchableOpacity>
				</View>
				<View
					style={{
						flex: 0.2,
						alignItems: 'center',
						justifyContent: 'flex-end',
					}}
				>
					{/* <Text
						onPress={() => alert('privacy')}
						style={{
							textAlign: 'center',
							marginBottom: verticalScale(40),
							marginHorizontal: scale(35),
							fontFamily: fonts.fontPrimaryLight,
							opacity: 0.5,
						}}
					>
						By tapping on Register Now, I agree to Doctors Market's Terms of Service & Privacy Policy.
					</Text> */}
				</View>
			</View>
		);
	}
}
export default connect(
	null,
	{ intialState, SignupUpdate }
)(AuthScreen);
