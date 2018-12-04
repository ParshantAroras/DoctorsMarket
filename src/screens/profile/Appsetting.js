import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { HeaderTitle } from '../../components/HeaderTitle';
import { Alertnavigation } from '../../components/alertnavigation';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import { connect } from 'react-redux';
class Appsetting extends Component {
	render() {
		return (
			<View
				style={{
					flex: 1,

					backgroundColor: '#FFFFFF',
				}}
			/>
		);
	}
}

export default Appsetting;
