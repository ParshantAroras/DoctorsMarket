import React, { Component } from 'react';
import { View, Text, Alert, Dimensions, TouchableOpacity, Keyboard, Image, ActivityIndicator } from 'react-native';
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

import SIcon from 'react-native-vector-icons/SimpleLineIcons';
import ImagePicker from 'react-native-image-picker';
import Permissions from 'react-native-permissions';
import OpenAppSettings from 'react-native-app-settings';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import fileType from 'react-native-file-type';
import { toast } from '../../components/toast';
import Spinner from '../../components/spinner';
class SignupFormthree extends Component {
	constructor(props) {
		super(props);
		this.state = {
			specialityerror: '',
			crberror: '',
			gmcerror: '',
			imageloadertwo: false,
			imageloaderone: false,
			ext1: '',
			ext2: '',
			loader: false,
		};
	}
	onSubmit = () => {
		Keyboard.dismiss();
		this.setState({
			specialityerror: '',
			crberror: '',
			gmcerror: '',
		});
		//alert(this.props.crbverified)
		const {
			specialist,
			crbverified,
			gmcnumber,
			doc1,
			doc2,
			navigation: { navigate },
		} = this.props;
		const { specialityerror, crberror, gmcerror } = this.state;
		if (!specialist.value && !specialist.id) {
			this.setState({
				specialityerror: 'Please select your speciality?',
			});
			return;
		}

		if (crbverified === null) {
			this.setState({
				crberror: 'Have you verifeid CRB?',
			});
			return;
		}
		if (gmcnumber.length === 0) {
			this.setState({
				gmcerror: 'Please enter GMC number',
			});
			return;
		}

		//  console.log(this.props.SignupReducer, "SignupReducer");

		navigate('Signupfour');
	};

	_requestPermission = () => {
		Permissions.request('photo').then(response => {
			console.log(response);
			// Returns once the user has chosen to 'allow' or to 'not allow' access
			// Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
		});
	};
	documentchooser = async number => {
		let allowedExtensions = [
			'doc',
			'docx',
			'txt',
			'pdf',
			'rtf',
			'jpeg',
			'JPEG',
			'png',
			'PNG',
			'DOC',
			'DOCX',
			'pdf',
			'PDF',
			'jpg',
			'JPG',
		];
		//	this.setState({ ext1: '', ext2: '' });
		Permissions.check('photo').then(response => {
			if (response === 'authorized') {
				const { SignupUpdate } = this.props;
				DocumentPicker.show(
					{
						filetype: [DocumentPickerUtil.allFiles()],
					},
					async (error, res) => {
						console.log(error, 'erro');
						if (error) {
							this.setState({ loader: false });
							return;
						}

						this.setState({ loader: true });
						if (
							res.type === 'video/mp4' ||
							res.type === 'application/zip' ||
							res.type === 'application/gzip' ||
							res.type === 'application/javascript'
						) {
							this.setState({ loader: false });
							toast({ text: 'File format not supported !' });
							return;
						}

						let b = await fileType(res.uri);
						//	console.log(b);
						this.setState({ loader: false });
						if (allowedExtensions.indexOf(b.ext) === -1) {
							toast({ text: 'File format not supported !' });
							return;
						}

						if (res) {
							if (number === 1) {
								//alert('doc1');
								SignupUpdate({ prop: 'doc1', value: res });
								this.setState({ ext1: b.ext });
							} else if (number === 2) {
								//alert('doc2');
								SignupUpdate({ prop: 'doc2', value: res });
								this.setState({ ext2: b.ext });
							}
						}
					}
				);
			} else {
				Permissions.request('photo').then(response => {
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
				});
			}
		});
	};

	checkURL = ext => {
		let images = ['jpeg', 'JPEG', 'png', 'PNG', 'PDF', 'jpg', 'JPG'];
		console.log(images.indexOf(ext) === -1);
		return images.indexOf(ext) != -1;
	};

	checkfileformat = val => {
		let Re = /^(([a-zA-Z]:)|(\\{2}\w+)\$?)(\\(\w[\w].*))+(.jpeg|.JPEG| .png|.PNG|.doc|.docx|.DOC|.DOCX|.pdf|.PDF)$/;

		return Re.test(val);
	};

	renderImagesecond = () => {
		console.log(this.state.ext1);
		if (!this.props.doc2) {
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
			if (this.checkURL(this.state.ext2)) {
				return (
					<Image
						onLoadStart={e => this.setState({ imageloadertwo: true })}
						onLoadEnd={e => this.setState({ imageloadertwo: false })}
						source={{ uri: this.props.doc2.uri }}
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
					</View>
				);
			}
		}
	};

