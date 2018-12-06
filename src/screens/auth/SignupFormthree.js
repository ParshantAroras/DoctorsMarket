import React, { Component } from 'react';
import {
	View,
	Text,
	Alert,
	Dimensions,
	TouchableOpacity,
	Keyboard,
	Image,
	ActivityIndicator,
	TextInput,
	WebView,
	LayoutAnimation,
	Switch,
	StyleSheet,
} from 'react-native';
import { colors, normalize, scale, verticalScale, moderateScale, fonts } from '../../config';
const { height, width } = Dimensions.get('window');
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import StepIndicator from '../../components/stepindicator';
import { TextField } from 'react-native-material-textfield';
import Genderfield from '../../components/genderfield';
import NextButton from '../../components/nextbutton';
import ActionButton from 'react-native-action-button';
import { isIphoneX } from 'react-native-iphone-x-helper';
import Icon from 'react-native-vector-icons/Ionicons';
import StepIndicatorView from '../../components/stpeindicatorview';
import doctorslist from '../../utils/doctorsspecialist';
import { Dropdown } from 'react-native-material-dropdown';
import { connect } from 'react-redux';
import Regex from '../../utils/regex';
import EIcon from 'react-native-vector-icons/Entypo';
import { SignupUpdate } from '../../actions/Signupactions';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import ImagePicker from 'react-native-image-picker';
import Permissions from 'react-native-permissions';
import OpenAppSettings from 'react-native-app-settings';
import Tickcomponet from '../../components/tickcomponent';
import doctorgrade from '../../utils/doctorgrade';
import PDFView from 'react-native-view-pdf';
import Accordion from '../../components/accordian';
import DocumentUploader from '../../components/documentuploader';
import Modal from 'react-native-modalbox';
import EICon from 'react-native-vector-icons/EvilIcons';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
const tintColor = '#174A87';
import workingcountries from '../../utils/workingcountries';
import RestClient from '../../utils/restclient';
import { tabUpdate } from '../../actions/Loginactions';
import { Toast } from 'native-base';
import { toast } from '../../components/toast';
import { reset } from '../../actions/Loginactions';
import { resetNavigationTo } from '../../utils';
const items = [
	{
		title: 'Select countries wish to work',
		id: 0,
		children: workingcountries,
	},
];
const item2 = [
	{
		title: 'Select your specilaist',
		id: 0,
		children: doctorslist,
	},
];

class SignupFormthree extends Component {
	constructor(props) {
		super(props);
		this.state = {
			specialityerror: '',
			gmcnumbererror: '',
			gradeerror: '',
			imageloadertwo: false,
			imageloaderone: false,
			isOpen: false,
			items: null,
			loading: false,
			selectedItems: [],
			selectedItems2: [],
			profregnoererror: '',
			countrytoworkerror: '',
			visible: false,
		};
	}

