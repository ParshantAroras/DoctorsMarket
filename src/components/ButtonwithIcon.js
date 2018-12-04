import React, { Component } from 'react';

import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import LinearGradient from 'react-native-linear-gradient';
import { colors, normalize, scale, verticalScale, moderateScale, fonts } from '../config';
const { height, width } = Dimensions.get('window');
const ButtonwithIcon = props => {
	function onPress() {
		alert('lpp');
	}
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
						<Icon name={props.iconname} size={24} color="green" iconStyle={{ alignItems: 'center' }} />
					</View>
				)}
				<View>
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
			onPress={this.onPress}
			disabled={props.disabled}
			style={{
				width: 200,
				height: 40,
				backgroundColor: 'white',
				borderColor: '#666666',
				borderWidth: 1,
				marginRight: 5,
			}}
		>
			{getContent()}
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

export default ButtonwithIcon;
