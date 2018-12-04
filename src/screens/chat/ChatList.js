import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import json from './sample.json';
import { colors, normalize, scale, verticalScale, moderateScale, fonts } from '../../config';
import { HeaderTitle } from '../../components/HeaderTitle';
import RestClient from '../../utils/restclient';
import { connect } from 'react-redux';
import EIcon from 'react-native-vector-icons/Entypo';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { toast } from '../../components/toast';
import { reset } from '../../actions/Loginactions';
import { resetNavigationTo } from '../../utils';
import Spinner from '../../components/spinner';
const { height, width } = Dimensions.get('window');
import moment from 'moment';
import { capitalizeFirstLetter  } from '../../utils';
import Connection from '../../config/connection';

const data = [
	{
		id: 1,
		first_name: 'G Eazy',
		message: 'I just need to be alone',
	},
	{
		id: 2,
		first_name: 'Eminem frdgvdghdfgdsgdfgdsfgdfgdsgadsgergdfbvdfbbnfgnh',
		message: 'sdf off',
	},
	{
		id: 2,
		first_name: 'Kyle',
		message: 'Lame NI**As hide your girls',
	},
	{
		id: 2,
		first_name: 'Devon Baldwin',
		message: 'Where the Avacados at tho?',
	},
];
class ChatList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: [],
			loader: false,
		};
	}

	componentWillMount() {
		//	alert('lopp');
		//this.setState({ users: json.users });
		const { userdata } = this.props;

		this.willFocusSubscription = this.props.navigation.addListener('willFocus', () => {
			this.fetchingdata();
		});
	}
	fetchingdata = () => {
		const {
			userid,
			token,
			navigation,
			userdata: { doctor },
		} = this.props;
		this.setState({ loader: true });
		RestClient.post('/apis/getContactList', {}, { user_id: doctor.user_id, api_token: token })
			.then(response => {
				console.log(response);
				this.setState({ loader: false });
				console.log(response, 'responseChat');
				if (response.status === 400) {
					toast({ text: response.message });
				} else if (response.status === 401) {
					toast({ text: response.message });
					this.props.reset();
					resetNavigationTo('auth', navigation);
				} else if (response.status === 200) {
					this.setState({ users: response.data });
				}
			})
			.catch(error => {
				console.log(error);
				//debugger;
			});
	};
	renderAvatar = (user_id,profile_pic) => {
		console.log(profile_pic, 'profile_pic',Connection.getMedia(user_id,profile_pic));
		if (profile_pic) {
			return (
				<Image
					source={{ uri: Connection.getMedia(user_id,profile_pic) }}
					style={{borderRadius: width*.08,  width: width*.16, height: width*.16 }}
					resizeMode="cover"
					resizeMethod='resize'
				/>
			);
		} else {
			return (
				<Image
					source={require('../../images/avatar.png')}
					style={{borderRadius: width*.08,  width: width*.16, height: width*.16 }}
					resizeMode="cover"
					resizeMethod='resize'
				/>
			);
		}
	};

	render() {
		//	console.log(this.state.users);
		const {
			navigation: { navigate },
		} = this.props;
		return (
			<View style={{ flex: 1, paddingHorizontal: 10, backgroundColor: '#FFFFFF' }}>
				<HeaderTitle title="Chat" />
				<FlatList
					data={this.state.users}
					showsVerticalScrollIndicator={false}
					style={{ marginTop: 10 }}
					renderItem={({ item }) => {
						console.log('item123',item);
						return (
							<TouchableOpacity
								style={{
									flex: 1,
									flexDirection: 'row',
									marginBottom: 8,
									height: verticalScale(80),
									width,
									borderBottomWidth: 0.5,
									borderColor: '#808080',
								}}
								onPress={() => navigate('ChatScreen', { item: item })}
							>
								<View style={{ flex: 0.3, alignItems: 'center', justifyContent: 'center' }}>
									{this.renderAvatar(item.sender,item.profile_pic)}
								</View>
								<View style={{ flex: 0.7 }}>
									<View
										style={{
											flex: 0.7,
											flexDirection: 'row',
											alignItems: 'center',
										}}
									>
										<View style={{ flex: 0.7 }}>
											<Text
												numberOfLines={1}
												ellipsizeMode={'tail'}
												style={{
													marginLeft: 15,
													color: '#222',
													fontSize: 15,
													opacity: 0.7,
													fontFamily: fonts.fontPrimaryBold,
													fontSize: normalize(14),
													marginRight: 5,
												}}
											>
											{item.full_name && capitalizeFirstLetter(item.full_name) }
											</Text>
										</View>
										<View style={{ flex: 0.3 }}>
											<Text style={{ marginRight: 12 }}>{
												// moment(item.created).calendar()
												moment(item.created).isSame(new Date(), "day") ? moment(item.created).format('hh: mm') : moment(item.created).isSame(new Date()- 1, "day") ? 'Yesterday' : moment(item.created).format('MMM DD')
												}
											</Text>
										</View>
									</View>
									<View
										style={{
											flex: 0.3,
											alignItems: 'center',
											justifyContent: 'flex-start',
											flexDirection: 'row',
											marginBottom: moderateScale(20),
											paddingRight : moderateScale(25)
										}}
									>
										{item.is_read === '0' ? (
											<MIcon name="check" size={12} color="black" />
										) : (
											<MIcon name="check-all" size={12} color="green" />
										)}
										<Text
											ellipsizeMode={'tail'}
											numberOfLines={1}
											style={{
												flex: 1, 
												flexWrap: 'wrap',
												marginLeft: moderateScale(5),
												color: '#222',
												fontSize: 15,
												opacity: 0.7,
												fontFamily: fonts.fontPrimaryLight,
											}}
										>
											{item.message}
										</Text>
									</View>
								</View>
							</TouchableOpacity>
						);
					}}
					keyExtractor={item => item.email}
				/>
				{this.state.loader && <Spinner visible={this.state.loader} text="Loading Chats.." />}
			</View>
		);
	}
}

const mapStateToProps = ({ Loginreducer }) => {
	const { userid, token, userdata } = Loginreducer;
	return {
		userid,
		token,
		userdata,
	};
};
export default connect(
	mapStateToProps,
	{ reset }
)(ChatList);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 50,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	h2text: {
		marginTop: 10,
		fontFamily: 'Helvetica',
		fontSize: 36,
		fontWeight: 'bold',
	},
	flatview: {
		justifyContent: 'center',
		paddingTop: 30,
		borderRadius: 2,
	},
	name: {
		fontFamily: 'Verdana',
		fontSize: 18,
	},
	email: {
		color: 'red',
	},
});
