import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { HeaderTitle } from '../../components/HeaderTitle';
import { Alertnavigation } from '../../components/alertnavigation';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import Agendascreen from './Agendascreen';
import { connect } from 'react-redux';
import moment from 'moment';
import { shedulefetching, deleteshedule } from '../../actions/Sheduleactions';

class SheduleScreen extends Component {
	static navigationOptions = {
		headerMode: 'none',
	};
	constructor(props) {
		super(props);
	}
	componentWillMount() {
		const { navigation, userid, token } = this.props;
		let body = {
			user_id: userid,
			api_token: token,
		};

		this.willFocusSubscription = this.props.navigation.addListener('willFocus', () => {
			this.props.shedulefetching({ body, navigation });
		});
		console.log(this.props.userdata);
		//debugger;
		//alert(new Date().toISOString().substring(0, 10));
	}

	render() {
		return (
			<View
				style={{
					flex: 1,

					backgroundColor: '#FFFFFF',
				}}
			>
				<HeaderTitle title="Shedule screen" />
				<Agendascreen selected={moment(new Date()).format('YYYY-MM-DD')} data={this.props.sheduledata} />
			</View>
		);
	}
}
const mapStateToProps = ({ Loginreducer, Shedulereducer }) => {
	const { userid, token, userdata } = Loginreducer;
	const { sheduledata, loader } = Shedulereducer;
	return {
		userid,
		token,
		userdata,
		sheduledata,
		loader,
	};
};
export default connect(
	mapStateToProps,
	{ shedulefetching, deleteshedule }
)(SheduleScreen);

