import React, { Component } from 'react';
import { View, Text, FlatList, Platform, StyleSheet, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { CheckBox, Slider } from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Container, Header, Left, Body, Right, Icon, Title, Content } from 'native-base';
import { connect } from 'react-redux';
import { colors, normalize, scale, verticalScale, moderateScale, fonts } from '../../config';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FIcon from 'react-native-vector-icons/Feather';
const { height, width } = Dimensions.get('window');
import Button from '../../components/button';
import moment from 'moment';
import { toast } from '../../components/toast';
import RestClient from '../../utils/restclient';
import SwitchSelector from 'react-native-switch-selector';
import Regex from '../../utils/regex';
import { resetNavigationTo } from '../../utils';
import Spinner from '../../components/spinner';
import { reset } from '../../actions/Loginactions';
import NavigationBar from 'react-native-navbar';
import { yupToFormErrors } from 'formik';
const options = [{ label: 'Available', value: 'on' }, { label: 'Not Available', value: 'off' }];
class Addshedulescreen extends Component {
	state = {
		starttimemodal: false,
		endtimemodal: false,
		startdatemodal: false,
		enddatemodal: false,
		starttime: '',
		endtime: '',
		startdate: '',
		enddate: '',
		avail: [],
		avail_range: 2,
		is_available: 'on',
		loader: false,
		start: '',
		end: '',
	};

	_startTimepicker = () => this.setState({ starttimemodal: true });

	_hidestartTimepicker = () => this.setState({ starttimemodal: false });

	_starttimePicked = date => {
		this.setState({ starttime: new Date(date).toLocaleTimeString('en-US'), start: date });
		this._hidestartTimepicker();
	};

	_endTimepicker = () => this.setState({ endtimemodal: true });

	_hideendTimepicker = () => this.setState({ endtimemodal: false });

	_endtimePicked = date => {
		this.setState({ endtime: new Date(date).toLocaleTimeString('en-US'), end: date });
		this._hideendTimepicker();
	};

	_startDatepicker = () => this.setState({ startdatemodal: true });

	_hidestartDatepicker = () => this.setState({ startdatemodal: false });

	_startDatePicked = date => {
		this.setState({ startdate: moment(date).format('YYYY-MM-DD') });
		this._hidestartDatepicker();
	};

	_endDatePicker = () => this.setState({ enddatemodal: true });

	_hideendDatepicker = () => this.setState({ enddatemodal: false });

	_endDatePicked = date => {
		this.setState({ enddate: moment(date).format('YYYY-MM-DD') });
		this._hideendDatepicker();
	};

	onSelect = (index, value) => {
		this.setState({
			text: `Selected index: ${index} , value: ${value}`,
		});
	};

	checkBoxAvail = value => {
		if (this.state.avail.includes(value)) {
			let b = this.state.avail.filter(item => item !== value);
			this.setState({ avail: b });
		} else {
			this.setState({ avail: [...this.state.avail, value] });
		}
	};

