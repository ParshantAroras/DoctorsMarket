import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Image,
	Dimensions,
	DeviceEventEmitter,
	Keyboard,
	Alert,
} from 'react-native';

import { colors, normalize, scale, verticalScale, moderateScale, fonts } from '../../config';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';
const { height, width } = Dimensions.get('window');
import { connect } from 'react-redux';
import Button from '../../components/button';
import Spinner from '../../components/spinner';
import RestClient from '../../utils/restclient';
import { profileimageupdate, reset } from '../../actions/Loginactions';
import { toast } from '../../components/toast';
import Permissions from 'react-native-permissions';
import OpenAppSettings from 'react-native-app-settings';
import { resetNavigationTo } from '../../utils';
class ChangeProfileImage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			image: null,
			changing: false,
			loader: false,
		};
	}

	static navigationOptions = ({ navigation }) => {
		const { params = {} } = navigation.state;
		return {
			headerRight: (
				<Icon
					size={20}
					color={'#37a6ff'}
					style={{ marginHorizontal: scale(25) }}
					name={'pencil'}
					onPress={() => params.onPressicon()}
				/>
			),
		};
	};

	componentWillMount() {
		const { userdata } = this.props;
		//console.log(userdata.profile_pic, "this.state.image");
		if (userdata.profile_pic != null) {
			this.setState({ image: userdata.profile_pic });
		}

		this.props.navigation.setParams({ onPressicon: this.selectPhotoTapped });
	}

	_requestPermission = () => {
		Permissions.request('photo').then(response => {
			console.log(response);
		});
	};

	savephoto = () => {
		const { userid, token, navigation } = this.props;
		var formData = new FormData();
		//  formData.append("email",email);
		formData.append('id', userid);
		formData.append('api_token', token);
		formData.append('profile_pic', {
			name: this.state.image.match(/[-_\w]+[.][\w]+$/i)[0],
			uri: this.state.image,
			type: 'image/jpg',
		});
		// console.log("formadatra",formData,RestClient.imageUpload);
		this.setState({ loader: true });
		RestClient.imageUpload('/apis/updateImage', {}, formData)
			.then(response => {
				console.log(response, 'response');
				if (response.status == 200) {
					this.setState({ loader: false, changing: false });
					data = response.data;
					this.props.profileimageupdate(data);
					//  DeviceEventEmitter.emit("showToast", response.message);
					toast({ text: response.message });
				} else if (response.status == 401) {
					resetNavigationTo('auth', navigation);
					this.props.reset();
					toast({ text: 'Alreay logined on another deivce', type: 'danger' });
				} else if (response.status == 400) {
					this.setState({ loader: false });
					toast({ text: response.message });
				}
			})
			.catch(error => {
				this.setState({ loader: false });
				toast({ text: 'Please check your internet', type: 'danger' });
			});
	};
	selectPhotoTapped = () => {
		Permissions.check('photo').then(response => {
			if (response === 'authorized') {
				const options = {
					quality: 1.0,
					maxWidth: width,
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
						let source = { uri: response.uri };

						this.setState({ image: response.uri, changing: true });
					}
				});
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
						Alert.alert(
							'Permissions Request',
							'Please go to Settings > Applications > Doctors Market > Permissions > Allow gallery and camera permission  for  Doctors Market to access your Gallery and Camera',
							[
								{ text: 'Settings', onPress: () => OpenAppSettings.open() },
								{ text: 'OK', onPress: () => console.log('jo') },
							],
							{ cancelable: false }
						);
					});
			}
		});
	};
	componentWillUnmount() {
		this.setState({ changing: false });
	}
	render() {
		console.log(this.state.image, 'image');
		const {
			navigation: { navigate },
		} = this.props;
		let tabBarHeight = 0;
		const { image } = this.state;
		return (
			<View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center' }}>
				<View style={{ flex: 0.6, alignItems: 'center', justifyContent: 'center' }}>
					{this.state.image == null ? (
						<Image
							source={require('../../images/avatar.png')}
							style={{ width, height: verticalScale(250) }}
							resizeMode={'contain'}
						/>
					) : (
						<Image
							source={{ uri: this.state.image }}
							style={{ width, height: verticalScale(250) }}
							resizeMode={'cover'}
						/>
					)}
				</View>
				{this.state.changing && (
					<View
						style={{
							flex: 0.3,
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<Button
							label={'SAVE'}
							disabled={false}
							onPress={this.savephoto}
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
									marginVertical: 5,
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
				)}
				{this.state.loader && <Spinner visible={this.state.loader} text={'Uploading image....'} />}
			</View>
		);
	}
}

const mapStateToProps = ({ Loginreducer }) => {
	const { userdata, userid, token } = Loginreducer;
	return {
		userdata,
		userid,
		token,
	};
};
export default connect(
	mapStateToProps,
	{ profileimageupdate, reset }
)(ChangeProfileImage);
