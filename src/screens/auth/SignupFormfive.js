import React, { Component } from 'react';
import { View, Text, Dimensions, ScrollView, TouchableOpacity, DeviceEventEmitter, Platform,ActivityIndicator,Modal } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import StepIndicatorView from '../../components/stpeindicatorview';
import { colors, normalize, scale, verticalScale, moderateScale, fonts } from '../../config';
import Button from '../../components/button';
//import CheckBox from "../../components/checkbox";
import Genderfield from '../../components/genderfield';
import NextButton from '../../components/nextbutton';
import Icon from 'react-native-vector-icons/FontAwesome';
const { height, width } = Dimensions.get('window');
import CheckBox from 'react-native-modest-checkbox';
import { connect } from 'react-redux';
import { registraion } from '../../actions/Signupactions';
import Spinner from '../../components/spinner';
import { toast } from '../../components/toast';
import RestClient from '../../utils/restclient';
import Tickcomponet from '../../components/tickcomponent';
import { SignupUpdate } from '../../actions/Signupactions';
import { tabUpdate } from '../../actions/Loginactions';
class SignupupFormfive extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isChecked: false,
			visible: false,
			question3error: '',
			question4error: '',
			question5error: ''
		};
	}

	handlePressCheckedBox = checked => {
		this.setState({
			isChecked: checked,
		});
	};

	submit = () => {
		let context = this;
		this.setState({
			question3error: '',
			question4error: '',
			question5error: '',
		});
		const {
			question3,
			question4,
			question5,
			navigation: { navigate },
		} = this.props;

		if (question3 === null) {
			this.setState({ question3error: 'Please answer these question' });
			return;
		}
		if (question4 === null) {
			this.setState({ question4error: 'Please answer these question' });
			return;
		}
		if (question5 === null) {
			this.setState({ question5error: 'Please answer these question' });
			return;
		}
		console.log('this.props',this.props)
		let body = {
			user_id: this.props.userid,
			api_token: this.props.token,
			user: {
				doctor: {
					profile_tab : 5,
					q3: question3,
					q4: question4,
					q5: question4
				}
	}
		}
		console.log("bodddy",body)
	    context.setState({ visible: true });
		RestClient.post('/apis/saveFitnessDetails', {}, body).then(response => {
			context.setState({ visible: false });
			console.log('login resposne',response);
			navigate('Signupfour');
			context.props.tabUpdate({value: 5});
			// if (response.status === 200) {
			// 	navigate('ProfileComplete');
			// } else {
			// 	toast({ text: response.message, type: 'danger' });
			// }
		}).catch((error)=>{
		console.log('error',error)
		context.setState({ visible: false });
		});
		
		
	};

	render() {
		const { SignupUpdate } = this.props;
		return (
			<View
				style={{
					flex: 1,
					backgroundColor: '#fff',
					paddingHorizontal: scale(10),
					paddingTop: verticalScale(5),
				}}
			>
				<Tickcomponet step={5} />
				<View
					style={{
						flex: 1,
						marginTop: verticalScale(1),
						marginBottom: verticalScale(5),
					}}
				>
					<ScrollView
						showsVerticalScrollIndicator={false}
						style={{
							flex: 0.5,
							paddingVertical: verticalScale(5),
							marginLeft: scale(2),
						}}
					>
						<View
							style={{
								flex: 0.1,
								paddingHorizontal: scale(10),
								paddingVertical: verticalScale(5),
							}}
						>
							<Text
								style={{
									fontFamily: fonts.fontPrimaryLight,
									fontSize: normalize(32),
									color: '#000000',
									opacity: 0.8,
								}}
							>
								Fitness to Practise
							</Text>
						</View>
						<View style={{ flexDirection: 'column', paddingVertical: scale(10) }}>
							<Text
								style={{
									fontFamily: fonts.fontPrimaryLight,
									fontSize: normalize(15),
									marginHorizontal: scale(10),
									color: '#000000',
									opacity: 0.8,
									textAlign: 'left',
								}}
							>
								Are you currently subject to a fitness to practise investigation and/or proceedings of
								any nature by a regulatory or licensing body in the UK or in any other country? [It is
								important to note that we will only consider current fitness to practise investigations
								and/or proceedings that are relevant to the position you have applied for].
							</Text>
							<View
								style={{
									flexDirection: 'row',
									justifyContent: 'space-around',
									marginRight: scale(50),
									marginTop: verticalScale(10),
								}}
							>
								<Genderfield
									selected={this.props.question3 === 1}
									onPress={() =>
										SignupUpdate({
											prop: 'question3',
											value: 1,
										})
									}
									label="Yes"
								/>
								<Genderfield
									selected={this.props.question3 === 0}
									onPress={() =>
										SignupUpdate({
											prop: 'question3',
											value: 0,
										})
									}
									label="No"
								/>
							</View>
							<Text
								style={{
									color: 'rgb(213, 0, 0)',
									fontSize: 12,
									marginVertical: verticalScale(5),
								}}
							>
								{this.state.question3error}
							</Text>
						</View>
						<View style={{ flexDirection: 'column', paddingVertical: scale(10) }}>
							<Text
								style={{
									fontFamily: fonts.fontPrimaryLight,
									fontSize: normalize(15),
									marginHorizontal: scale(10),
									color: '#000000',
									opacity: 0.8,
									textAlign: 'left',
								}}
							>
								Have you ever been removed from the register, or have conditions or sanctions been
								placed on your registration, or have you been issued with a warning by a regulatory or
								licensing body in the UK or in any other country?
							</Text>
							<View
								style={{
									flexDirection: 'row',
									justifyContent: 'space-around',
									marginRight: scale(50),
									marginTop: verticalScale(10),
								}}
							>
								<Genderfield
									selected={this.props.question4 === 1}
									onPress={() =>
										SignupUpdate({
											prop: 'question4',
											value: 1,
										})
									}
									label="Yes"
								/>
								<Genderfield
									selected={this.props.question4 === 0}
									onPress={() =>
										SignupUpdate({
											prop: 'question4',
											value: 0,
										})
									}
									label="No"
								/>
							</View>
							<Text
								style={{
									color: 'rgb(213, 0, 0)',
									fontSize: 12,
									marginVertical: verticalScale(5),
								}}
							>
								{this.state.question4error}
							</Text>
						</View>
						<View style={{ flexDirection: 'column', paddingVertical: scale(10) }}>
							<Text
								style={{
									fontFamily: fonts.fontPrimaryLight,
									fontSize: normalize(15),
									marginHorizontal: scale(10),
									color: '#000000',
									opacity: 0.8,
									textAlign: 'left',
								}}
							>
								In your current or any previous employment, have you had restrictions placed on your
								clinical practise as part of the revalidation process?
							</Text>
							<View
								style={{
									flexDirection: 'row',
									justifyContent: 'space-around',
									marginRight: scale(50),
									marginVertical: verticalScale(10),
								}}
							>
								<Genderfield
									selected={this.props.question5 === 1}
									onPress={() =>
										SignupUpdate({
											prop: 'question5',
											value: 1,
										})
									}
									label="Yes"
								/>
								<Genderfield
									selected={this.props.question5 === 0}
									onPress={() =>
										SignupUpdate({
											prop: 'question5',
											value: 0,
										})
									}
									label="No"
								/>
							</View>
							<Text
								style={{
									color: 'rgb(213, 0, 0)',
									fontSize: 12,
									marginVertical: verticalScale(5),
								}}
							>
								{this.state.question4error}
							</Text>
						</View>
						<View style={{ width, height: 280 }} />
					</ScrollView>
				</View>
				{this.props.loader && <Spinner visible={this.props.loader} text={'Signing....'} />}
				<NextButton onPress={this.submit} />
				{this.state.visible &&<Modal
						backdrop={false}
						isOpen={this.state.visible}
						onClosed={() => this.setState({ visible: false })}
						style={{
							flex: 1,
							backgroundColor: 'transparent',
							alignItems: 'center',
							justifyContent: 'center'
						}}
						position={'center'}><View style={{
								flex: 1,
								backgroundColor: 'transparent',
								alignItems: 'center',
								justifyContent: 'center',
							}}><ActivityIndicator color={'#02B2FE'} size={'large'}/>
							<Text style={{ color: '#02B2FE' }}>Loading ...</Text>
						</View>
					</Modal>}
					</View>);
	}
}

const mapStateToProps = ({ SignupReducer, Loginreducer }) => {
	const { userid, token } = Loginreducer;
	const { question3, question4, question5 } = SignupReducer;
	return {
		question3,
		question4,
		question5,
		userid,
		token
	};
};

export default connect(
	mapStateToProps,
	{ SignupUpdate ,tabUpdate}
)(SignupupFormfive);
