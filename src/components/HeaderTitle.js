import React from 'react';

import { colors, normalize, scale, verticalScale, moderateScale, fonts } from '../config';
import { View, Text, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('window');
export const HeaderTitle = props => (
	<View
		style={{
			height: verticalScale(55),
			width,
			paddingLeft: scale(15),
			paddingTop: verticalScale(8),
			backgroundColor: 'transparent',
			flexDirection: 'row',
		}}
	>
		<Text
			style={{
				color: '#000000',
				opacity: 0.84,
				fontFamily: fonts.fontPrimaryLight,
				fontSize: normalize(36),
			}}
		>
			{props.title}
		</Text>
	</View>
);
