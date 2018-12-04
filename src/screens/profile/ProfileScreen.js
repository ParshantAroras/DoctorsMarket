import React, { Component } from 'react';
import { Dimensions, Image, ListView, PixelRatio, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import { resetNavigationTo, openURLInView } from '../../utils';
import { Logotapi,ViewMyProfile } from '../../actions/Loginactions';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import SIcon from 'react-native-vector-icons/SimpleLineIcons';
const window = Dimensions.get('window');
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import EIcon from 'react-native-vector-icons/EvilIcons';
import FIcon from 'react-native-vector-icons/Feather';
import Connection from '../../config/connection';
import { isIphoneX } from 'react-native-iphone-x-helper';
const AVATAR_SIZE = 120;
const ROW_HEIGHT = verticalScale(53);
const PARALLAX_HEADER_HEIGHT = 350;
const STICKY_HEADER_HEIGHT = isIphoneX() ? 90 : 70;
import LinearGradient from 'react-native-linear-gradient';
import { fonts, normalize, scale, verticalScale } from '../../config';
class ProfileScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			profileData: {},
			dataSource: new ListView.DataSource({
				rowHasChanged: (r1, r2) => r1 !== r2,
			}).cloneWithRows([
				'Profile Details',
				'Professional Details',
				'Structured Profile Details',
				'Change Password',
				'Terms and Policy',
			]),
		};
	}
	componentDidMount(){
		let context = this;
		console.log('this.props', this.props);
		const { token, userid,navigation } = this.props;
		let body = {
			user_id: userid,
			api_token: token
		};
		this.props.ViewMyProfile(body,(data)=>{
		 console.log('datdatadatadataa',data)
		 context.setState({profileData:data});
		});
	}

	onPress = rowData => {
		console.log(rowData, 'rowData');
		let {profileData} = this.state;
		const { navigation, userid, token } = this.props;
		if (rowData === 'Logout') {
			this.props.Logotapi({ id: userid, token, navigation });
		} else if (rowData === 'Edit Prfoile') {
			navigation.navigate('Editprofile',{profileData});
		} else if (rowData === 'Change Password') {
			navigation.navigate('Changepassword');
		} else if (rowData === 'Change email adress') {
			navigation.navigate('Changeemail');
		} else if (rowData === 'Profile Details') {
			console.log('profileData',profileData)
			navigation.navigate('ProfileDetail',{profileData});
		} else if (rowData === 'Professional Details') {
			navigation.navigate('Professional',{profileData});
		} else if (rowData === 'Structured Profile Details') {
		    navigation.navigate('EditStructuredProfile',{profileData});
		}else if(rowData == 'Terms and Policy' ){
			navigation.navigate('WebViewPage',{
				uri : '/terms_conditions'
			})
		}
	};

	render() {
		console.log('this.props.userdata.profile_pic',this.props.userdata)
		const {
			onScroll = () => {},
			navigation: { navigate },
		} = this.props;
		return (
			<ListView
				ref="ListView"
				style={styles.container}
				dataSource={this.state.dataSource}
				renderRow={rowData => (
					<TouchableOpacity onPress={() => this.onPress(rowData)} key={rowData} style={styles.row}>
						<View style={{ flex: 3, alignItems: 'flex-start', justifyContent: 'center' }}>
							<Text
								style={{
									fontFamily: fonts.fontPrimaryRegular,
									fontSize: normalize(17),
									color: '#000000',
									opacity: 0.6,
								}}
							>
								{rowData}
							</Text>
						</View>
						<View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
							<SIcon name="arrow-right" size={12} color={'#ccc'} />
						</View>
					</TouchableOpacity>
				)}
				renderScrollComponent={props => (
					<ParallaxScrollView
						onScroll={onScroll}
						headerBackgroundColor="#333"
						backgroundColor={'#02B2FE'}
						stickyHeaderHeight={STICKY_HEADER_HEIGHT}
						parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
						backgroundSpeed={10}
						renderBackground={() => (
							<View key="background" style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
								{this.props.userdata.profile_pic ? (
									<Image
										style={styles.avatar}
										source={{
											uri: this.props.userdata.profile_pic,
											width: AVATAR_SIZE,
											height: AVATAR_SIZE,
										}}
									/>
								) : (
									<View
										style={{
											width: AVATAR_SIZE,
											height: AVATAR_SIZE,
											backgroundColor: '#ffff',
											borderRadius: 100,
										}}
									/>
								)}
								<View
									style={{
										position: 'absolute',
										top: 0,
										width: window.width,
										backgroundColor: 'rgba(0,0,0,.4)',
										height: PARALLAX_HEADER_HEIGHT,
									}}
								/>
							</View>
						)}
						renderForeground={() => (
							<View style={{ height: 300, flex: 1 }}>
								<LinearGradient
									colors={['#00B1FF', '#7EF3C7']}
									style={{
										height: 300,
										flex: 1,
										alignItems: 'center',
										justifyContent: 'center',
									}}
									start={{ x: 0, y: 1 }}
									end={{ x: 1, y: 1 }}
								>
									<View key="parallax-header" style={styles.parallaxHeader}>
										<TouchableOpacity onPress={() => navigate('Changeprofile')}>
											{this.props.userdata.profile_pic ? (
												<Image
													style={styles.avatar}
													source={{
														uri: this.props.userdata.profile_pic,
														width: AVATAR_SIZE,
														height: AVATAR_SIZE,
													}}
												/>
											) : (
												<View
													style={{
														width: AVATAR_SIZE,
														height: AVATAR_SIZE,
														backgroundColor: '#ffff',
														borderRadius: 100,
													}}
												/>
											)}
											<View style={{ position: 'absolute', bottom: 22, right: 2 }}>
												<FIcon name="camera" color={'white'} size={20} />
											</View>
										</TouchableOpacity>
										<View style={{ flexDirection: 'row' }}>
											<Text style={styles.sectionSpeakerText}>{this.props.userdata.fname}</Text>
											<Text style={[styles.sectionSpeakerText, { marginLeft: 5 }]}>
												{this.props.userdata.lname}
											</Text>
										</View>
									</View>
								</LinearGradient>
							</View>
						)}
						renderStickyHeader={() => (
							<View key="sticky-header" style={styles.stickySection}>
								<View style={{ flexDirection: 'row', marginLeft: scale(10) }}>
									<Text style={styles.sectionSpeakerText}>{this.props.userdata.fname}</Text>
									<Text style={[styles.sectionSpeakerText, { marginLeft: 5 }]}>
										{this.props.userdata.lname}
									</Text>
								</View>
							</View>
						)}
						renderFixedHeader={() => (
							<View key="fixed-header" style={styles.fixedSection}>
								<TouchableOpacity
									style={{
										width: scale(150),
										flex: 1,
										backgroundColor: 'tranparent',
										alignItems: 'flex-end',
										marginRight: scale(8),
									}}
									onPress={() => navigate('Appsetting')}
								>
									<EIcon name="gear" size={32} color="white" />
								</TouchableOpacity>
							</View>
						)}
					/>
				)}
			/>
		);
	}
}

