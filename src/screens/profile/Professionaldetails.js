import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, Keyboard, Image, Alert, ActivityIndicator } from 'react-native';
import { colors, normalize, scale, verticalScale, moderateScale, fonts } from '../../config';
const { height, width } = Dimensions.get('window');
import EIcon from 'react-native-vector-icons/Entypo';
import SIcon from 'react-native-vector-icons/SimpleLineIcons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import StepIndicator from '../../components/stepindicator';
import { TextField } from 'react-native-material-textfield';
import Genderfield from '../../components/genderfield';
import NextButton from '../../components/nextbutton';
import ActionButton from 'react-native-action-button';
import { isIphoneX } from 'react-native-iphone-x-helper';
import Icon from 'react-native-vector-icons/Ionicons';
import StepIndicatorView from '../../components/stpeindicatorview';

import { Dropdown } from 'react-native-material-dropdown';
import { connect } from 'react-redux';
import Regex from '../../utils/regex';
import { SignupUpdate } from '../../actions/Signupactions';

import Button from '../../components/button';

import { toast } from '../../components/toast';
import { reset, professionalupdate } from '../../actions/Loginactions';
import RestClient from '../../utils/restclient';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import doctorslist from '../../utils/doctorsspecialist';
import ImagePicker from 'react-native-image-picker';
import Spinner from '../../components/spinner';
import Permissions from 'react-native-permissions';
import OpenAppSettings from 'react-native-app-settings';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { resetNavigationTo } from '../../utils';
import doctorgrade from '../../utils/doctorgrade';
import DocumentUploader from '../../components/documentuploader';
import Accordion from '../../components/accordian';
import workingcountries from '../../utils/workingcountries';
import { Toast } from 'native-base';

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

class Professional extends Component {
	constructor(props) {
		super(props);
		console.log('profDetail', this.props.navigation.state.params.profileData)
		let { certificates, doctor: { skills, countries, Grades: { id: gradeId, name: gradeName }, is_gmc, gmc_number, prof_reg_number, prof_reg_cert, right_to_work_in_uk, country } } = this.props.navigation.state.params.profileData;

		const { } = this.props.navigation.state.params.profileData.doctor;

		let itemData = [], itemData2 = [];
		skills.map((item) => {
			itemData.push(item.id.toString())
		})
		if (!right_to_work_in_uk) {
			countries.map((item) => {
				itemData2.push(item.id.toString())
			})
		}
		this.state = {
			specialist: { value: '', id: '', locum_type_id: '' },
			doc1: null,
			doc2: null,
			crbveri: false,
			gmc: '',
			specialityerror: '',
			crberror: '',
			gmcerror: '',
			loader: false,
			firstimageloader: false,
			secondimageloader: false,
			selectedItems: itemData,
			selectedItems2: itemData2,
			gradeId,
			gradeName,
			is_gmc,
			gmc_number,
			prof_reg_number,
			prof_reg_cert,
			right_to_work_in_uk,
			country: country ? country : [],
			certificates,
			prof_reg_cert_Again: {}
		};
	}

	_requestPermission = () => {
		Permissions.request('photo').then(response => {
			console.log(response);
		});
	};

	/*-------------------------------slecetor 1-------------------------- */
	onSelectedItemsChange = selectedItems => {
		console.log('parshant', selectedItems)
		// this.props.SignupUpdate({ prop: 'specialist', value: selectedItems });
		this.setState({ selectedItems });
		// alert("456455564")
	};
	/*-------------------------------slecetor 2-------------------------- */
	onSelectedItemsChange2 = selectedItems2 => {
		// this.props.SignupUpdate({ prop: 'countrytowork', value: selectedItems2 });
		this.setState({ selectedItems2 });
	};



