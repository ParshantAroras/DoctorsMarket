import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Alert,Image,Platform } from 'react-native';
const { height, width } = Dimensions.get('window');
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import ImagePicker from 'react-native-image-picker';
import Permissions from 'react-native-permissions';
import PDFView from 'react-native-view-pdf';
import EIcon from 'react-native-vector-icons/Entypo';
import { colors, normalize, scale, verticalScale, moderateScale, fonts } from '../config';
export default class DocumentUploader extends PureComponent {
	static defaultProps = {
		docurl: ''
	  }
	
	constructor(props) {
		super(props);
		let {docurl} =  this.props;
		this.state = {
			documentSelected: false,
			uri: docurl!== '' ? docurl : ''
		};
	}
	documentchooser = () => {
		const options = {
			quality: 1.0,
			maxWidth: 500,
			maxHeight: 500,
			noData: false,
			storageOptions: {
				skipBackup: true,
			},
		};
		//this.props.documentSelected({ res: 'msdfkl;' });
		Permissions.request('photo').then(response => {
			if (response === 'authorized') {
				// 	DocumentPicker.show(
				// 	{
				// 		filetype: [DocumentPickerUtil.pdf()],
				// 	},
				// 	(error, response) => {
				// 		console.log("response",response)
				// 		response.uri=decodeURIComponent(response.uri);
						
				// 	//  	if (Platform.OS === 'ios') {
				// 	//  		response.uri = response.uri.replace('file:', '')
				// 	//  		console.log('responseeeeee',response)
				// 	//    } else{

				// 	//  	response.uri = response.uri;
				// 	//    }

				// 		this.setState({ documentSelected: true ,uri:response.uri});
				// 		if (response) {
				// 			this.props.documentSelected(response);
				// 		}
				// 	}
				// );
				

				ImagePicker.showImagePicker(options, response => {
					console.log('Response = ', response);

					if (response.didCancel) {
						console.log('User cancelled photo picker');
					} else if (response.error) {
						console.log('ImagePicker Error: ', response.error);
					} else if (response.customButton) {
						console.log('User tapped custom button: ', response.customButton);
					} else {
						console.log(response, 'res');

						this.setState({ documentSelected: true ,uri:response.uri});
						if (response) {
							if (response.data) response.data = ''; // Disabling base 64---------->*/////
							console.log('datadatdatdat',response)
							var parts = response.uri.split('.');
							let TypeCheck =  parts[parts.length - 1];
                   let customResponse = {uri: response.uri, type: 'image/'+TypeCheck, name: response.fileName}
				   

							this.props.documentSelected(customResponse);
					}
					}
				});
			} else {
				this.setState({ documentSelected: true });
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
		const { documentSelected } = this.state;
		return (
			<View
				style={[
					{
						width: width - 80,
						marginRight: scale(50),
						height: verticalScale(200),
						backgroundColor: 'transparent',
						borderWidth: 2,
						borderStyle: 'dotted',
						borderColor: '#787878',
						marginTop: verticalScale(12),
					},
					this.props.styles,
				]}
			>
				<TouchableOpacity
					style={{
						flex: 1,
					}}
					onPress={this.documentchooser}
				>
					{!documentSelected &&!this.state.uri? (
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
					) : (
						<View>
						 {/*<PDFView
							fadeInDuration={250.0}
							resource={this.state.uri}
							resourceType={'url'}
							style={{
								width: width - 80,
								height: verticalScale(200),
							}}
						/>*/ }
                      <Image style={{
								width: width - 80,
								height: verticalScale(200),
							}}
							source={{uri:this.state.uri}}
							/>
						</View>

					)}
				</TouchableOpacity>
			</View>
		);
	}
}


