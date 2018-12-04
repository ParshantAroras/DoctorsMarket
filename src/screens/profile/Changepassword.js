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
import { resetNavigationTo } from '../../utils';
class Changepassword extends Component {
	constructor(props) {
		super(props);
		this.state = {
			password: '',
			newpassword: '',
			confirmpassword: '',
			passworderror: '',
			confirmpassworderror: '',
			newpassworderror: '',
			loader: false,
		};
	}
	onSubmit = () => {
		const { password, newpassword, confirmpassword } = this.state;
		const { userid, token, navigation } = this.props;
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

		if (password.length < 6) {
			this.setState({
				passworderror: 'Password must be in between 6-10 characters.',
			});
			return;
		}
		if (newpassword.length === 0) {
			this.setState({ newpassworderror: 'Please fill password' });
			return;
		}
		if (newpassword.length < 2) {
			this.setState({
				newpassworderror: 'Password sholud be minimum two length character',
			});
			return;
		}

		if (newpassword.length < 6) {
			this.setState({
				newpassworderror: 'Password must be in between 6-10 characters.',
			});
			return;
		}
		if (newpassword !== confirmpassword) {
			this.setState({ confirmpassworderror: 'Password doesnot match!' });
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
				this.setState({
					password: '',
					newpassword: '',
					confirmpassword: '',
					passworderror: '',
					confirmpassworderror: '',
					newpassworderror: '',
				});
			} else if (res.status == 401) {
				toast({ text: res.message });
				this.props.reset();
				resetNavigationTo('auth', navigation);
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
						ref="oldpassword"
						value={this.state.password}
						defaultValue={''}
						secureTextEntry={true}
						keyboardType="default"
						autoCapitalize="none"
						autoCorrect={false}
						enablesReturnKeyAutomatically={true}
						onFocus={this.onFocus}
						onChangeText={text => this.setState({ password: text })}
						onSubmitEditing={() => this.refs['newpassword'].focus()}
						returnKeyType="next"
						label="Old password"
						error={this.state.passworderror}
						tintColor={'#02B2FE'}
					/>
					<TextField
						ref="newpassword"
						value={this.state.newpassword}
						secureTextEntry={true}
						defaultValue={''}
						keyboardType="default"
						autoCapitalize="none"
						autoCorrect={false}
						enablesReturnKeyAutomatically={true}
						onFocus={this.onFocus}
						onChangeText={text => this.setState({ newpassword: text })}
						onSubmitEditing={() => this.refs['conpassword'].focus()}
						returnKeyType="next"
						label="New password"
						error={this.state.newpassworderror}
						tintColor={'#02B2FE'}
					/>
					<TextField
						ref="conpassword"
						value={this.state.confirmpassword}
						defaultValue={''}
						keyboardType="default"
						autoCapitalize="none"
						autoCorrect={false}
						secureTextEntry={true}
						enablesReturnKeyAutomatically={true}
						onFocus={this.onFocus}
						onChangeText={text => this.setState({ confirmpassword: text })}
						onSubmitEditing={() => Keyboard.dismiss()}
						returnKeyType="next"
						label="Confirm password"
						error={this.state.confirmpassworderror}
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
							label={'SAVE'}
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
					{this.state.loader && <Spinner visible={this.state.loader} text="Changing password.." />}
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
)(Changepassword);