	renderImagefirst = () => {
		console.log(this.state.ext1);
		if (!this.props.doc1) {
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
			if (this.checkURL(this.state.ext1)) {
				return (
					<Image
						onLoadStart={e => this.setState({ imageloaderone: true })}
						onLoadEnd={e => this.setState({ imageloaderone: false })}
						source={{ uri: this.props.doc1.uri }}
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
					</View>
				);
			}
		}
	};
	render() {
		const {
			navigation: { navigate },
			SignupUpdate,
		} = this.props;
		//console.log(this.state.ext1, this.state.ext2);
		console.log(this.state.loader, 'loader for file');
		// alert(this.state.imageloadertwo);
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
					<StepIndicatorView position={2} />
					<View
						style={{
							flex: 0.2,
							paddingHorizontal: scale(10),
							paddingTop: verticalScale(18),
						}}
					>
						<Text
							style={{
								fontFamily: fonts.fontPrimaryLight,
								fontSize: normalize(36),
								marginVertical: verticalScale(10),
								color: '#000000',
								opacity: 0.8,
							}}
						>
							Professional Details
						</Text>
					</View>
					<View style={{ flex: 0.8, paddingHorizontal: scale(10) }}>
						<Dropdown
							error={this.state.specialityerror}
							label={'What is you speciality?'}
							data={doctorslist}
							fontSize={15}
							pickerStyle={{
								borderWidth: 1,
								borderColor: '#666666',
								borderRadius: 5,
							}}
							value={this.props.specialist.value}
							itemTextStyle={[
								{
									fontSize: 16,
									fontFamily: fonts.fontPrimaryLight,
								},
							]}
							onChangeText={(value, index) =>
								SignupUpdate({
									prop: 'specialist',
									value: { value: value, id: doctorslist[index].id },
								})
							}
						/>

						<View
							style={{
								height: verticalScale(70),
								width,
								marginRight: 2,

								marginTop: verticalScale(10),
							}}
						>
							<Text style={{ opacity: 0.7 }}>Are you CRB verified?</Text>

							<View
								style={{
									flexDirection: 'row',
									justifyContent: 'space-around',
									marginRight: scale(50),
									marginTop: verticalScale(10),
								}}
							>
								<Genderfield
									selected={this.props.crbverified === true}
									onPress={() => SignupUpdate({ prop: 'crbverified', value: true })}
									label="Yes"
								/>
								<Genderfield
									selected={this.props.crbverified === false}
									onPress={() => SignupUpdate({ prop: 'crbverified', value: false })}
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
								{this.state.crberror}
							</Text>
						</View>
						<TextField
							ref="gmcnumber"
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
							error={this.state.gmcerror}
							tintColor={'#02B2FE'}
						/>

						<Text style={{ opacity: 0.7, marginTop: verticalScale(12) }}>Upload documnet</Text>
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
								{this.state.imageloaderone ? (
									<View
										style={{
											flex: 1,
											alignItems: 'center',
											justifyContent: 'center',
											marginTop: verticalScale(80),
										}}
									>
										<ActivityIndicator color={'#02B2FE'} size={'large'} />
									</View>
								) : null}
								{this.renderImagefirst()}
							</TouchableOpacity>
						</View>
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
								onPress={() => this.documentchooser(2)}
							>
								{this.state.imageloadertwo ? (
									<View
										style={{
											flex: 1,
											alignItems: 'center',
											justifyContent: 'center',
											marginTop: verticalScale(100),
										}}
									>
										<ActivityIndicator color={'#02B2FE'} size={'large'} />
									</View>
								) : null}
								{this.renderImagesecond()}
							</TouchableOpacity>
						</View>
					</View>
					<Spinner visible={this.state.loader} text={'Loading....'} />
					<View style={{ width, height: verticalScale(80) }} />
				</KeyboardAwareScrollView>
				<NextButton onPress={this.onSubmit} />
			</View>
		);
	}
}
const mapStateToProps = ({ SignupReducer }) => {
	const { specialist, crbverified, gmcnumber, doc1, doc2 } = SignupReducer;
	return { specialist, crbverified, gmcnumber, SignupReducer, doc1, doc2 };
};
export default connect(
	mapStateToProps,
	{ SignupUpdate }
)(SignupFormthree);
