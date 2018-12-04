import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { scale, verticalScale, normalize, fonts } from '../config';
const GenderfieldLong = props => {
	//  console.log(props.label, "props");
	return (
		<TouchableOpacity
			onPress={props.onPress}
			style={{
				height: verticalScale(40),
				borderRadius: 50,
				alignItems: 'center',
				justifyContent: 'center',
				borderWidth: 1,
				marginHorizontal: 10,
				paddingHorizontal: verticalScale(40),
				borderColor: props.selected ? '#02B2FE' : '#CCCCCC',
				marginBottom: verticalScale(10),
			}}
		>
			<Text
				style={{
					fontFamily: fonts.fontPrimaryRegular,
					fontSize: normalize(13),
					textAlign: 'center',
					color: '#000000',
					opacity: 0.5,
				}}
			>
				{props.label}
			</Text>
		</TouchableOpacity>
	);
};

export default GenderfieldLong;
