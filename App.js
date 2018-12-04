/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Root } from 'native-base';
import { Platform, StyleSheet, Text, View, StatusBar, DeviceEventEmitter, ActivityIndicator } from 'react-native';
import AppNavigation from './src/AppNavigation';
import Toast, { DURATION } from 'react-native-easy-toast';
import configureStore from './src/store/configureStore';
import { Provider } from 'react-redux';
import Spinner from './src/components/spinner';
import SplashScreen from 'react-native-smart-splash-screen';
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default class App extends Component<{}> {
	constructor(props) {
		super(props);
		this.state = {
			load: true,
			store: null,
		};
	}
	async componentWillMount() {
		const store = await configureStore();
		this.setState({ store });
		console.log(store, 'store');
	}
	componentDidMount() {
		SplashScreen.close({
			animationType: SplashScreen.animationType.fade,
			duration: 850,
			delay: 500,
		});
		this.showToastListener = DeviceEventEmitter.addListener('showToast', text => {
			this.toast.show(text, 3000);
		});
	}

	render() {
		console.ignoredYellowBox = ['Warning:'];
		if (this.state.store == null) {
			return (
				<View
					style={{
						flex: 1,
						backgroundColor: 'transparent',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<ActivityIndicator color={'#02B2FE'} size={'large'} />

					<Text style={{ color: '#02B2FE' }}>Starting Doctors App..</Text>
				</View>
			);
		}
		return (
			<Root>
				<Provider store={this.state.store}>
					<View style={styles.container}>
						<StatusBar barStyle="light-content" backgroundColor="white" translucent animated />
						<AppNavigation />
						<Toast
							position={'bottom'}
							ref={ref => (this.toast = ref)}
							opacity={0.7}
							textStyle={{ fontSize: 12 }}
							style={{
								backgroundColor: '#02B2FE',
								borderRadius: 100,
								bottom: 1,
								paddingBottom: 10,
							}}
						/>
					</View>
				</Provider>
			</Root>
		);
	}
}
