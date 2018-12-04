import React, { Component } from 'react';
import { View, Text, FlatList, Platform, Dimensions, TouchableOpacity } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content } from 'native-base';
import { connect } from 'react-redux';
import { colors, normalize, scale, verticalScale, moderateScale, fonts } from '../config';
import Spinner from '../components/spinner';
const { height, width } = Dimensions.get('window');
import RestClient from '../utils/restclient';
import { toast } from '../components/toast';
import { reset } from '../actions/Loginactions';
import { resetNavigationTo } from '../utils';
import moment from 'moment';

import { notificationclearing } from '../actions/Notifcationactions';
class Notificationscreen extends Component {
	constructor(props) {
		super(props);
		this.state = { loader: false, data: [] };
	}

	componentWillMount() {
		this.props.notificationclearing();
		const { userid, token, navigation } = this.props;
		this.setState({ loader: true });
		RestClient.post('/apis/getAllNotifications', {}, { user_id: userid, api_token: token }).then(resposne => {
			this.setState({ loader: false });
			if (resposne.status === 200) {
				console.log(resposne, 'resposne');
				this.setState({ data: resposne.data });
			} else if (resposne.status === 400) {
				this.props.reset();
				toast({ text: resposne.message });
				resetNavigationTo('auth', navigation);
			}
		});
	}

	renderItem = ({ item }) => {
		console.log(item, 'asdfsk');
		const {
			navigation: { navigate },
		} = this.props;
		switch (item.type) {
			case 'message':
				return (
					<TouchableOpacity
						style={{
							wdith: width - 20,
							height: verticalScale(55),
							backgroundColor: '#FFFFFF',
							marginHorizontal: 8,
							marginVertical: 3,
							alignItems: 'flex-start',
							justifyContent: 'center',
							shadowOffset: { width: 1, height: 0.8 },
							shadowColor: '#000000',
							shadowOpacity: 0.3,
						}}
						onPress={() => navigate('Messages')}
					>
						<View style={{ flexDirection: 'row' }}>
							<Text
								style={{
									marginLeft: 15,
									color: '#000000',
									fontSize: 15,
									opacity: 0.7,
									fontFamily: fonts.fontPrimaryBold,
									fontSize: normalize(12),
									marginRight: 5,
									marginTop: 3,
								}}
							>
								{item.title}
							</Text>
							<Text
								style={{
									color: '#000000',
									fontSize: 15,
									opacity: 0.7,
									fontFamily: fonts.fontPrimaryBold,
									fontSize: normalize(12),
									marginRight: 5,
									marginTop: 3,
									marginLeft: 3,
								}}
							>
								was messaged with you
							</Text>
						</View>

						<Text
							style={{
								marginLeft: 15,
								color: '#000000',
								fontSize: 15,
								opacity: 0.7,
								fontFamily: fonts.fontPrimaryLight,
								fontSize: normalize(10),
								marginRight: 5,
								marginTop: 3,
							}}
						>
							{item.body}
						</Text>
						<Text
							style={{
								marginLeft: 15,
								color: '#000000',
								fontSize: 15,
								opacity: 0.7,
								fontFamily: fonts.fontPrimaryLight,
								fontSize: normalize(9),
								marginRight: 5,
								marginTop: 3,
							}}
						>
							{moment(item.created).calendar()}
						</Text>
					</TouchableOpacity>
				);
			default:
				return <View />;
		}
	};
	render() {
		console.log(this.props.notifications, 'Notidata');
		const { navigation } = this.props;
		const { loader } = this.state;
		return (
			<Container>
				<Header transparent>
					<Left>
						<Button onPress={() => navigation.pop()} transparent>
							<Icon name="arrow-back" style={{ color: '#02B2FE' }} />
						</Button>
					</Left>
					<Body>
						<Title style={{ color: '#02B2FE' }}>Notifications</Title>
					</Body>
					<Right />
				</Header>
				<Content padder>
					{loader ? (
						<View style={{ flex: 1, marginTop: width / 2 }}>
							<Spinner visible={loader} text="Adding availabilty.." />
						</View>
					) : (
						<FlatList data={this.state.data} renderItem={item => this.renderItem(item)} />
					)}
				</Content>
			</Container>
		);
	}
}

const mapStateToProps = ({ Notireducer, Loginreducer }) => {
	const { userid, token } = Loginreducer;
	const { notifications } = Notireducer;
	return {
		notifications,
		userid,
		token,
	};
};
export default connect(
	mapStateToProps,
	{ reset, notificationclearing }
)(Notificationscreen);