	onSubmit = () => {
		const { userid, token, navigation } = this.props;
		let context = this;
		let { selectedItems2, prof_reg_cert_Again , selectedItems, gmc_number, is_gmc, right_to_work_in_uk, gradeId, prof_reg_number, prof_reg_cert } = this.state;
		Keyboard.dismiss();
		this.setState({
			specialityerror: '',
			gmcnumbererror: '',
			gradeerror: '',
			profdocerror: '',
			profregnoererror: '',
			countrytoworkerror: '',
		});
		if (selectedItems.length === 0) {
			this.setState({ specialityerror: 'Please select your specialty' });
			Toast.show({
				text: 'Please select your specialty',
				buttonText: 'Okay',
				type: 'danger',
			});
			return;
		}
		console.log('gradeId', gradeId)
		if (!gradeId) {
			this.setState({ specialityerror: 'Please select your specialty' });
			Toast.show({
				text: 'Please select your specialty',
				buttonText: 'Okay',
				type: 'danger',
			});
			return;
		}

		if (is_gmc) {
			if (gmc_number.length === 0) {
				this.setState({ gmcnumbererror: 'Please enter your gmc number' });
				Toast.show({
					text: 'Please enter your gmc number',
					buttonText: 'Okay',
					type: 'danger',
				});
				return;
			}
		} else {
			if (prof_reg_number.length === 0) {
				this.setState({ profregnoererror: 'Please enter your Professional registration number' });
				Toast.show({
					text: 'Please enter your Professional registration number',
					buttonText: 'Okay',
					type: 'danger',
				});
				return;
			}
			if (prof_reg_number.length === 0) {
				if(!prof_reg_cert_Again.hasOwnProperty('uri')){
				this.setState({ profdocerror: 'Please select a document for verification' });
				Toast.show({
					text: 'Please select a document for verification',
					buttonText: 'Okay',
					type: 'danger',
				});
				return;
			}
		 }
		}

		let formdata = new FormData();
		formdata.append('user_id', this.props.userid);
		formdata.append('api_token', this.props.token);
		formdata.append('skills', JSON.stringify(selectedItems));
		formdata.append('grade_id', gradeId);
		formdata.append('is_gmc', is_gmc ? 1 : 0);
		if (is_gmc) {
			formdata.append('gmc_number', gmc_number);
		} else {
			formdata.append('prof_reg_number', prof_reg_number);
			if(prof_reg_cert_Again.hasOwnProperty('uri')){
				formdata.append('prof_doc', prof_reg_cert_Again);
			}
		}
		formdata.append('right_to_work_in_uk', right_to_work_in_uk ? 1 : 0);
		if (!right_to_work_in_uk) {
			formdata.append('countries', JSON.stringify(selectedItems2));
		}
		context.setState({ visible: true });

		console.log('editSaveProfessionalDetails', formdata)
		RestClient.imageUpload('/apis/saveProfessionalDetails', {}, formdata).then(response => {
			context.setState({ visible: false });
			console.log(response, 'resposne');
			if (response.status === 200) {
				navigation.pop();
				toast({ text: response.message });

			} else if (response.status === 401) {
				toast({ text: response.message });
			}
		}).catch(err => {
			console.log("errr", err)
			context.setState({ visible: false });
		});

		/*
		formdata.append("doc1",this.state.doc1)
		formdata.append("doc2",this.state.doc2)
		console.log(	this.state = {
			specialist: { value: '', id: '', locum_type_id: '' },
			doc1: { uri: '' },
			doc2: { uri: '' },
			crbveri: false,
			gmc: '',
			specialityerror: '',
			crberror: '',
			gmcerror: '',
		};)

*/
	};

	documentchooser = number => {
		Permissions.check('photo').then(response => {
			//	alert(response);
			console.log(response);
			if (response === 'authorized') {
				const { SignupUpdate } = this.props;
				const options = {
					quality: 1.0,
					maxWidth: 500,
					maxHeight: 500,
					storageOptions: {
						skipBackup: true,
					},
				};

				ImagePicker.showImagePicker(options, response => {
					console.log('Response = ', response);

					if (response.didCancel) {
						console.log('User cancelled photo picker');
					} else if (response.error) {
						console.log('ImagePicker Error: ', response.error);
					} else if (response.customButton) {
						console.log('User tapped custom button: ', response.customButton);
					} else {
						if (number === 1) {
							this.setState({ doc1: response });
						} else if (number === 2) {
							this.setState({ doc2: response });
						}
					}
				});

				/*				DocumentPicker.show(
					{
						filetype: [DocumentPickerUtil.allFiles()],
					},
					(error, res) => {
						// Android
						if (res) {
							if (number === 1) {
								this.setState({ doc1: res });
							} else if (number === 2) {
								this.setState({ doc2: res });
							}
						}
					}
				);
				*/
			} else {
				Permissions.request('photo')
					.then(response => {
						console.log(response);
						if (response === 'denied' || response === 'restricted') {
							Alert.alert(
								'Permissions Request',
								'Please go to Settings > Applications > Doctors Market > Permissions > Allow gallery and camera permission  for  Doctors Market to access your Gallery and Camera',
								[
									{ text: 'Settings', onPress: () => OpenAppSettings.open() },
									{ text: 'OK', onPress: this._requestPermission },
								],
								{ cancelable: false }
							);
						}
					})
					.catch(error => {
						console.log(error);
					});
			}
		});
	};

