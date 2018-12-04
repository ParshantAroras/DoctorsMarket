import React, { Component } from 'react';
import {Platform} from 'react-native';
import DatePicker from 'react-native-datepicker';

export default class TimePickerComponent extends Component {
	constructor(props) {
		super(props);
		this.state = { date: '2016-05-15' };
	}

	render() {
		if (Platform.OS == 'ios') {
			return (<DatePicker
				style={[{ width: 300, borderWidth: 0 }, this.props.style]}
				date={this.props.dob}
				mode="time"
				placeholder="HH : MM"
				format="LT"
				androidMode="spinner"

				confirmBtnText="Confirm"
				cancelBtnText="Cancel"
				customStyles={{

					dateIcon: {
						display: "none"
					},
					dateInput: {
						marginLeft: 0,
						borderWidth: 0,

					}

				}}
				onDateChange={this.props.onDateChange}
			/>)
		}
		else {
			return (<DatePicker
				style={{ width: 300, borderWidth: 0 }}
				date={this.props.dob}
				mode="time"
				placeholder="HH : MM"
				format="LT"
				androidMode="spinner"
				minDate="1950-05-01"
				maxDate="2020-06-01"
				confirmBtnText="Confirm"
				cancelBtnText="Cancel"
				customStyles={{

					dateIcon: {
						position: 'absolute',
						left: 0,
						top: 4,
						marginLeft: 0,
					},
					dateInput: {
						marginLeft: 0,
						borderWidth: 0,

					}

				}}
				onDateChange={this.props.onDateChange}
			/>)
		}

}
}
