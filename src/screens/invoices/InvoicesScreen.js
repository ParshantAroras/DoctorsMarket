import React, { Component } from 'react';
import { View, TouchableOpacity, FlatList, Image, Dimensions, Platform } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { HeaderTitle } from '../../components/HeaderTitle';

import { Card, CardItem, Text, Icon, Right, Content } from 'native-base';
import { scale, verticalScale, fonts } from '../../config';
import { normalize } from 'react-native-elements';
import EIcon from 'react-native-vector-icons/EvilIcons';
import ENIcon from 'react-native-vector-icons/Entypo';
const { height, width } = Dimensions.get('window');
import { Dropdown } from 'react-native-material-dropdown';
import moment from 'moment';
const datavalues = [
	{
		id: '#99523466',
		name: 'British Healthcare',
		status: 1,
		amount: 250,
		time: new Date(),
		imageurl: require('../../images/hospital1.png'),
	},
	{
		id: '#99523466',
		name: 'British Healthcare',
		status: 1,
		amount: 250,
		time: new Date(),
		imageurl: require('../../images/hospital2.png'),
	},
	{
		id: '#99523466',
		name: 'British Healthcare',
		status: 2,
		amount: 250,
		time: new Date(),
		imageurl: require('../../images/hospital3.png'),
	},
	{
		id: '#99523466',
		name: 'British Healthcare',
		status: 3,
		amount: 250,
		time: new Date(),
		imageurl: require('../../images/hospital4.png'),
	},
	{
		id: '#99523466',
		name: 'British Healthcare',
		status: 2,
		amount: 250,
		time: new Date(),
		imageurl: require('../../images/hospital5.png'),
	},
	{
		id: '#99523466',
		name: 'British Healthcare',
		status: 2,
		amount: 250,
		time: new Date(),
		imageurl: require('../../images/hospital4.png'),
	},
	{
		id: '#99523466',
		name: 'British Healthcare',
		status: 2,
		amount: 250,
		time: new Date(),
		imageurl: require('../../images/hospital5.png'),
	},
	{
		id: '#99523466',
		name: 'British Healthcare',
		status: 3,
		amount: 250,
		time: new Date(),
		imageurl: require('../../images/hospital4.png'),
	},
	{
		id: '#99523466',
		name: 'British Healthcare',
		status: 2,
		amount: 250,
		time: new Date(),
		imageurl: require('../../images/hospital5.png'),
	},
];

