import React, { PureComponent } from 'react';
import { View, Dimensions } from 'react-native';
import { colors, normalize, scale, verticalScale, moderateScale, fonts } from '../config';
const { height, width } = Dimensions.get('window');
import EIcon from 'react-native-vector-icons/Entypo';
export default class Tickcomponet extends PureComponent {
	render() {
		const { step } = this.props;
		return (
			<View
				style={{
					width,
					height: verticalScale(45),
					flexDirection: 'row',
					alignItems: 'center',
					paddingHorizontal: 20,
				}}
			>
				<View
					style={{
						width: 28,
						height: 28,
						borderRadius: 100,
						alignItems: 'center',
						justifyContent: 'center',
						borderWidth: 1,
						borderColor: '#cccccc',
					}}
				>
					{step > 1 ? <EIcon name="check" size={20} color={'#02B2FE'} /> : null}
				</View>
				<View
					style={{
						width: width / 8,
						height: 1,
						backgroundColor: '#02B2FE',
					}}
				/>
				<View
					style={{
						width: 28,
						height: 28,
						borderRadius: 100,
						alignItems: 'center',
						justifyContent: 'center',
						borderWidth: 1,
						borderColor: '#cccccc',
					}}
				>
					{step > 2 ? <EIcon name="check" size={20} color={'#02B2FE'} /> : null}
				</View>
				<View
					style={{
						width: width / 8,
						height: 1,
						backgroundColor: '#02B2FE',
					}}
				/>
				<View
					style={{
						width: 28,
						height: 28,
						borderRadius: 100,
						alignItems: 'center',
						justifyContent: 'center',
						borderWidth: 1,
						borderColor: '#cccccc',
					}}
				>
					{step > 3 ? <EIcon name="check" size={20} color={'#02B2FE'} /> : null}
				</View>
				<View
					style={{
						width: width / 8,
						height: 1,
						backgroundColor: '#02B2FE',
					}}
				/>
				<View
					style={{
						width: 28,
						height: 28,
						borderRadius: 100,
						alignItems: 'center',
						justifyContent: 'center',
						borderWidth: 1,
						borderColor: '#cccccc',
					}}
				>
					{step > 4 ? <EIcon name="check" size={20} color={'#02B2FE'} /> : null}
				</View>
				<View
					style={{
						width: width / 8,
						height: 1,
						backgroundColor: '#02B2FE',
					}}
				/>
				<View
					style={{
						width: 28,
						height: 28,
						borderRadius: 100,
						alignItems: 'center',
						justifyContent: 'center',
						borderWidth: 1,
						borderColor: '#cccccc',
					}}
				>
					{step > 5 ? <EIcon name="check" size={20} color={'#02B2FE'} /> : null}
				</View>
			</View>
		);
	}
}
