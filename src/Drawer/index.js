import React, { Component } from 'react';
import {
	Button,
	StyleSheet,
	Text,
	View,
	Dimensions,
	TouchableOpacity,
	Image,
	AsyncStorage,
	Platform,
	TouchableHighlight,
	NativeModules,
	Alert,
} from 'react-native';
const { height, width } = Dimensions.get('window');
import LinearGradient from 'react-native-linear-gradient';
import DrawerItem from './DrawerItem';
import Divider from './Divider';
import { scale, verticalScale, fonts } from '../config';
import { normalize } from 'react-native-elements';
import { connect } from 'react-redux';
import { Logotapi } from '../actions/Loginactions';
import Dash from 'react-native-dash';
import Events from '../utils/Events';

class Drawer extends Component {
	state = { active: 'one', LoadingImage: true, image: null };
	componentDidMount(){
		Events.on('PushToSpecificScreen', this.PushToSpecificScreen);
	}
	componentWillUnmount(){
		Events.removeListener('PushToSpecificScreen', this.PushToSpecificScreen);
	}
	PushToSpecificScreen=({data})=>{
		const {
			navigation: { navigate },
		} = this.props;
		console.log('datatadtadat',data.Screen)
		navigate(data.Screen)
	}
	handleLogout = () => {
		Alert.alert(
			'DoctorsMarket',
			'Do you really want to exit?',
			[
				{ text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
				{ text: 'OK', onPress: this.logoutApi },
			],
			{ cancelable: false }
		);
	};
	logoutApi = () => {
		const { userid, token, navigation } = this.props;
		this.props.Logotapi({ id: userid, token, navigation });
	};
	addshedule = () => {
		this.props.navigation.navigate('Availabilityscreen');
	};

	openWebView=(url)=>{
		console.log('this.props.navigation',this.props.navigation)
		this.props.navigation.navigate('WebViewPage',{
			uri : url
		})
	}
	render() {
		const {
			navigation: { navigate },
		} = this.props;
		return (
			<LinearGradient
				colors={['#00B1FF', '#7EF3C7']}
				style={{ flex: 1 }}
				start={{ x: 0, y: 1 }}
				end={{ x: 0, y: 0 }}
			>
				<View
					style={{
						flex: 0.3,
						alignItems: 'flex-start',
						justifyContent: 'center',
						marginLeft: scale(5),
					}}
				>
					<Image
						source={require('../images/sidemenu.png')}
						resizeMode={'contain'}
						style={{ width: scale(100), height: verticalScale(100) }}
					/>
				</View>
				<View style={{ flex: 0.5, marginLeft: scale(25) }}>
					<DrawerItem label={'Dashboard'} onPress={()=>{ navigate('TimeLog')}} />
					<Dash style={{ width: width, height: 0.5 }} dashColor={'#FFFFFF'} />
					<DrawerItem label={'Availability'} onPress={() => navigate('Availabilityscreen')} />
					<Dash style={{ width: width, height: 0.5 }} dashColor={'#FFFFFF'} />
					<DrawerItem label={'Job Requests'}  onPress={() => navigate('Jobrequest')} />
					<Dash style={{ width: width, height: 0.5 }} dashColor={'#FFFFFF'} />
					{/* <DrawerItem label={'My Schedule'} count={2} onPress={()=>{ navigate('Shedule')}} />
					<Dash style={{ width: width, height: 0.5 }} dashColor={'#FFFFFF'} /> */}
					<DrawerItem label={'TimeLogs'} onPress={()=>{ navigate('TimeLogs')}} />
					<Dash style={{ width: width, height: 0.5 }}  dashColor={'#FFFFFF'} />
					<DrawerItem label={'About Us'} onPress={()=>{ this.openWebView('')}}/>
					<Dash style={{ width: width, height: 0.5 }} dashColor={'#FFFFFF'} />
					<DrawerItem label={'Contact Us'} onPress={()=>{ this.openWebView('/contact_us')}}  />
					{/* <Dash style={{ width: width, height: 0.5 }} dashColor={'#FFFFFF'} />
					<DrawerItem label={'Help & FAQs'} />
					<Dash style={{ width: width, height: 0.5 }} dashColor={'#FFFFFF'} />
					<DrawerItem label={'Terms of Services'} /> */}
					<Dash style={{ width: width, height: 0.5 }} dashColor={'#FFFFFF'} />
					<DrawerItem label={'Logout'} onPress={this.handleLogout} />
				</View>
				<View
					style={{
						flex: 0.2,
						alignItems: 'flex-start',
						justifyContent: 'center',
						marginLeft: scale(25),
					}}
				>
					<Text
						style={{
							textAlign: 'left',
							color: '#FFFFFF',
							fontFamily: fonts.fontPrimaryLight,
							fontSize: normalize(14),
							opacity: 0.54,
						}}
					>
						Copyright©2018 doctorsmarket.co.uk
					</Text>
					<Text
						style={{
							textAlign: 'left',
							color: '#FFFFFF',
							fontFamily: fonts.fontPrimaryLight,
							fontSize: normalize(14),
							opacity: 0.54,
						}}
					>
						All Rights Reserved.
					</Text>
				</View>
			</LinearGradient>
		);
	}
}
const mapStateToProps = ({ Loginreducer }) => {
	const { userid, token } = Loginreducer;
	return {
		userid,
		token,
	};
};
export default connect(
	mapStateToProps,
	{ Logotapi }
)(Drawer);