	days = (from, to) => {
		console.log(from, to);
		//var d = new Date(from),
		(a = []), (y = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']);
		var start = moment(from, 'YYYY-MM-DD');
		var end = moment(to, 'YYYY-MM-DD');
		console.log(end.diff(start, 'days'));
		if (end.diff(start, 'days') > 7) {
			a = y;
			return a;
		}
		while (from < to) {
			//	a.push(y[d.getDay()]);
			console.log(from);
			a.push(moment(from, 'YYYY-MM-DD').format('dddd'));
			from.setDate(from.getDate() + 1);
		}
		if (from.getDay() === to.getDay())
			// include last day
			a.push(y[from.getDay()]);
		console.log(a);
		return a;
	};

	onSubmit = () => {
		const {
			starttimemodal,
			endtimemodal,
			startdatemodal,
			enddatemodal,
			starttime,
			endtime,
			startdate,
			enddate,
			avail,
			avail_range,
			is_available,
			start,
			end,
		} = this.state;
		const { userid, token, navigation } = this.props;
		console.log(startdate, enddate);
		let b = this.days(new Date(startdate), new Date(enddate));
		console.log(b, 'sdkfkl');
		if (avail.length === 0) {
			toast({ text: 'please select a available day' });
			return;
		}
		if (avail_range == null) {
			toast({ text: 'please provide the your availble KM range' });
			return;
		}
		if (!Regex.validateNumbers(avail_range)) {
			toast({ text: 'Range should be number' });
			return;
		}
		if (!starttime) {
			toast({ text: 'Select your starting time.' });
			return;
		}
		if (!endtime) {
			toast({ text: 'Select your ending time.' });
			return;
		}

		if (Date.parse(start) > Date.parse(end)) {
			toast({ text: 'Starting time sholud be less than end time' });
			return;
		}
		if (Date.parse(start) === Date.parse(end)) {
			toast({ text: 'Starting time sholud be less than end time' });
			return;
		}
		if (!startdate) {
			toast({ text: 'Select your Start date.' });
			return;
		}
		if (!enddate) {
			toast({ text: 'Select your End date.' });
			return;
		}
		if (startdate > enddate) {
			toast({ text: 'End date should be greater than start date' });
			return;
		}
		let error = '';
		avail.map(item => {
			if (item === '1' && b.indexOf('Monday') === -1) {
				error = 'Monday is not available in the range';
				return;
			}
			if (item === '2' && b.indexOf('Tuesday') === -1) {
				error = 'Tuesday is not available in the range';
				return;
			}
			if (item === '3' && b.indexOf('Wednesday') === -1) {
				error = 'Wednesday is not available in the range';
				return;
			}
			if (item === '4' && b.indexOf('Thursday') === -1) {
				error = 'Thursday is not available in the range';
				return;
			}
			if (item === '5' && b.indexOf('Friday') === -1) {
				error = 'Friday is not available in the range';
				return;
			}
			if (item === '6' && b.indexOf('Saturday') === -1) {
				error = 'Saturday is not available in the range';
				return;
			}
			if (item === '7' && b.indexOf('Sunday') === -1) {
				error = 'Sunday is not available in the range';
				return;
			}
		});
		if (error.length > 0) {
			toast({ text: error });
			return;
		}

		console.log(this.props.userdata.doctor.id);
		//debugger;

		let body = {
			candidate_id: this.props.userdata.doctor.id,
			api_token: token,
			which_day: avail,
			avail_range: avail_range,
			start_time: starttime,
			end_time: endtime,
			start_date: startdate,
			end_date: enddate,
		};

		if (is_available === 'on') body.is_available = 'on';
		console.log(body);
		this.setState({ loader: true });
		RestClient.post('/apis/addAvailability', {}, body).then(response => {
			console.log(response, 'response');
			this.setState({ loader: false });
			if (response.status === 200) {
				toast({ text: response.message });
				navigation.navigate('Availabilityscreen');
			} else if (response.status === 401) {
				toast({ text: response.message });
				this.props.reset();
				resetNavigationTo('auth', navigation);
			} else if (response.status === 400) {
				toast({ text: response.message });
			}
		});
	};

	render() {
		const {
			starttimemodal,
			endtimemodal,
			startdatemodal,
			enddatemodal,
			starttime,
			endtime,
			startdate,
			enddate,
			avail_range,
		} = this.state;

		return (
			<View style={{ flex: 1 }}>
				<KeyboardAwareScrollView
					style={{
						flex: 1,
						backgroundColor: '#fff',
						paddingTop: verticalScale(5),
					}}
				>
					<View style={{ flex: 0.1, alignItems: 'center', justifyContent: 'center', margin: 20 }}>
						<SwitchSelector
							options={options}
							buttonColor={'#00B1FF'}
							style={{ borderColor: 'black' }}
							borderColor={'black'}
							textStyle={{ fontFamily: fonts.fontPrimaryLight }}
							backgroundColor={'#FF6363'}
							height={50}
							initial={0}
							onPress={value => this.setState({ is_available: value })}
						/>
					</View>
					<View style={{ flex: 0.3, flexDirection: 'row' }}>
						<View style={{ flex: 1 }}>
							<CheckBox
								center
								title="Monday"
								checkedColor={'#00B1FF'}
								checkedIcon="dot-circle-o"
								uncheckedIcon="circle-o"
								checked={this.state.avail.includes('1')}
								onPress={() => this.checkBoxAvail('1')}
								containerStyle={{ backgroundColor: 'white' }}
								fontFamily={fonts.fontPrimaryLight}
							/>
							<CheckBox
								center
								title="Tuesday"
								checkedIcon="dot-circle-o"
								checkedColor={'#00B1FF'}
								uncheckedIcon="circle-o"
								checked={this.state.avail.includes('2')}
								onPress={() => this.checkBoxAvail('2')}
								fontFamily={fonts.fontPrimaryLight}
							/>
							<CheckBox
								center
								title="Wednesday"
								checkedColor={'#00B1FF'}
								checkedIcon="dot-circle-o"
								uncheckedIcon="circle-o"
								checked={this.state.avail.includes('3')}
								onPress={() => this.checkBoxAvail('3')}
								fontFamily={fonts.fontPrimaryLight}
							/>
						</View>

						<View style={{ flex: 1 }}>
							<CheckBox
								center
								title="Thursday"
								checkedColor={'#00B1FF'}
								checkedIcon="dot-circle-o"
								uncheckedIcon="circle-o"
								checked={this.state.avail.includes('4')}
								onPress={() => this.checkBoxAvail('4')}
								fontFamily={fonts.fontPrimaryLight}
							/>
							<CheckBox
								center
								title="Friday"
								checkedIcon="dot-circle-o"
								checkedColor={'#00B1FF'}
								uncheckedIcon="circle-o"
								checked={this.state.avail.includes('5')}
								onPress={() => this.checkBoxAvail('5')}
								fontFamily={fonts.fontPrimaryLight}
							/>
							<CheckBox
								center
								title="Saturday"
								checkedColor={'#00B1FF'}
								checkedIcon="dot-circle-o"
								uncheckedIcon="circle-o"
								checked={this.state.avail.includes('6')}
								onPress={() => this.checkBoxAvail('6')}
								fontFamily={fonts.fontPrimaryLight}
							/>
						</View>
					</View>
					<View style={{ flex: 0.1, alignItems: 'center' }}>
						<CheckBox
							center
							title="Sunday"
							checkedColor={'#00B1FF'}
							checkedIcon="dot-circle-o"
							uncheckedIcon="circle-o"
							checked={this.state.avail.includes('7')}
							onPress={() => this.checkBoxAvail('7')}
							fontFamily={fonts.fontPrimaryLight}
						/>
					</View>
					<View style={{ flex: 0.2, marginHorizontal: 18 }}>
						<View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
							<Text style={{ fontFamily: fonts.fontPrimaryLight }}>
								Range in KM ({this.state.avail_range})
							</Text>
						</View>
						<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
							<Slider
								value={avail_range}
								onValueChange={value => this.setState({ avail_range: value })}
								style={{ width: width - 100, height: 50 }}
								thumbTintColor={'#00B1FF'}
								thumbStyle={{ marginTop: 4 }}
								trackStyle={{ backgroundColor: '#C0C0C0' }}
								minimumTrackTintColor={'#00B1FF'}
								step={4}
								maximumValue={35}
								minimumValue={2}
							/>
						</View>
					</View>
					<View
						style={{
							width,
							height: 120,
							flexDirection: 'row',
							justifyContent: 'center',
							paddingHorizontal: scale(20),
						}}
					>
						<View style={{ flex: 1, justifyContent: 'center' }}>
							<Text>Start time</Text>
							<TouchableOpacity
								style={{
									width: scale(135),
									height: verticalScale(40),
									flexDirection: 'row',
									marginVertical: 10,
								}}
								onPress={this._startTimepicker}
							>
								<Text style={{ marginRight: 10, fontFamily: fonts.fontPrimaryLight }}>
									{starttime ? starttime : '__:__:__'}
								</Text>
								<FIcon name="clock" size={20} />
							</TouchableOpacity>
						</View>
						<View style={{ flex: 1, justifyContent: 'center' }}>
							<Text style={{ fontFamily: fonts.fontPrimaryLight }}>End time</Text>
							<TouchableOpacity
								style={{
									width: scale(135),
									height: verticalScale(40),
									flexDirection: 'row',
									marginVertical: 10,
								}}
								onPress={this._endTimepicker}
							>
								<Text style={{ marginRight: 10, fontFamily: fonts.fontPrimaryLight }}>
									{endtime ? endtime : '__:__:__'}
								</Text>
								<FIcon name="clock" size={20} />
							</TouchableOpacity>
						</View>
					</View>
					<View
						style={{
							width,
							height: 120,
							flexDirection: 'row',
							justifyContent: 'center',
							paddingHorizontal: scale(20),
						}}
					>
						<View style={{ flex: 1, justifyContent: 'center' }}>
							<Text style={{ fontFamily: fonts.fontPrimaryLight }}>Start Date</Text>
							<TouchableOpacity
								style={{
									width: scale(135),
									height: verticalScale(40),
									flexDirection: 'row',
									marginVertical: 10,
								}}
								onPress={this._startDatepicker}
							>
								<Text style={{ marginRight: 10, fontFamily: fonts.fontPrimaryLight }}>
									{startdate ? startdate : '__:__:__'}
								</Text>
								<FIcon name="clock" size={20} />
							</TouchableOpacity>
						</View>
						<View style={{ flex: 1, justifyContent: 'center' }}>
							<Text style={{ fontFamily: fonts.fontPrimaryLight }}>End Date</Text>
							<TouchableOpacity
								style={{
									width: scale(135),
									height: verticalScale(40),

									flexDirection: 'row',
									marginVertical: 10,
								}}
								onPress={this._endDatePicker}
							>
								<Text style={{ marginRight: 10, fontFamily: fonts.fontPrimaryLight }}>
									{enddate ? enddate : '__:__:__'}
								</Text>
								<FIcon name="clock" size={20} />
							</TouchableOpacity>
						</View>
					</View>
					<View style={{ flex: 0.2, alignItems: 'center', justifyContent: 'center' }}>
						<Button
							label={'SAVE'}
							disabled={false}
							onPress={this.onSubmit}
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
					<View style={{ width, height: 80 }} />
					{this.state.loader && <Spinner visible={this.state.loader} text="Adding availabilty.." />}
				</KeyboardAwareScrollView>
				<DateTimePicker
					mode={'time'}
					is24Hour={true}
					datePickerModeAndroid="spinner"
					isVisible={starttimemodal}
					onConfirm={this._starttimePicked}
					onCancel={this._hidestartTimepicker}
				/>
				<DateTimePicker
					mode={'time'}
					is24Hour={true}
					datePickerModeAndroid="spinner"
					isVisible={endtimemodal}
					onConfirm={this._endtimePicked}
					onCancel={this._hideendTimepicker}
				/>
				<DateTimePicker
					mode={'date'}
					minimumDate={new Date()}
					maximumDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
					isVisible={startdatemodal}
					onConfirm={this._startDatePicked}
					onCancel={this._hidestartDatepicker}
				/>
				<DateTimePicker
					mode={'date'}
					minimumDate={new Date()}
					maximumDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
					isVisible={enddatemodal}
					onConfirm={this._endDatePicked}
					onCancel={this._hideendDatepicker}
				/>
			</View>
		);
	}
}

const mapStateToProps = ({ Shedulereducer, Loginreducer }) => {
	const { sheduledata, loader } = Shedulereducer;
	const { userid, token,userdata } = Loginreducer;
	return {
		sheduledata,
		loader,
		userid,
		token,
		userdata
	};
};
export default connect(
	mapStateToProps,
	{ reset }
)(Addshedulescreen);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		paddingTop: 50,
	},
	button: {
		backgroundColor: 'lightblue',
		padding: 12,
		margin: 16,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 4,
		borderColor: 'rgba(0, 0, 0, 0.1)',
	},
	text: {
		marginVertical: 10,
	},
});
