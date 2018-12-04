import { StackNavigator, TabBarBottom, TabNavigator, NavigationActions, DrawerNavigator } from 'react-navigation';
import Changeemail from './Changeemail';
import ProfileDetail from './Profiledetails';
import Professional from './Professionaldetails';
import Contactdetail from './Contactdetails';
import ProfileScreen from './ProfileScreen';
import Editprofile from './Editprofile';
import Appsetting from './Appsetting';
import ChangeProfileImage from './Changeprofile';
import Changepassword from './Changepassword';
import { colors, verticalScale, fonts } from '../../config';
import { globalStyles } from '../../Themes/globalStyle';
export const MyProfileStackNavigator = StackNavigator({
	Profile: {
		screen: ProfileScreen,
		navigationOptions: {
			header: null,
		},
	},
	Editprofile: {
		screen: Editprofile,
		navigationOptions: {
			headerStyle: globalStyles.headerWithoutShadow,
			headerTintColor: '#37a6ff',
			title: 'Edit profile',
			tabBarVisible: false,
		},
	},
	Changeprofile: {
		screen: ChangeProfileImage,
		navigationOptions: {
			headerStyle: globalStyles.headerWithoutShadow,
			headerTintColor: '#37a6ff',
			title: 'Change profile',
			tabBarVisible: false,
		},
	},
	Changepassword: {
		screen: Changepassword,
		navigationOptions: {
			headerStyle: globalStyles.headerWithoutShadow,
			headerTintColor: '#37a6ff',
			title: 'Change password',
			tabBarVisible: false,
			headerTitleStyle: {
				fontFamily: fonts.fontPrimaryLight,
			},
		},
	},
	Changeemail: {
		screen: Changeemail,
		navigationOptions: {
			headerStyle: globalStyles.headerWithoutShadow,
			headerTintColor: '#37a6ff',
			title: 'Change email adress',
			tabBarVisible: false,
		},
	},
	ProfileDetail: {
		screen: ProfileDetail,
		navigationOptions: {
			headerStyle: globalStyles.headerWithoutShadow,
			headerTintColor: '#37a6ff',
			title: 'Profile Details',
			tabBarVisible: false,
		},
	},
	Professional: {
		screen: Professional,
		navigationOptions: {
			headerStyle: globalStyles.headerWithoutShadow,
			headerTintColor: '#37a6ff',
			title: 'Professional Details',
			tabBarVisible: false,
		},
	},
	Contactdetail: {
		screen: Contactdetail,
		navigationOptions: {
			headerStyle: globalStyles.headerWithoutShadow,
			headerTintColor: '#37a6ff',
			title: 'Contact Details',
			tabBarVisible: false,
		},
	},
	Appsetting: {
		screen: Appsetting,
		navigationOptions: {
			headerStyle: globalStyles.headerWithoutShadow,
			headerTintColor: '#37a6ff',
			title: 'Applicaiton settings',
			tabBarVisible: false,
		},
	},
});
