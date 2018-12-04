import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { colors, normalize, scale, verticalScale, moderateScale, fonts } from '../../config';
import { TextField } from 'react-native-material-textfield';
import Button from '../../components/button';
const { height, width } = Dimensions.get('window');
import { toast } from '../../components/toast';
import Regex from '../../utils/regex';
import RestClient from '../../utils/restclient';
import { connect } from 'react-redux';
import Spinner from '../../components/spinner';
import { reset } from '../../actions/Loginactions';
class Changeemail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			emailerror: '',
			password: '',
			passworderror: '',
			loader: false,
		};
	}
	onSubmit = () => {
		const { password, newpassword, confirmpassword } = this.state;
		const {
			userid,
			token,
			navigation: { navigate },
		} = this.props;
		if (password.length === 0) {
			this.setState({ passworderror: 'Please fill password' });
			return;
		}
		if (password.length < 2) {
			this.setState({
				passworderror: 'Password sholud be minimum two length character',
			});
			return;
		}
		if (!Regex.validateEmail(email)) {
			this.setState({
				emailerror: 'Please enter valid email adress',
			});
			return;
		}

		this.setState({ loader: true });
		RestClient.post(
			'/apis/changePassword',
			{},
			{
				password: newpassword,
				current_password: password,
				id: userid,
				api_token: token,
			}
		).then(res => {
			this.setState({ loader: false });
			if (res.status === 200) {
				toast({ text: res.message });
			} else if (res.status == 401) {
				toast({ text: res.message });
				this.props.reset();
				navigate('auth');
			} else if (res.status == 400) {
				toast({ text: res.message });
			}
		});
	};
	render() {
		const {
			navigation: { navigate },
		} = this.props;
		//alert(this.state.loader)
		return (
			<View style={{ flex: 1, backgroundColor: '#fff' }}>
				<KeyboardAwareScrollView
					style={{
						flex: 1,
						backgroundColor: '#fff',
						paddingHorizontal: scale(20),
						paddingTop: verticalScale(18),
					}}
				>
					<TextField
						ref="email"
						value={this.state.email}
						defaultValue={''}
						keyboardType="default"
						autoCapitalize="none"
						autoCorrect={false}
						enablesReturnKeyAutomatically={true}
						onFocus={this.onFocus}
						onChangeText={text => this.setState({ email: text })}
						onSubmitEditing={() => this.refs['password'].focus()}
						returnKeyType="next"
						label="Email address"
						error={this.state.emailerror}
						tintColor={'#02B2FE'}
					/>
					<TextField
						ref="password"
						value={this.state.password}
						defaultValue={''}
						keyboardType="default"
						autoCapitalize="none"
						autoCorrect={false}
						enablesReturnKeyAutomatically={true}
						onFocus={this.onFocus}
						onChangeText={text => this.setState({ password: text })}
						onSubmitEditing={() => this.refs['password'].blur()}
						returnKeyType="done"
						label="Password"
						error={this.state.passworderror}
						tintColor={'#02B2FE'}
					/>

					<View
						style={{
							flex: 0.2,
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<Button
							label={'CHANGE EMAIL'}
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
					{this.state.loader && <Spinner visible={this.state.loader} text="Changing email.." />}
				</KeyboardAwareScrollView>
			</View>
		);
	}
}

const mapStateToProps = ({ Loginreducer }) => {
	const { userid, token } = Loginreducer;
	return {
		userid,
		token,
	};
};
export default connect(
	mapStateToProps,
	{ reset }
)(Changeemail);
