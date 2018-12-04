import React, { Component } from 'react';
import { BackHandler, View, Platform } from 'react-native';
import { connect } from 'react-redux';
import FCM, { FCMEvent, NotificationActionType } from 'react-native-fcm';
import routes from './routes';
import DropdownAlert from 'react-native-dropdownalert';
import { SignupUpdate } from './actions/Signupactions';
import Events from './utils/Events';
import { StackNavigator, TabNavigator, TabBarBottom, NavigationActions } from 'react-navigation';
import { notificationrecieving, deviceTokenSet } from './actions/Notifcationactions';
import idx from './utils/Idx';
import { moderateScale } from './config';
let AppNavigator = null;
let notificationListener;
class AppNavigation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			IsLoading: false,
			rendering: false,
			category: '',
			type: '',
		}
		this.currentRouteName = 'auth';
		this.OnClose = this.OnClose.bind(this);
		this.getNotification = this.getNotification.bind(this);
		this.pushToparticularScreen = this.pushToparticularScreen.bind(this);
	}


	componentDidMount() {
		let context = this;
	// 	setTimeout(()=>{
	// 		// context.dropdown.alertWithType('success', 'Doctors Market','Doctors Marketcontext.dropdowncontext.dropdowncontext.dropdown');
	// 		// console.log('context.dropdown',context.dropdown)
	// //  context.dropdown.alertWithType('success', 'Doctors Market','Doctors Marketcontext.dropdowncontext.dropdowncontext.dropdown');

	// 	},6000)

		const { deviceTokenSet } = this.props;
		BackHandler.addEventListener('hardwareBackPress', () => {
			console.log(this.currentRouteName.routeName);
		});

		if (Platform.OS === 'android') {
			FCM.requestPermissions();
		} else {
			FCM.requestPermissions({ badge: false, sound: true, alert: true })
				.then(() => console.log('granted'))
				.catch(() => console.log('notification permission rejected'));
		}
		console.log('this.propopopopopop', this.props)
		notificationListener = FCM.on(FCMEvent.Notification, notif => {
			context.getNotification(notif)
		});
		FCM.getInitialNotification().then(res => {
			     if(res != undefined || res != null ){
					console.log('this.propsressssssssssssss',res)
					if(Platform.OS == 'android'){
	               	 context.getNotification(res);  
					}
			
				 }
			 
		});
	

		FCM.getFCMToken().then(token => {
			console.log('TOKEN (getFCMToken123)', token);
			if (token) {
				deviceTokenSet(token);
			}
		}).catch(error => {
			console.log('TOKEN (getFCMToke123)', error);
		})
		this.setState({ rendering: true }, () => {

			AppNavigator = StackNavigator(routes, {
				initialRouteName: context.getinitial(),
				headerMode: 'screen',
				cardStyle: {
					backgroundColor: 'transparent',
				},
			}),
				context.setState({ rendering: false })
		})

		//	this.setState({rendering:false})
	}
	componentWillUnmount(){
		notificationListener.remove();
	}

	getinitial = () => {
		//	alert('hjghughjghj')
		const { userid, token, userdata } = this.props;
		if (userid && token) {
			console.log('userdata.doctor', userdata.doctor)
			//return 'Signuptwo';
			if (userdata.doctor === null) return 'auth';
			if (userdata.doctor.profile_tab === 5 || userdata.doctor.profile_tab === 6 || userdata.doctor.profile_tab === '5' || userdata.doctor.profile_tab === '6' ||  userdata.doctor.complete_profile) return 'Main';

			if (userdata.doctor.profile_tab === 1 || userdata.doctor.profile_tab === '1') { return 'Signuptwo'; }
			if (userdata.doctor.profile_tab === 2 || userdata.doctor.profile_tab === '2') {
				return 'Signupthree';
			}
			if (userdata.doctor.profile_tab === 3 || userdata.doctor.profile_tab === '3') { return 'SignupFormStrucProfile'; }
			if (userdata.doctor.profile_tab === 4 || userdata.doctor.profile_tab === '4') { return 'SignupupFormfive'; }
			// else if (userdata.doctor.profile_tab == 5) {return 'Signupfour';}
		} else {
			return 'auth';
		}
		//? (userdata.doctor === null ? : 'Main') : ,
	};

	/*
	Common function for handling notification
	*/

	getNotification(notif) {
		let context = this;
		console.log('notificatioonnnn', notif);
		// if(!notif['gcm.notification.data']){
        //  return;
		// }
		// let Notifdata = JSON.parse(notif['gcm.notification.data']);
		if(!notif['data']){
              return;
		}
		let Notifdata = JSON.parse(notif['data']);
		console.log('Notifdata', Notifdata)
		if (idx(notif, _ => _.opened_from_tray)) {
			context.pushToparticularScreen(Notifdata.category, Notifdata.type);
			//    if(Notifdata.category == "Request" && (Notifdata.type == "sent" || Notifdata.type == "approved" )){
			// 	Events.emit('PushToSpecificScreen', { data: { Screen : 'Jobrequest' } });
			//    }
		} else {
			context.setState({ category: Notifdata.category, type: Notifdata.type })
			if (Platform.OS === 'android') {
				console.log('workinggggg',notif.fcm.body)
				context.dropdown.alertWithType('success', 'Doctors Market', notif.fcm.body);
			} else {
				context.dropdown.alertWithType('success', 'Doctors Market', notif.aps.alert.body);
			}
		}



		//debugger;
		this.props.notificationrecieving();
	}

	/***
	 * Push to particular screen 
	 */
	pushToparticularScreen(category, type) {
		let Screen = '';
		if (category == "Request" && (type == "sent" || type == "approved")) {
			Screen = 'Jobrequest';
			// Events.emit('PushToSpecificScreen', { data: { Screen: 'Jobrequest' } });
		}
		else if (category == "Invoice" && type == "paid"){
			Screen = 'TimeLogs';
		}
		else if(category == "Message" && type == "New Message"){
			Screen = 'Messages';
		}
		Events.emit('PushToSpecificScreen', { data: { Screen } });

	}


	/**
	 * Function call on close of dropdown alert
	 */

	OnClose(data) {
		let context = this;
		let { category, type } = this.state;
		if (data.action == 'tap') {
			context.pushToparticularScreen(category, type);
			// if(category == "Request" && type == "sent"){
			// 	Events.emit('PushToSpecificScreen', { data: { Screen : 'Jobrequest' } });
			//    }
		}
		context.setState({ category: '', type: '' })
	}
	render() {
		const { userid, token, userdata } = this.props;
		let { IsLoading } = this.state;
		console.log('oooooo', routes);
		//debugger;

		if (AppNavigator == null) {
			return (<View style={{ flex: 1 }} />)
		}

		return (
			<View style={{ flex: 1 }}>
				<AppNavigator
					onNavigationStateChange={(prevState, currentState, action) => {
						this.currentRouteName = currentState.routes[currentState.index];
					}}
				/>
				<DropdownAlert
					ref={ref => (this.dropdown = ref)}
					containerStyle={{
						backgroundColor: '#02B2FE',
						elevation: 100						
					}}
					elevation={100}
					closeInterval={6000}
					successColor={'#02B2FE'}
					onClose={data => { this.OnClose(data) }}
				/>
			</View>
		);
	}
}

const mapStateToProps = ({ Loginreducer, Notireducer }) => {
	console.log('Notireducer', Notireducer)
	const { userid, token, userdata } = Loginreducer;
	return {
		userid,
		token,
		userdata,
	};
};

export default connect(
	mapStateToProps,
	{ SignupUpdate, notificationrecieving, deviceTokenSet }
)(AppNavigation);