	noResults = (
		<View key="a" style={styles.center}>
			<Text>Sorry! No results...</Text>
		</View>
	);
	onSubmit = () => {
		let context = this;
		Keyboard.dismiss();
		this.setState({
			specialityerror: '',
			gmcnumbererror: '',
			gradeerror: '',
			profdocerror: '',
			profregnoererror: '',
			countrytoworkerror: '',
		});
		//alert(this.props.gmcverified)
		const {
			specialist,
			havegmcnumber,
			gmcnumber,
			grade,
			profregno,
			righttoworkUK,
			countrytowork,
			profdoc,
			navigation,
		} = this.props;
		const { specialityerror, gmcerror } = this.state;

		if (specialist.length === 0) {
			this.setState({ specialityerror: 'Please select your specialty' });
			Toast.show({
				text: 'Please select your specialty',
				buttonText: 'Okay',
				type: 'danger',
			});
			return;
		}

		if (!grade.id) {
			this.setState({ gradeerror: 'Please select your grade' });
			Toast.show({
				text: 'Please select your grade',
				buttonText: 'Okay',
				type: 'danger',
			});
			return;
		}
		if (havegmcnumber) {
			if (gmcnumber.length === 0) {
				this.setState({ gmcnumbererror: 'Please enter your gmc number' });
				Toast.show({
					text: 'Please enter your gmc number',
					buttonText: 'Okay',
					type: 'danger',
				});
				return;
			}
		} else {
			if (profregno.length === 0) {
				this.setState({ profregnoererror: 'Please enter your Professional registration number' });
				Toast.show({
					text: 'Please enter your Professional registration number',
					buttonText: 'Okay',
					type: 'danger',
				});
				return;
			}
			if (!profdoc.hasOwnProperty('uri')) {
				this.setState({ profdocerror: 'Please select a document for verification' });
				Toast.show({
					text: 'Please select a document for verification',
					buttonText: 'Okay',
					type: 'danger',
				});
				return;
			}
		}
		console.log(countrytowork, 'counrtydssdf');
		if (!righttoworkUK && countrytowork.length === 0) {
			//	alert('lpp');
			this.setState({ countrytoworkerror: 'Select Countries you prefer to work' });
			Toast.show({
				text: 'Select Countries you prefer to work',
				buttonText: 'Okay',
				type: 'danger',
			});
			return;
		}

		//console.log(specialist, havegmcnumber, gmcnumber, grade, profregno, righttoworkUK, countrytowork, profdoc);

		let formdata = new FormData();
		formdata.append('user_id', this.props.userid);
		formdata.append('api_token', this.props.token);
		formdata.append('skills', JSON.stringify(specialist));
		formdata.append('grade_id', grade.id);
		formdata.append('is_gmc', havegmcnumber ? 1 : 0);
		if (havegmcnumber) {
			formdata.append('gmc_number', gmcnumber);
		} else {
			formdata.append('prof_reg_number', profregno);
			formdata.append('prof_doc', profdoc);
		}
		formdata.append('right_to_work_in_uk', righttoworkUK ? 1 : 0);
		if (!righttoworkUK) {
			formdata.append('countries', JSON.stringify(countrytowork));
		}
		context.setState({ visible: true });
		RestClient.imageUpload('/apis/saveProfessionalDetails', {}, formdata).then(response => {
			context.setState({ visible: false });
			console.log(response, 'resposne');
			if (response.status === 200) {
				toast({ text: response.message });
				context.props.tabUpdate({value: 3});
				navigation.navigate('SignupFormStrucProfile');
		
			} else if (response.status === 401) {
				this.props.reset();
				toast({ text: response.message });
				resetNavigationTo('auht', navigation);
			}
		}).catch(err=>{
			console.log("errr",err)
			context.setState({ visible: false });
		});
		//navigate('SignupFormStrucProfile');

		console.log(formdata);
	};
	/*-------------------------------slecetor 1-------------------------- */
	onSelectedItemsChange = selectedItems => {
		this.props.SignupUpdate({ prop: 'specialist', value: selectedItems });
		this.setState({ selectedItems });
		// alert("456455564")
	};

	onCancel = () => {
		this.SectionedMultiSelect._removeAllItems();

		this.setState({
			selectedItems: this.state.currentItems,
		});
		console.log(this.state.selectedItems);
	};
	onConfirm = () => {
		//this.props.SignupUpdate({ prop: 'specialist', value: this.state.selectedItems });
	};

	/*-------------------------------slecetor 2-------------------------- */
	onSelectedItemsChange2 = selectedItems2 => {
		this.props.SignupUpdate({ prop: 'countrytowork', value: selectedItems2 });
		this.setState({ selectedItems2 });
	};

