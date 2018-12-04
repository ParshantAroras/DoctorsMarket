'use strict';
import React, { Component } from 'react';
import { Alert, InteractionManager } from 'react-native';
import Permissions from 'react-native-permissions';
import OpenAppSettings from 'react-native-app-settings';

import Geocoder from 'react-native-geocoder';

Geocoder.fallbackToGoogle('AIzaSyA5m8U4SYKBhV4IldQs409Jv28L3avWYtM');
export function locationfetching() {
	//alert("calling from locaion");
	return new Promise((resolve, reject) => {
		setTimeout(function() {
			reject(Error('Error fetching data.'));
		}, 5000);

		Permissions.check('location').then(response => {
			if (response === 'authorized') {
				//	alert('lpp');
				navigator.geolocation.watchPosition(success => {
					Geocoder.geocodePosition({
						lat: success.coords.latitude,
						lng: success.coords.longitude,
					}).then(res => {
						resolve(res);
					});
				});
			} else {
				reject(Error('Error fetching data.'));
				Alert.alert(
					'Permissions Request',
					'Please go to Settings > Applications > Doctors Market > Permissions >Location allow Doctors Market to access your location',
					[
						{ text: 'Settings', onPress: () => OpenAppSettings.open() },
						{ text: 'cancel', onPress: () => console.log('cancelled') },
					],
					{ cancelable: false }
				);
			}
		});
	});
}
