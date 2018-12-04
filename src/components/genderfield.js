import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { scale, verticalScale, normalize, fonts } from '../config';
const Genderfield = props => {
	//  console.log(props.label, "props");
	return (
		<TouchableOpacity
			onPress={props.onPress}
			style={{
				width: scale(85),
				height: verticalScale(40),
				borderRadius: 50,
				alignItems: 'center',
				justifyContent: 'center',
				borderWidth: 1,
				marginHorizontal: 10,
				borderColor: props.selected ? '#02B2FE' : '#CCCCCC',
			}}
		>
			<Text
				style={{
					fontFamily: fonts.fontPrimaryRegular,
					fontSize: normalize(15),
					color: '#000000',
					opacity: 0.5,
				}}
			>
				{props.label}
			</Text>
		</TouchableOpacity>
	);
};

export default Genderfield;
