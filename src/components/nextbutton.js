import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { isIphoneX } from 'react-native-iphone-x-helper';
import LinearGradient from 'react-native-linear-gradient';
import { colors, normalize, scale, verticalScale, moderateScale, fonts } from '../config';
export default class NextButton extends Component {
	static defaultProps = {
		disabled: false,
	};
	constructor(props) {
		super(props);
	}

	render() {
		//	alert(this.props.loader);
		const { onPress } = this.props;
		return (
			<TouchableOpacity
				style={{
					position: 'absolute',
					right: scale(30),
					bottom: verticalScale(45),
					width: 60,
					height: 60,
					backgroundColor: '#00B1FF',
					borderRadius: 100,
				}}
				disabled={this.props.disabled}
				onPress={onPress}
			>
				<LinearGradient
					colors={['#00B1FF', '#7EF3C7']}
					style={styles.linearGradient}
					start={{ x: 0, y: 1 }}
					end={{ x: 1, y: 1 }}
					style={{
						flex: 1,
						alignItems: 'center',
						justifyContent: 'center',
						borderRadius: 100,
					}}
				>
					<Icon name="md-arrow-forward" size={25} color={'#fff'} />
				</LinearGradient>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	actionButtonIcon: {
		fontSize: 20,
		height: 22,
		color: 'white',
	},
});
