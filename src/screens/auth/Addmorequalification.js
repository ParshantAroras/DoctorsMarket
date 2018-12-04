import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import Accordion from '../../components/accordian';
import DocumentUploader from '../../components/documentuploader';
import { TextField } from 'react-native-material-textfield';
import { SignupUpdate } from '../../actions/Signupactions';
import { connect } from 'react-redux';
import DatePickerComponent from '../../components/datepicker';
const { height, width } = Dimensions.get('window');
import { colors, normalize, scale, verticalScale, moderateScale, fonts } from '../../config';
class AddmoreQualification extends Component {
	constructor(props) {
		super(props);
		this.state = {
			doc1: '',
			doc2: '',
			doc3: '',
		};
	}
	render() {
		const { SignupUpdate,qualification } = this.props;
		return (
			<ScrollView style={{ padding:10,backgroundColor:'white' }}>
			{qualification.id!=='1' &&	<Accordion expanded Header="MBBS Qualification document">
					<Text style={{ opacity: 0.7, marginBottom: 15 }}>Year of completion</Text>
					<DatePickerComponent dob={this.state.doc1} onDateChange={date => this.setState({ doc1: date })} />
					<DocumentUploader
						styles={{ marginBottom: 10, height: verticalScale(120) }}
						documentSelected={res =>
							SignupUpdate({
								prop: 'qualidocs',
								value: [
									...this.props.qualidocs,
									{
										qualification: 'MBBS',
										yearofcompletion: this.state.doc1,
										cert: res,
									},
								],
							})
						}
					/>
					<View style={{ width, height: 20 }} />
				</Accordion>
}
				<Accordion expanded Header="MB ChB Qualification document">
					<Text style={{ opacity: 0.7, marginBottom: 15 }}>Year of completion</Text>
					<DatePickerComponent dob={this.state.doc2} onDateChange={date => this.setState({ doc2: date })} />
					<DocumentUploader
						styles={{ marginBottom: 10, height: verticalScale(120) }}
						documentSelected={res =>
							SignupUpdate({
								prop: 'qualidocs',
								value: [
									...this.props.qualidocs,
									{
										qualification: 'MBChB',
										yearofcompletion: this.state.doc2,
										cert: res,
									},
								],
							})
						}
					/>
					<View style={{ width, height: 20 }} />
				</Accordion>
				<Accordion expanded Header="Other Qualification document">
					<Text style={{ opacity: 0.7, marginBottom: 15 }}>Year of completion</Text>
					<DatePickerComponent dob={this.state.doc3} onDateChange={date => this.setState({ doc3: date })} />
					<DocumentUploader
						styles={{ marginBottom: 10, height: verticalScale(120) }}
						documentSelected={res =>
							SignupUpdate({
								prop: 'qualidocs',
								value: [
									...this.props.qualidocs,
									{
										qualification: 'Other2',
										yearofcompletion: this.state.doc3,
										cert: res,
									},
								],
							})
						}
					/>
					<View style={{ width, height: 20 }} />
				</Accordion>
			</ScrollView>
		);
	}
}

const mapStateToProps = ({ SignupReducer }) => {
	const { qualidocs ,qualification} = SignupReducer;
	return {
		qualidocs,
		qualification
	};
};

export default connect(
	mapStateToProps,
	{ SignupUpdate }
)(AddmoreQualification);
