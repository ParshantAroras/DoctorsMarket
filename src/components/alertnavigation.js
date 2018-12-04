import { Alert } from 'react-native';
import { Toast } from 'native-base';
import { colors, normalize, scale, verticalScale, moderateScale, fonts } from '../config';
export const Alertnavigation = navigaion => {
	Alert.alert(
		'Doctors Market',
		'Please upload document for verifcaion',
		[
			{ text: 'Goto profile', onPress: () => navigaion.navigate('MyProfile') },
			{ text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
		],
		{ cancelable: false }
	);
};
