import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dimensions } from 'react-native';
import OCIcon from 'react-native-vector-icons/Octicons';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import AgendaScreen from './screens/shedule/Agendascreen';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import SIcon from 'react-native-vector-icons/SimpleLineIcons';
import FIcon from 'react-native-vector-icons/Feather';
import { MyProfileStackNavigator } from './screens/profile';
import { HeaderTitle } from './components/HeaderTitle';
const deviceW = Dimensions.get('window').width;

const basePx = 375;

function px2dp(px) {
	return (px * deviceW) / basePx;
}

export default class AppTabNavigator extends Component {
	state = {
		selectedTab: 'Dashboard',
	};

	render() {
		return (
			<TabNavigator
				style={styles.container}
				tabBarStyle={{ height: 70, backgroundColor: 'red', paddingBottom: 20 }}
			>
				<TabNavigator.Item
					selected={this.state.selectedTab === 'Dashboard'}
					title="Dashboard"
					selectedTitleStyle={{ color: '#3496f0' }}
					renderIcon={() => (
						<OCIcon
							containerStyle={{ justifyContent: 'center', alignItems: 'center' }}
							color={'#666'}
							name="home"
							size={25}
						/>
					)}
					renderSelectedIcon={() => (
						<OCIcon
							containerStyle={{ justifyContent: 'center', alignItems: 'center' }}
							color={'#3496f0'}
							name="home"
							size={25}
						/>
					)}
					onPress={() => this.setState({ selectedTab: 'Dashboard' })}
				>
					<View style={{ flex: 1 }}>
						<HeaderTitle title="DoctorsMarket" />
						<ScrollableTabView
							style={{ marginTop: 5 }}
							initialPage={0}
							tabBarUnderlineStyle={{ backgroundColor: '#02B2FE' }}
							tabBarActiveTextColor={'#02B2FE'}
							renderTabBar={() => <ScrollableTabBar />}
						>
							<View style={{ flex: 1, backgroundColor: 'red' }} tabLabel="Dashboard">
								<AgendaScreen />
							</View>
							<View tabLabel="Shedule" />
							<View tabLabel="Job Listing" />
							<View tabLabel="Timelog" />
						</ScrollableTabView>
					</View>
				</TabNavigator.Item>
				<TabNavigator.Item
					selected={this.state.selectedTab === 'Invoices'}
					title="Invoices"
					selectedTitleStyle={{ color: '#3496f0' }}
					renderIcon={() => (
						<MIcon
							containerStyle={{ justifyContent: 'center', alignItems: 'center' }}
							color={'#666'}
							name="local-atm"
							size={28}
						/>
					)}
					renderSelectedIcon={() => (
						<MIcon
							containerStyle={{ justifyContent: 'center', alignItems: 'center' }}
							color={'#3496f0'}
							name="local-atm"
							size={28}
						/>
					)}
					onPress={() => this.setState({ selectedTab: 'Invoices' })}
				>
					<View style={{ flex: 1, backgroundColor: 'yellow' }} />
				</TabNavigator.Item>
				<TabNavigator.Item
					selected={this.state.selectedTab === 'Messages'}
					title="Messages"
					selectedTitleStyle={{ color: '#3496f0' }}
					renderIcon={() => (
						<FIcon
							containerStyle={{ justifyContent: 'center', alignItems: 'center' }}
							color={'#666'}
							name="message-square"
							size={25}
						/>
					)}
					renderSelectedIcon={() => (
						<FIcon
							containerStyle={{ justifyContent: 'center', alignItems: 'center' }}
							color={'#3496f0'}
							name="message-square"
							size={25}
						/>
					)}
					onPress={() => this.setState({ selectedTab: 'Messages' })}
				>
					<View style={{ flex: 1, backgroundColor: 'yellow' }} />
				</TabNavigator.Item>
				<TabNavigator.Item
					selected={this.state.selectedTab === 'MyProfile'}
					title="MyProfile"
					selectedTitleStyle={{ color: '#3496f0' }}
					renderIcon={() => (
						<SIcon
							containerStyle={{ justifyContent: 'center', alignItems: 'center' }}
							color={'#666'}
							name="user"
							size={21}
						/>
					)}
					renderSelectedIcon={() => (
						<SIcon
							containerStyle={{ justifyContent: 'center', alignItems: 'center' }}
							color={'#3496f0'}
							name="user"
							size={21}
						/>
					)}
					onPress={() => this.setState({ selectedTab: 'MyProfile' })}
				>
					<MyProfileStackNavigator />
				</TabNavigator.Item>
			</TabNavigator>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#FFF',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	},
});