	onConfirm2 = () => {
		//console.log(this.state.selectedItems2, 'onSelectedItemsChange2');
		//this.props.SignupUpdate({ prop: 'countrytowork', value: this.state.selectedItems2 });
	};
	/***-------------------------------********************************* */
	documentchooser = number => {
		Permissions.check('photo').then(response => {
			if (response === 'authorized') {
				const { SignupUpdate } = this.props;
			} else {
				Alert.alert(
					'Permissions Request',
					'Please go to Settings > Applications > Doctors Market > Permissions > Allow gallery and camera permission  for  Doctors Market to access your Gallery and Camera',
					[
						{ text: 'Settings', onPress: () => OpenAppSettings.open() },
						{ text: 'cancel', onPress: () => console.log('cancelled') },
					],
					{ cancelable: false }
				);
			}
		});
	};
	render() {
		const {
			navigation: { navigate },
			SignupUpdate,
		} = this.props;
		console.log(this.props.doc1);

		// alert(this.state.imageloadertwo);
		return (
			<View style={{ flex: 1, backgroundColor: '#fff' }}>
				<Tickcomponet step={3} />
				<KeyboardAwareScrollView
					extraHeight={moderateScale(200)}
					enableResetScrollToCoords={false}
					style={{
						flex: 1,
						backgroundColor: '#fff',
						paddingHorizontal: scale(10),
						paddingTop: verticalScale(5),
					}}
				>
					<View
						style={{
							flex: 0.2,
							paddingHorizontal: scale(10),
							marginTop: verticalScale(15),
							marginBottom: verticalScale(10),
						}}
					>
						<Text
							style={{
								fontFamily: fonts.fontPrimaryLight,
								fontSize: normalize(32),
								marginVertical: verticalScale(5),
								color: '#000000',
								opacity: 0.8,
							}}
						>
							Professional Data
						</Text>
					</View>
					<View style={{ flex: 0.8, paddingHorizontal: scale(10) }}>
						<SectionedMultiSelect
							items={item2}
							uniqueKey="id"
							subKey="children"
							displayKey="title"
							selectText={
								this.state.selectedItems2.length
									? 'What is your Speciality?'
									: 'What is your Speciality?'
							}
							searchTextInput="What is your Speciality?"
							selectText="What is your Speciality?"
							searchPlaceholderText="What is your Speciality?"
							showDropDowns={true}
							expandDropDowns={true}
							readOnlyHeadings={true}
							onSelectedItemsChange={this.onSelectedItemsChange}
							selectedItems={this.state.selectedItems}
							styles={{
								button: {
									backgroundColor: '#02B2FE',
								},
								selectToggleText: {
									color: 'black',
									fontFamily: fonts.fontPrimaryLight,
									opacity: 0.8,
									paddingRight: 10,
									fontSize: normalize(12),
								},
								selectToggle: {
									//backgroundColor: 'whit',
									marginTop: verticalScale(5),
								},
								container: {
									marginVertical: verticalScale(100),
								},
								chipText: {
									maxWidth: Dimensions.get('screen').width,
								},
								selectedItemText: {
									color: 'black',
									fontFamily: fonts.fontPrimaryLight,
								},
								selectText: {
									color: 'green',
								},
								itemText: {
									color: 'black',
									fontFamily: fonts.fontPrimaryLight,
								},
								subItemText: {
									color: 'black',
									fontFamily: fonts.fontPrimaryLight,
								},
							}}
						/>
						<Text
							style={{
								color: 'rgb(213, 0, 0)',
								fontSize: 12,
								marginVertical: verticalScale(2),
							}}
						>
							{this.state.specialityerror}
						</Text>
						<Dropdown
							error={this.state.gradeerror}
							label={'What is your Grade?'}
							data={doctorgrade}
							fontSize={15}
							pickerStyle={{
								borderWidth: 1,
								borderColor: '#666666',
								borderRadius: 5,
							}}
							value={this.props.grade.value}
							itemTextStyle={[
								{
									fontSize: 16,
									fontFamily: fonts.fontPrimaryLight,
								},
							]}
							onChangeText={(value, index) =>
								SignupUpdate({
									prop: 'grade',
									value: { value: value, id: doctorgrade[index].id },
								})
							}
						/>

						<View
							style={{
								height: verticalScale(70),
								width,
								marginRight: 2,

								marginTop: verticalScale(15),
							}}
						>
							<Text style={{ opacity: 0.7 }}>Are you GMC registered?</Text>

							<View
								style={{
									flexDirection: 'row',
									justifyContent: 'space-around',
									marginRight: scale(50),
									marginTop: verticalScale(10),
								}}
							>
								<Genderfield
									selected={this.props.havegmcnumber === true}
									onPress={() => SignupUpdate({ prop: 'havegmcnumber', value: true })}
									label="Yes"
								/>
								<Genderfield
									selected={this.props.havegmcnumber === false}
									onPress={() => SignupUpdate({ prop: 'havegmcnumber', value: false })}
									label="No"
								/>
							</View>
							<Text
								style={{
									color: 'rgb(213, 0, 0)',
									fontSize: 12,
									marginVertical: verticalScale(2),
								}}
							>
								{this.state.gmcerror}
							</Text>
						</View>

						{this.props.havegmcnumber ? (
							<View>
								<TextField
									ref="gmcnumber"
									maxLength={20}
									value={this.props.gmcnumber}
									defaultValue={''}
									keyboardType="default"
									autoCapitalize="none"
									autoCorrect={false}
									enablesReturnKeyAutomatically={true}
									onFocus={this.onFocus}
									onChangeText={text => SignupUpdate({ prop: 'gmcnumber', value: text })}
									onSubmitEditing={() => Keyboard.dismiss()}
									returnKeyType="next"
									label="Enter your GMC number"
									error={this.state.gmcnumbererror}
									tintColor={'#02B2FE'}
								/>

								<TouchableOpacity style={{ flex: 1 }} onPress={() => this.setState({ isOpen: true })}>
									<Text
										style={{
											fontSize: 14,
											fontFamily: fonts.fontPrimaryLight,
											color: '#02B2FE',
										}}
									>
										Click to Verfiy GMC NUMBER
									</Text>
								</TouchableOpacity>
							</View>
						) : (
							<View>
								<TextField
									ref="profregno"
									maxLength={20}
									value={this.props.profregno}
									defaultValue={''}
									keyboardType="default"
									autoCapitalize="none"
									autoCorrect={false}
									enablesReturnKeyAutomatically={true}
									onFocus={this.onFocus}
									onChangeText={text => SignupUpdate({ prop: 'profregno', value: text })}
									onSubmitEditing={() => Keyboard.dismiss()}
									returnKeyType="next"
									label="Professional Registration Number"
									error={this.state.profregnoererror}
									tintColor={'#02B2FE'}
								/>
								<View style={{ marginLeft: 1 }}>
									<Accordion Header="Occupational Health Screen for EPP">
										<DocumentUploader
											// docurl={this.props.profdoc}
											documentSelected={response =>{
												console.log('response',response)
												SignupUpdate({ prop: 'profdoc', value: response })
											
											}}
										/>

										<Text
											style={{
												color: 'rgb(213, 0, 0)',
												fontSize: 12,
												marginVertical: verticalScale(2),
											}}
										>
											{this.state.profdocerror}
										</Text>
									</Accordion>
								</View>
							</View>
						)}

						<View
							style={{
								height: verticalScale(70),
								width,
								marginRight: 2,

								marginTop: verticalScale(15),
							}}
						>
							<Text style={{ opacity: 0.7 }}>Right to work in the UK?</Text>

							<View
								style={{
									flexDirection: 'row',
									justifyContent: 'space-around',
									marginRight: scale(50),
									marginTop: verticalScale(10),
								}}
							>
								<Genderfield
									selected={this.props.righttoworkUK === true}
									onPress={() => SignupUpdate({ prop: 'righttoworkUK', value: true })}
									label="Yes"
								/>
								<Genderfield
									selected={this.props.righttoworkUK === false}
									onPress={() => SignupUpdate({ prop: 'righttoworkUK', value: false })}
									label="No"
								/>
							</View>
							<Text
								style={{
									color: 'rgb(213, 0, 0)',
									fontSize: 12,
									marginVertical: verticalScale(2),
								}}
							>
								{this.state.gmcerror}
							</Text>
						</View>

						{!this.props.righttoworkUK ? (
							<SectionedMultiSelect
								items={items}
								uniqueKey="id"
								subKey="children"
								displayKey="title"
								selectText={'Select Countries you prefer to work in'}
								searchTextInput="Select Countries you prefer to work in"
								selectText="Select Countries you prefer to work in"
								searchPlaceholderText="Select Countries you prefer to work in"
								showDropDowns={true}
								expandDropDowns={true}
								readOnlyHeadings={true}
								onSelectedItemsChange={this.onSelectedItemsChange2}
								selectedItems={this.state.selectedItems2}
								onCancel={this.onCancel}
								styles={{
									button: {
										backgroundColor: '#02B2FE',
									},
									selectToggleText: {
										color: 'black',
										fontFamily: fonts.fontPrimaryLight,
										fontSize: normalize(12),
										opacity: 0.8,
										paddingRight: 10,
									},
									selectToggle: {
										//backgroundColor: 'whit',
										marginTop: verticalScale(10),
									},
									container: {
										marginVertical: verticalScale(100),
									},
									chipText: {
										maxWidth: Dimensions.get('screen').width - 90,
									},
									itemText: {
										color: 'black',
										fontFamily: fonts.fontPrimaryLight,
									},
									subItemText: {
										color: 'black',
										fontFamily: fonts.fontPrimaryLight,
									},
								}}
							/>
						) : null}
						<Text
							style={{
								color: 'rgb(213, 0, 0)',
								fontSize: 12,
								marginVertical: verticalScale(2),
							}}
						>
							{this.state.countrytoworkerror}
						</Text>
					</View>

					<View style={{ width, height: verticalScale(80) }} />
				</KeyboardAwareScrollView>
				<NextButton onPress={this.onSubmit} />
				<Modal
					isOpen={this.state.isOpen}
					ref={'modal7'}
					onClosed={() => this.setState({ isOpen: false })}
					style={{ width, height: height }}
					position={'top'}
					backdropPressToClose={false}
				>
					<View style={{ width, height: 30, alignItems: 'flex-end', marginRight: 10, marginTop: 10 }}>
						<EICon onPress={() => this.setState({ isOpen: false })} name="close" size={30} color="black" />
					</View>
					<WebView
						source={{ uri: 'https://webcache.gmc-uk.org/ecustomer_enu/index.aspx' }}
						style={{ width, height: height }}
					/>
				</Modal>
				{this.state.visible && (
					<Modal
						backdrop={false}
						isOpen={this.state.visible}
						onClosed={() => this.setState({ visible: false })}
						style={{
							flex: 1,
							backgroundColor: 'transparent',
							alignItems: 'center',
							justifyContent: 'center',
						}}
						position={'center'}
					>
						<View
							style={{
								flex: 1,
								backgroundColor: 'transparent',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<ActivityIndicator color={'#02B2FE'} size={'large'} />

							<Text style={{ color: '#02B2FE' }}>Loading ...</Text>
						</View>
					</Modal>
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	center: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 30,
	},
	container: {
		paddingTop: 40,
		paddingHorizontal: 20,
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
		color: '#333',
	},
	border: {
		borderBottomWidth: 1,
		borderBottomColor: '#dadada',
		marginBottom: 20,
	},
	heading: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 5,
		marginTop: 20,
	},
	label: {
		fontWeight: 'bold',
	},
	switch: {
		marginBottom: 20,
		flexDirection: 'row',
		alignItems: 'flex-end',
		justifyContent: 'space-between',
	},
});
const mapStateToProps = ({ SignupReducer, Loginreducer }) => {
	const { userid, token, userdata } = Loginreducer;
	const {
		specialist,
		havegmcnumber,
		gmcnumber,
		grade,
		profregno,
		righttoworkUK,
		countrytowork,
		profdoc,
	} = SignupReducer;
	return {
		specialist,
		havegmcnumber,
		gmcnumber,
		SignupReducer,
		grade,
		profregno,
		righttoworkUK,
		countrytowork,
		profdoc,
		userid,
		token,
	};
}; 
export default connect(
	mapStateToProps,
	{ SignupUpdate, tabUpdate }
)(SignupFormthree);
