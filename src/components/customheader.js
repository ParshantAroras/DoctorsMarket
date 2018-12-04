import React, { Component } from 'react';
import { StatusBar, Image, Text } from 'react-native';
import { colors, normalize, scale, verticalScale, moderateScale, fonts } from '../config';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import { connect } from 'react-redux';
class CustomeHeader extends Component {
	componentWillMount() {
		StatusBar.setHidden(true);
	}
	render() {
		const {
			navigation: { navigate },
		} = this.props;
		return (
			<Header style={{ backgroundColor: '#FFFFFF' }} androidStatusBarColor={'#FFFFFF'}>
				<Left>
					<Button onPress={() => navigate('DrawerOpen')} transparent>
						<Image
							source={require('../images/humberg.png')}
							style={{ width: 15, height: 14, marginLeft: 5 }}
						/>
					</Button>
				</Left>
				<Body />
				<Right>
					<Button onPress={() => navigate('Notificationscreen')} transparent>
						<Image
							source={
								this.props.noticlear
									? require('../images/noti.png')
									: require('../images/noti_reco.png')
							}
							style={{ width: moderateScale(20), height: moderateScale(20), marginLeft: 5 }}
						/>
					</Button>
					<Button onPress={() => navigate('Appsetting')} transparent>
						<Icon
							size={18}
							style={{ fontSize: 35, color: '#000000', opacity: 0.9, paddingBottom: 3 }}
							name="md-more"
						/>
					</Button>
				</Right>
			</Header>
		);
	}
}

const mapStateToProps = ({ Notireducer }) => {
	const { noticlear } = Notireducer;
	return {
		noticlear,
	};
};

export default connect(
	mapStateToProps,
	null
)(CustomeHeader);
