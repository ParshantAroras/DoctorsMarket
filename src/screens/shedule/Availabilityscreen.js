import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator, Dimensions, Alert } from 'react-native';
import { colors, normalize, scale, verticalScale, moderateScale, fonts } from '../../config';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { shedulefetching, deleteshedule } from '../../actions/Sheduleactions';
import Spinner from '../../components/spinner';
import AgendaScreen from './Agendascreen';
import Button from '../../components/button';
import MICon from 'react-native-vector-icons/MaterialIcons';
import FICon from 'react-native-vector-icons/Feather';
import EICon from 'react-native-vector-icons/EvilIcons';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
const { height, width } = Dimensions.get('window');
import { Card } from 'react-native-elements';
import Modal from 'react-native-modalbox';
import moment from 'moment';
class Availabilityscreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			item: {},
			month: '9',
			detail: {},
			isOpen: false,
		};
	}
	componentWillMount() {
		const { navigation, userid, token } = this.props;
		let body = {
			user_id: userid,
			api_token: token,
		};

		this.willFocusSubscription = this.props.navigation.addListener('willFocus', () => {
			this.props.shedulefetching({ body, navigation });
		});
		console.log(this.props.userdata);
		//debugger;
		//alert(new Date().toISOString().substring(0, 10));
	}

	componentWillUnmount() {
		this.willFocusSubscription.remove();
		this.setState({ isOpen: false });
	}

	componentWillReceiveProps(nextProps) {
		//	alert(this.state.month);
		newItem = {};
		if (nextProps.sheduledata.length > 0) {
			nextProps.sheduledata.map(item => {
				if (item.title === 'Available') {
					item.selected = true;
					item.marked = true;
					item.selectedColor = '#02B2FE';
				} else {
					item.selected = true;
					item.marked = true;
					item.selectedColor = '#DC2626';
				}
				let context = this;
				var d = new Date(item.start);

				//if (d.getMonth() + 1 == this.state.month) {
				newItem[item.start] = item;
				//}
			});
			this.setState({ item: newItem });
		}
	}
	newdata = months => {
		console.log(months[0].month, 'months');
		this.setState({ month: months[0].month });
		newItem = {};
		if (this.props.sheduledata.length > 0) {
			this.props.sheduledata.map(item => {
				if (item.title === 'Available') {
					item.selected = true;
					item.marked = true;
					item.selectedColor = '#02B2FE';
				} else {
					item.selected = true;
					item.marked = true;
					item.selectedColor = '#DC2626';
				}
				let context = this;
				var d = new Date(item.start);
				if (item.start === new Date().toISOString().substring(0, 10)) {
					this.setState({ detail: item });
				}
				newItem[item.start] = item;
				//}
			});
			this.setState({ item: newItem });
			console.log(newItem, 'newItem herer');
		}
	};
	daypress = day => {
		if (this.state.item[day.dateString] !== undefined) {
			this.setState({ detail: this.state.item[day.dateString] });
			this.setState({ isOpen: true });
		}

		//alert(day.dateString);
	};
	deleteshedule = details => {
		this.setState({ isOpen: false });
		console.log(details, 'detaikls');
		const { userid, token, navigation } = this.props;

		Alert.alert(
			'Doctors Marekt',
			'Do you really want to delete the shdeule?',
			[
				{
					text: 'Delete',
					onPress: () => {
						this.setState({ detail: {} }, () => {
							this.props.deleteshedule({
								user_id: userid,
								api_token: token,
								id: details.id,
								navigation,
							});
						});
					},
				},
				{ text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
			],
			{ cancelable: false }
		);
	};
	description = () => {
		const {
			navigation: { navigate },
		} = this.props;
		const { detail } = this.state;
		if (Object.keys(this.state.detail).length !== 0) {
			console.log(this.state.detail);
			return (
				<View
					style={{
						flex: 0.4,
						alignItems: 'center',
						justifyContent: 'center',
						paddingHorizontal: 10,
						marginTop: 12,
						marginBottom: 4,
					}}
				>
					<Text
						style={{
							textAlign: 'center',
							fontFamily: fonts.fontPrimaryLight,
							fontSize: normalize(14),
						}}
					>
						{this.state.detail.description}
					</Text>
					<View style={{ flexDirection: 'row', marginTop: 5 }}>
						<View style={{ flexDirection: 'row' }}>
							<Text
								style={{
									marginRight: 5,
									fontFamily: fonts.fontPrimaryLight,
									fontSize: normalize(13),
								}}
							>
								Start time :
							</Text>
							<Text
								style={{
									fontFamily: fonts.fontPrimaryLight,
									fontSize: normalize(13),
								}}
							>
								{this.state.detail.start_time}
							</Text>
						</View>
						<View style={{ flexDirection: 'row', marginLeft: 15 }}>
							<Text
								style={{
									marginRight: 5,
									fontFamily: fonts.fontPrimaryLight,
									fontSize: normalize(13),
								}}
							>
								End time
							</Text>
							<Text
								style={{
									fontFamily: fonts.fontPrimaryLight,
									fontSize: normalize(13),
								}}
							>
								{this.state.detail.end_time}
							</Text>
						</View>
					</View>

					<View style={{ flex: 1, flexDirection: 'row' }}>
						<TouchableOpacity
							style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
							onPress={() => this.deleteshedule(this.state.detail)}
						>
							<MICon name="delete" size={28} color={'#DC2626'} />
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => {
								this.setState({ isOpen: false }, () => {
									navigate('Editshedulescreen', { data: this.state.detail });
								});
							}}
							style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
						>
							<FICon name="edit" size={28} color={'#DC2626'} />
						</TouchableOpacity>
					</View>
				</View>
			);
		} else {
			return null;
		}
	};
	render() {
		console.log(this.state.item, 'newItem herer');
		const {
			navigation: { navigate },
		} = this.props;
		const { detail } = this.state;
		return (
			<View style={{ flex: 1 }}>
				<View>
					{this.state.item ? (
						<CalendarList
							current={moment(new Date()).format('YYYY-MM-DD')}
							// current={'2018-09-16'}
							
							onDayPress={this.daypress}
							pastScrollRange={50}
							futureScrollRange={50}
							horizontal
							pagingEnabled
							style={{ borderBottomColor: 'black', marginTop: 30 }}
							markedDates={this.state.item}
							theme={{
								backgroundColor: '#ffffff',
								calendarBackground: '#ffffff',
								textSectionTitleColor: '#b6c1cd',
								selectedDayBackgroundColor: '#00adf5',
								selectedDayTextColor: '#ffffff',
								todayTextColor: '#00adf5',
								dayTextColor: '#2d4150',
								textDisabledColor: '#d9e1e8',
								dotColor: '#00adf5',
								selectedDotColor: '#ffffff',
								monthTextColor: '#00B1FF',
								textDayFontFamily: fonts.fontPrimaryLight,
								textMonthFontFamily: fonts.fontPrimaryLight,
								textDayHeaderFontFamily: fonts.fontPrimaryLight,
								textDayFontSize: 12,
								textMonthFontSize: normalize(20),
								textDayHeaderFontSize: 14,
							}}
						/>
					) : (
						<ActivityIndicator coloe={'red'} />
					)}
				</View>

				<View
					style={{
						flex: 0.2,
						alignItems: 'center',
						justifyContent: 'center',
						marginTop: moderateScale(80),
					}}
				>
					<Button
						label={'ADD AVAILABILTY'}
						disabled={false}
						onPress={() => navigate('Addshedulescreen')}
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
								marginVertical: verticalScale(210),
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
				<Modal
					onClosed={() => this.setState({ isOpen: false })}
					swipeToClose={false}
					style={{
						width: scale(300),
						height: verticalScale(380),
						alignItems: 'center',
						justifyContent: 'center',
						paddingHorizontal: 30,
					}}
					position={'center'}
					ref={'modal3'}
					isOpen={this.state.isOpen}
				>
					<View
						style={{
							width: 300,
							height: 40,
							alignItems: 'flex-end',
							justifyContent: 'center',
							marginRight: 18,
							marginTop: 10,
						}}
					>
						<EICon onPress={() => this.setState({ isOpen: false })} name="close" size={30} color="black" />
					</View>
					<Text
						style={{
							textAlign: 'center',
							marginRight: 5,
							fontFamily: fonts.fontPrimaryLight,
							fontSize: normalize(17),
							marginVertical: verticalScale(10),
						}}
					>
						{this.state.detail.description}
					</Text>

					<Text
						style={{
							textAlign: 'center',
							marginRight: 5,
							fontFamily: fonts.fontPrimaryLight,
							fontSize: normalize(17),
							marginVertical: verticalScale(10),
							color: detail.title === 'Available' ? '#55CC55' : '#FF6363',
						}}
					>
						{this.state.detail.title}
					</Text>

					<Button
						label={'DELETE'}
						disabled={false}
						onPress={() => this.deleteshedule(this.state.detail)}
						styles={{
							button: {
								height: verticalScale(50),
								width: scale(180),
								alignItems: 'center',
								justifyContent: 'center',
								borderRadius: 5,
								paddingLeft: 15,
								paddingRight: 15,
								borderRadius: 100,
								marginVertical: verticalScale(10),
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
					<Button
						label={'EDIT'}
						disabled={false}
						onPress={() => {
							this.setState({ isOpen: false }, () => {
								navigate('Editshedulescreen', { data: this.state.detail });
							});
						}}
						styles={{
							button: {
								height: verticalScale(50),
								width: scale(180),
								alignItems: 'center',
								justifyContent: 'center',
								borderRadius: 5,
								paddingLeft: 15,
								paddingRight: 15,
								borderRadius: 100,
								marginVertical: verticalScale(10),
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
				</Modal>
			</View>
		);
	}
}
const mapStateToProps = ({ Loginreducer, Shedulereducer }) => {
	const { userid, token, userdata } = Loginreducer;
	const { sheduledata, loader } = Shedulereducer;
	return {
		userid,
		token,
		userdata,
		sheduledata,
		loader,
	};
};

export default connect(
	mapStateToProps,
	{ shedulefetching, deleteshedule }
)(Availabilityscreen);
