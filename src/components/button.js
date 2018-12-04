import React, { Component } from 'react';

import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import LinearGradient from 'react-native-linear-gradient';
import { colors, normalize, scale, verticalScale, moderateScale, fonts } from '../config';
const { height, width } = Dimensions.get('window');
const Button = props => {
	function getContent() {
		if (props.children) {
			return props.children;
		}
		return (
			<View
				style={{
					flex: 1,
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				{props.iconname && (
					<View
						style={{
							alignItems: 'center',
							justifyContent: 'center',
							marginLeft: props.iconname === 'sc-facebook' ? 7 : -14,
							marginRight: props.iconname === 'sc-facebook' ? 4 : 6,
						}}
					>
						<Icon name={props.iconname} size={24} color="#FFFFFF" iconStyle={{ alignItems: 'center' }} />
					</View>
				)}
				<View style={{}}>
					<Text
						style={[props.noDefaultStyles ? '' : styles.labelStyle, props.styles ? props.styles.label : '']}
					>
						{props.label}
					</Text>
				</View>
			</View>
		);
	}

	return (
		<TouchableOpacity
			onPress={props.onPress}
			disabled={props.disabled}
			style={[props.noDefaultStyles ? '' : styles.button, props.styles ? props.styles.button : '']}
		>
			<LinearGradient
				colors={['#00B1FF', '#7EF3C7']}
				style={[styles.linearGradient,props.linearGradientStyle]}
				start={{ x: 0, y: 1 }}
				end={{ x: 1, y: 1 }}
			>
				{getContent()}
			</LinearGradient>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	labelStyle: {
		fontFamily: fonts.fontPrimaryBlack,
	},
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 5,
		height: 40,
	},
	linearGradient: {
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
});
Button.defaultProps = {
	linearGradientStyle: []
  };
export default Button;
