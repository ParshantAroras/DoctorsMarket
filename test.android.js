import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Clipboard, Platform, ScrollView } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import { StackNavigator } from 'react-navigation';

import FCM, { FCMEvent, NotificationActionType } from 'react-native-fcm';
import SplashScreen from 'react-native-smart-splash-screen';
import { fonts } from './src/config';
import PDFView from 'react-native-view-pdf';
export default class Test extends Component {
	async componentDidMount() {
		SplashScreen.close({
			animationType: SplashScreen.animationType.fade,
			duration: 850,
			delay: 500,
		});
		try {
			let result = await FCM.requestPermissions({
				badge: false,
				sound: true,
				alert: true,
			});
		} catch (e) {
			console.error(e);
		}
		FCM.getFCMToken().then(token => {
			console.log('TOKEN (getFCMToken)', token);
			// this.setState({ token: token || "" });
		});

		FCM.on(FCMEvent.Notification, notif => {
			this.dropdown.alertWithType('error', 'Error', notif.body);
		});
	}
	render() {
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<PDFView
					fadeInDuration={250.0}
					style={{ width: 500, height: 500 }}
					resource={'https://www.ets.org/Media/Tests/TOEFL/pdf/SampleQuestions.pdf'}
					resourceType={'url'}
					onLoad={() => console.log(`PDF rendered from`)}
					onError={() => console.log('Cannot render PDF', error)}
				/>
			</View>
		);
	}
}