const mapStateToProps = ({ SignupReducer, Loginreducer }) => {
	const { userid, token, userdata } = Loginreducer;
	return {
		userid,
		token,
		userdata,
	};
};
export default connect(
	mapStateToProps,
	{ Logotapi,ViewMyProfile }
)(ProfileScreen);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'black',
	},
	background: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: window.width,
		height: PARALLAX_HEADER_HEIGHT,
	},
	stickySection: {
		height: STICKY_HEADER_HEIGHT,
		width: 300,
		justifyContent: isIphoneX() ? 'flex-end' : 'center',
	},
	stickySectionText: {
		color: 'white',
		fontSize: 20,
		margin: 10,
	},
	fixedSection: {
		position: 'absolute',
		bottom: 10,
		right: 10,
	},
	fixedSectionText: {
		color: '#999',
		fontSize: 20,
	},
	parallaxHeader: {
		alignItems: 'center',
		flex: 1,
		flexDirection: 'column',
		paddingTop: 100,
	},
	avatar: {
		marginBottom: 10,
		borderRadius: AVATAR_SIZE / 2,
	},
	sectionSpeakerText: {
		color: 'white',
		fontSize: 24,
		paddingVertical: 5,
		fontFamily: fonts.fontPrimaryLight,
	},
	sectionTitleText: {
		color: 'white',
		fontSize: 18,
		paddingVertical: 5,
	},
	row: {
		overflow: 'hidden',
		flexDirection: 'row',
		paddingHorizontal: 20,
		height: ROW_HEIGHT,
		backgroundColor: 'white',
		borderColor: '#ccc',
		borderBottomWidth: 0.3,
		justifyContent: 'center',
	},
	rowText: {
		fontSize: 20,
	},
});