	checkURL = url => {
		console.log(url, 'myurl');
		//	let Re = /^(([a-zA-Z]:)|(\\{2}\w+)\$?)(\\(\w[\w].*))+(.jpeg|.JPEG| .png|.PNG|.doc|.docx|.DOC|.DOCX|.pdf|.PDF)$/;
		return url.match(/\.(jpeg|jpg|gif|png|JPEG|JPG|GIF|PNG|JPEG)$/) != null;
	};

	renderImagesecond = () => {
		if (!this.state.doc2) {
			return (
				<View
					style={{
						flex: 1,
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<EIcon name="documents" size={20} />
					<Text>click to upload</Text>
				</View>
			);
		} else {
			if (this.checkURL(this.state.doc2.uri)) {
				return (
					<Image
						onLoadStart={e => this.setState({ secondimageloader: true })}
						onLoadEnd={e => this.setState({ secondimageloader: false })}
						source={{ uri: this.state.doc2.uri }}
						style={{
							width: width - 40,
							height: verticalScale(200),
						}}
					/>
				);
			} else {
				return (
					<View style={{ flex: 1, backgroundColor: '#333', alignItems: 'center', justifyContent: 'center' }}>
						<SIcon name="docs" size={25} color={'white'} />
						<Text style={{ color: 'white' }}>Attachment</Text>
					</View>
				);
			}
		}
	};

	renderImagefirst = () => {
		let { prof_reg_cert } = this.state;
		if (prof_reg_cert == null) {
			return (
				<View
					style={{
						flex: 1,
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<EIcon name="documents" size={20} />
					<Text>click to upload</Text>
				</View>
			);
		} else {
			if (this.checkURL(this.state.prof_reg_cert.uri)) {
				return (
					<Image
						onLoadStart={e => this.setState({ firstimageloader: true })}
						onLoadEnd={e => this.setState({ firstimageloader: false })}
						source={{ uri: this.state.prof_reg_cert.uri }}
						style={{
							width: width - 40,
							height: verticalScale(200),
						}}
					/>
				);
			} else {
				return (
					<View style={{ flex: 1, backgroundColor: '#333', alignItems: 'center', justifyContent: 'center' }}>
						<SIcon name="docs" size={25} color={'white'} />
						<Text style={{ color: 'white' }}>Attachment</Text>
					</View>
				);
			}
		}
	};

	render() {
		let context = this;
		const {
			navigation: { navigate },
			SignupUpdate,
		} = this.props;
		let { is_gmc, certificates, prof_reg_cert } = this.state;
		console.log(this.state.doc1, this.state.doc2);

		//alert(this.state.firstimageloader);
		return (
			<View style={{ flex: 1, backgroundColor: '#fff' }}>
				<KeyboardAwareScrollView
					style={{
						flex: 1,
						backgroundColor: '#fff',
						paddingHorizontal: scale(10),
						paddingTop: verticalScale(18),
					}}
				>
					<View style={{ flex: 0.8, paddingHorizontal: scale(10) }}>
						<SectionedMultiSelect
							items={item2}
							uniqueKey="id"
							subKey="children"
							displayKey="title"
							selectText={'Do you need to change Speciality?'}
							searchTextInput="Do you need to change Speciality?"
							selectText="Do you need to change Speciality?"
							searchPlaceholderText="Do you need to change Speciality?"
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
						<Dropdown
							error={this.state.gradeerror}
							label={'Update your Grade?'}
							data={doctorgrade}
							fontSize={15}
							pickerStyle={{
								borderWidth: 1,
								borderColor: '#666666',
								borderRadius: 5,
							}}
							value={this.state.gradeName}
							itemTextStyle={[
								{
									fontSize: 16,
									fontFamily: fonts.fontPrimaryLight,
								},
							]}
							onChangeText={(value, index) => {
								console.log('value, index', value, index)
								context.setState({
									gradeId: doctorgrade[index].id,
									gradeName: value
								})
								// SignupUpdate({
								// 	prop: 'grade',
								// 	value: { value: value, id: doctorgrade[index].id },
								// })
							}

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
									selected={this.state.is_gmc === 1}
									onPress={() => this.setState({ is_gmc: 0 })}
									label="Yes"
								/>
								<Genderfield
									selected={this.state.is_gmc === 0}
									onPress={() => this.setState({ is_gmc: 1 })}
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
						{this.state.is_gmc ? (
							<View>
								<TextField
									ref="gmcnumber"
									value={this.state.gmc_number}
									defaultValue={''}
									keyboardType="default"
									autoCapitalize="none"
									autoCorrect={false}
									enablesReturnKeyAutomatically={true}
									onFocus={this.onFocus}
									onChangeText={text => this.setState({ gmc_number: text })}
									onSubmitEditing={() => Keyboard.dismiss()}
									returnKeyType="next"
									label="Enter your GMC number"
									error={this.state.gmcerror}
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
										value={this.state.prof_reg_number}
										defaultValue={''}
										keyboardType="default"
										autoCapitalize="none"
										autoCorrect={false}
										enablesReturnKeyAutomatically={true}
										onFocus={this.onFocus}
										onChangeText={text => this.setState({ prof_reg_number: text })}
										onSubmitEditing={() => Keyboard.dismiss()}
										returnKeyType="next"
										label="Professional Registration Number"
										error={this.state.profregnoererror}
										tintColor={'#02B2FE'}
									/>
									<View style={{ marginLeft: 1 }}>
										<Accordion Header="Occupational Health Screen for EPP">
											<DocumentUploader
												docurl={certificates + prof_reg_cert}
												documentSelected={response => {
													console.log('response', response)
													// SignupUpdate({ prop: 'profdoc', value: response })
													this.setState({prof_reg_cert_Again: response})
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
						{/* <Text style={{ opacity: 0.7, marginTop: verticalScale(12) }}>Uploaded documnet</Text>
						<View
							style={{
								width: width - 40,
								marginRight: scale(50),
								height: verticalScale(200),
								backgroundColor: 'transparent',
								borderWidth: 1,
								borderColor: '#787878',
								marginTop: verticalScale(12),
							}}
						>
							<TouchableOpacity
								style={{
									flex: 1,
								}}
								onPress={() => this.documentchooser(1)}
							>
								{this.renderImagesecond()}
							</TouchableOpacity>
						</View> */}
						{/* <View
							style={{
								width: width - 40,
								marginRight: scale(50),
								height: verticalScale(200),
								backgroundColor: 'transparent',
								borderWidth: 1,
								borderColor: '#787878',
								marginTop: verticalScale(12),
							}}
						>
							<TouchableOpacity
								style={{
									flex: 1,
								}}
								onPress={() => this.documentchooser(2)}
							>
								{this.renderImagesecond()}
							</TouchableOpacity>
						</View> */}


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
									selected={this.state.right_to_work_in_uk === true}
									onPress={() => this.setState({ right_to_work_in_uk: true })}
									label="Yes"
								/>
								<Genderfield
									selected={this.state.right_to_work_in_uk === false}
									onPress={() => this.setState({ right_to_work_in_uk: false })}
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

						{!this.state.right_to_work_in_uk && (
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
						)}
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








					<View
						style={{
							flex: 0.2,
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<Button
							label={'EDIT'}
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
									marginVertical: verticalScale(40),
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

					<View style={{ width, height: 50, backgroundColor: '#fff' }} />
				</KeyboardAwareScrollView>
				{this.state.loader && <Spinner visible={this.state.loader} text="Changing professional details.." />}
			</View>
		);
	}
}

const mapStateToProps = ({ Loginreducer }) => {
	const { userid, token } = Loginreducer;
	return {
		userid,
		token
	};
};
export default connect(
	mapStateToProps,
	{ reset, professionalupdate }
)(Professional);