let options = [
	{
		value: 'All',
		id: 0,
	},
	{
		value: 'Pending',
		id: 1,
	},
	{
		value: 'Approved',
		id: 2,
	},
	{
		value: 'Declined',
		id: 3,
	},
];
export default class InvoicesScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: datavalues,
		};

		this.willFocusSubscription = this.props.navigation.addListener('willFocus', () => {
			fetch('https://facebook.github.io/react-native/movies.json')
				.then(response => response.json())
				.then(responseJson => {
					console.log(responseJson.movies);
				})
				.catch(error => {
					console.error(error);
				});
		});
	}
	iconname = status => {
		switch (status) {
			case 1:
				return 'exclamation';
			case 2:
				return 'check';
			case 3:
				return 'circle-with-cross';
			default:
				return null;
		}
	};

	renderItem = ({ item }) => {
		console.log(item.imageurl);
		return (
			<View
				style={{
					width,
					height: verticalScale(120),
					flexDirection: 'row',
					marginVertical: verticalScale(2),
					borderBottomWidth: Platform.OS == 'ios' ? 0.5 : 0.8,
					borderColor: '#666',
				}}
			>
				<View style={{ flex: 0.3, alignItems: 'center', justifyContent: 'center' }}>
					<Image source={item.imageurl} style={{ width: scale(60), height: verticalScale(68) }} />
				</View>
				<View style={{ flex: 0.7 }}>
					<View style={{ flex: 0.7, flexDirection: 'row' }}>
						<View style={{ flex: 0.7, alignItems: 'flex-start', justifyContent: 'center' }}>
							<Text style={{ fontFamily: fonts.fontPrimaryLight, fontSize: normalize(12) }}>
								{item.id}
							</Text>
							<Text style={{ fontFamily: fonts.fontPrimaryLight, fontSize: normalize(18) }}>
								{item.name}
							</Text>
						</View>
						<View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'flex-start' }}>
							<Text
								style={{
									fontFamily: fonts.fontPrimaryLight,
									opacity: 0.3,
									textAlign: 'left',
									fontSize: normalize(12),
									paddingRight: 30,
								}}
							>
								{moment(item.time).fromNow()}
							</Text>
						</View>
					</View>
					<View
						style={{
							flex: 0.3,
							alignItems: 'center',
							justifyContent: 'space-between',
							flexDirection: 'row',
						}}
					>
						{item.status === 1 && (
							<View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
								<EIcon
									name={this.iconname(item.status)}
									size={16}
									color={'#CEBD2E'}
									style={{ marginTop: verticalScale(4), marginRight: verticalScale(5) }}
								/>
								<Text
									style={{
										fontFamily: fonts.fontPrimaryLight,
										fontSize: normalize(16),
										color: '#CEBD2E',
									}}
								>
									Pending
								</Text>
							</View>
						)}
						{item.status === 2 && (
							<View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
								<EIcon
									name={this.iconname(item.status)}
									size={16}
									color={'#55CC55'}
									style={{ marginTop: verticalScale(4), marginRight: verticalScale(5) }}
								/>
								<Text
									style={{
										fontFamily: fonts.fontPrimaryLight,
										fontSize: normalize(16),
										color: '#55CC55',
									}}
								>
									Approved
								</Text>
							</View>
						)}
						{item.status === 3 && (
							<View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
								<ENIcon
									name={this.iconname(item.status)}
									size={16}
									color={'#FF6363'}
									style={{ marginTop: verticalScale(4), marginRight: verticalScale(5) }}
								/>
								<Text
									style={{
										fontFamily: fonts.fontPrimaryLight,
										fontSize: normalize(16),
										color: '#FF6363',
									}}
								>
									Declined
								</Text>
							</View>
						)}
						<Text style={{ fontFamily: fonts.fontPrimaryLight, paddingRight: 30 }}>{item.amount}$</Text>
					</View>
				</View>
			</View>
		);
	};
	dropdownselection = (value, index, data) => {
		this.setState({ data: datavalues });
		if (index === 0) return;
		//console.log(this.state.data);
		var result = this.state.data.filter(obj => {
			//console.log(obj);

			console.log(obj.status, index);
			return obj.status === index;
		});
		this.setState({ data: result });
		console.log(result, 'result---->');
	};

	render() {
		return (
			<View
				style={{
					flex: 1,

					backgroundColor: '#FFFFFF',
				}}
			>
				<View
					style={{
						height: verticalScale(55),
						width,
						paddingLeft: scale(15),
						paddingTop: verticalScale(8),
						backgroundColor: 'transparent',
						flexDirection: 'row',
					}}
				>
					<Text
						style={{
							color: '#000000',
							opacity: 0.84,
							fontFamily: fonts.fontPrimaryLight,
							fontSize: normalize(36),
						}}
					>
						Invoices
					</Text>
				</View>
				<View
					style={{
						height: verticalScale(50),
						marginHorizontal: scale(15),
						marginBottom: verticalScale(23),
					}}
				>
					<Dropdown
						label="Select option"
						data={options}
						itemTextStyle={{ fontFamily: fonts.fontPrimaryLight }}
						onChangeText={this.dropdownselection}
					/>
				</View>
				<View style={{ flex: 1 }}>
					<FlatList
						style={{ flex: 1, marginTop: 18 }}
						showsVerticalScrollIndicator={false}
						data={this.state.data}
						renderItem={this.renderItem}
						style={{ marginHorizontal: scale(10) }}
					/>
				</View>
			</View>
		);
	}
}
