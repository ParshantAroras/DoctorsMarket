import React from 'react';
import { StackNavigator, TabBarBottom, TabNavigator, NavigationActions, DrawerNavigator } from 'react-navigation';
import { View, TouchableOpacity, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import OCIcon from 'react-native-vector-icons/Octicons';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import SIcon from 'react-native-vector-icons/SimpleLineIcons';
import FIcon from 'react-native-vector-icons/Feather';

import { colors, verticalScale, fonts } from './config';
import LoginScreen from './screens/auth/LoginScreen';
//import SignupScreen from "./screens/auth/SignupScreen";
import WalkScreen from './screens/auth/WalkScreen';
import ForgotPassword from './screens/auth/ForgotPassword';
import InvoicesScreen from './screens/invoices/InvoicesScreen';
import ChatScreen from './screens/chat/ChatScreen';
import ProfileScreen from './screens/profile/ProfileScreen';
import SheduleScreen from './screens/shedule/SheduleScreen';
import ChatList from './screens/chat/ChatList';
import AuthScreen from './screens/auth/AuthScreen';
import SignupFormone from './screens/auth/SignupFormone';
import EIcon from 'react-native-vector-icons/Ionicons';
import { globalStyles } from './Themes/globalStyle';
import Editprofile from './screens/profile/Editprofile';
import ChangeProfileImage from './screens/profile/Changeprofile';
import Changepassword from './screens/profile/Changepassword';
import Drawer from './Drawer';
import CustomHeader from './components/customheader';
import Changeemail from './screens/profile/Changeemail';
import ProfileDetail from './screens/profile/Profiledetails';
import Professional from './screens/profile/Professionaldetails';
import Contactdetail from './screens/profile/Contactdetails';
import Appsetting from './screens/profile/Appsetting';
import Notificationscreen from './screens/Notifcationscreen';
import Addshedulescreen from './screens/shedule/Addshedule';
import AppTabNavigator from './TabNavigator';
import Availabilityscreen from './screens/shedule/Availabilityscreen';
import Editshedulescreen from './screens/shedule/Editshedule';
import Jobrequest from './screens/jobrequest';
import JobRequestDetail from './screens/jobRequestDetail';
import SignupupFormfive from './screens/auth/SignupFormfive';
import SignupFormStrucProfile from './screens/auth/SignupFormStrucProfile';
import AddmoreQualification from './screens/auth/Addmorequalification';
import EditMoreQualification from './screens/profile/EditMoreQualification'
import SignupFormtwo from './screens/auth/SignupFormtwo';
import SignupFormthree from './screens/auth/SignupFormthree';
import SignupupFormfour from './screens/auth/SignupFormfour';
import Webview from './screens/webView/WebView';
import TimeLog from './screens/timeLog/TimeLog';
import TimeLog2 from './screens/timeLog/TimeLog2';
import EditStructuredProfile from './screens/profile/EditStructuredProfile'
/*
 headerStyle: config.navigation.tab
      ? globalStyles.header
      : globalStyles.headerWithoutShadow,
    headerTintColor: globalStyleVariables.HEADER_TINT_COLOR,
    headerBackTitle: null,

    */
const AuthStackNavigator = StackNavigator({
	Auth: {
		screen: AuthScreen,
		navigationOptions: {
			header: null,
		},
	},
	Login: {
		screen: LoginScreen,
		navigationOptions: {
			headerStyle: globalStyles.headerWithoutShadow,
			headerTintColor: '#37a6ff',
		},
	},
	Signupone: {
		screen: SignupFormone,
		navigationOptions: {
			headerStyle: globalStyles.headerWithoutShadow,
			headerTintColor: '#37a6ff',
		},
	},
	WebView: {
		screen: Webview,
		navigationOptions: {
			headerStyle: globalStyles.headerWithoutShadow,
			headerTintColor: '#37a6ff',
		},
	},
	ForgotPassword: {
		screen: ForgotPassword,
		navigationOptions: {
			headerStyle: globalStyles.headerWithoutShadow,
			headerTintColor: '#37a6ff',
		},
	},
});

const SheduleStackNavigator = StackNavigator(
	{
	TimeLog: {
		screen: TimeLog,
		navigationOptions: {
			header: props => <CustomHeader {...props} />,
			headerStyle: globalStyles.headerWithoutShadow,
			headerTintColor: '#37a6ff',
		
			tabBarVisible: true,
		},
	},
	TimeLog2: {
		screen: TimeLog2,
		navigationOptions: {
			headerStyle: globalStyles.headerWithoutShadow,
			headerTintColor: '#37a6ff',
			header: props => <CustomHeader {...props} />,
			tabBarVisible: false,
		},
	},
		Shedule: {
			screen: SheduleScreen,
			navigationOptions: {
				header: props => <CustomHeader {...props} />,
			},
		},

		Availabilityscreen: {
			screen: Availabilityscreen,
			navigationOptions: {
				headerStyle: globalStyles.headerWithoutShadow,
				headerTintColor: '#37a6ff',
				title: 'Availability Screen',
				tabBarVisible: false,
			},
		},
		Jobrequest: {
			screen: Jobrequest,
			navigationOptions: {
				headerStyle: globalStyles.headerWithoutShadow,
				headerTintColor: '#37a6ff',
				tabBarVisible: false,
			},
		},
		JobRequestDetail: {
			screen: JobRequestDetail,
			navigationOptions: {
				headerStyle: globalStyles.headerWithoutShadow,
				headerTintColor: '#37a6ff',
				tabBarVisible: false,
			},
		},
		WebViewPage: {
			screen: Webview,
			navigationOptions: {
				headerStyle: globalStyles.headerWithoutShadow,
				headerTintColor: '#37a6ff',
			},
		},	
		
	},
	{
		headerMode: 'screen',
		swipeEnabled: false,
	}
);

const InvoicesStackNavigator = StackNavigator({
	Invoices: {
		screen: InvoicesScreen,
		navigationOptions: {
			header: props => <CustomHeader {...props} />,
		},
	},
});
const TimelogsStackNavigator = StackNavigator({
	Invoices: {
		screen: TimeLog2,
		navigationOptions: {
			header: props => <CustomHeader {...props} />,
		},
	},
});
const ChatStackNavigator = StackNavigator({
	ChatList: {
		screen: ChatList,
		navigationOptions: {
			header: props => <CustomHeader {...props} />,
		},
	},
	ChatScreen: {
		screen: ChatScreen,
	},
});
const MyProfileStackNavigator = StackNavigator({
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
	EditStructuredProfile: {
		screen: EditStructuredProfile,
		navigationOptions: {
			headerStyle: globalStyles.headerWithoutShadow,
			headerTintColor: '#37a6ff',
			title: 'Edit Professional Details',
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

const MainTabNavigator = TabNavigator(
	{
		Home: {
			screen: SheduleStackNavigator,
			navigationOptions: {
				tabBarIcon: ({ tintColor }) => (
					<OCIcon
						containerStyle={{ justifyContent: 'center', alignItems: 'center' }}
						color={tintColor}
						name="home"
						size={25}
					/>
				),
			},
		},
		TimeLogs: {
			screen: TimelogsStackNavigator,
			navigationOptions: {
				// headerStyle: globalStyles.headerWithoutShadow,
				// headerTintColor: '#37a6ff',
				// header: props => <CustomHeader {...props} />,
				tabBarIcon: ({ tintColor }) => (
					<MIcon
						containerStyle={{ justifyContent: 'center', alignItems: 'center' }}
						color={tintColor}
						name="local-atm"
						size={28}
					/>
				),
			},
		},
		Messages: {
			screen: ChatStackNavigator,
			navigationOptions: {
				tabBarIcon: ({ tintColor }) => (
					<FIcon
						containerStyle={{ justifyContent: 'center', alignItems: 'center' }}
						color={tintColor}
						name="message-square"
						size={25}
					/>
				),
			},
		},
		MyProfile: {
			screen: MyProfileStackNavigator,
			navigationOptions: {
				tabBarIcon: ({ tintColor }) => (
					<SIcon
						containerStyle={{ justifyContent: 'center', alignItems: 'center' }}
						color={tintColor}
						name="user"
						size={21}
					/>
				),
			},
		},
	},
	{
		...TabNavigator.Presets.AndroidTopTabs,
		lazy: true,
		swipeEnabled: false,
		animationEnabled: true,
		tabBarPosition: 'bottom',
		tabBarOptions: {
			scrollEnabled: true,
			showLabel: true,
			activeTintColor: '#02B2FE',
			inactiveTintColor: colors.grey,
			style: {
				backgroundColor: '#FFFFFF',
				paddingVertical: verticalScale(3),
			},
		},
		tabBarComponent: ({ jumpToIndex, ...props }) => (
			<TabBarBottom
				{...props}
				jumpToIndex={index => {
					const { dispatch, state } = props.navigation;

					if (state.index === index && state.routes[index].routes.length > 1) {
						const stackRouteName = ['Shedule', 'Invoices', 'Chat', 'MyProfile'][index];

						dispatch(
							NavigationActions.reset({
								index: 0,
								actions: [NavigationActions.navigate({ routeName: stackRouteName })],
							})
						);
					} else {
						jumpToIndex(index);
					}
				}}
			/>
		),
	}
);

const DrawerPage = DrawerNavigator(
	{
		TabNavigator: { screen: MainTabNavigator },

		Notificationscreen: {
			screen: Notificationscreen,
		},
	},
	{
		// Register custom drawer component
		swipeEnabled: true,
		gesturesEnabled: true,
		contentComponent: props => <Drawer {...props} />,
	}
);
/*
export const Locumapp = StackNavigator(
  { 
    
    auth: {
    screen: AuthStackNavigator,
    navigationOptions: {
      header: null
    }
    },
      Main: {
        screen: MainTabNavigator,
        navigationOptions: {
          header: null
        }
      },   
    
  },
  {
    headerMode: "screen",  
    cardStyle: {
      backgroundColor: "transparent"
    }
  }
);
*/

export default (routes = {
	auth: {
		screen: AuthStackNavigator,
		navigationOptions: {
			header: null,
		},
	},
	SignupupFormfive: {
		screen: SignupupFormfive,
		navigationOptions: {
			headerStyle: globalStyles.headerWithoutShadow,
			headerTintColor: '#B2B2B2',
			title: 'Complete (80%)',
			tabBarVisible: false,
		},
	},
	SignupFormStrucProfile: {
		screen: SignupFormStrucProfile,
		navigationOptions: {
			headerStyle: globalStyles.headerWithoutShadow,
			headerTintColor: '#B2B2B2',
			title: 'Complete (60%)',
			tabBarVisible: false,
		},
	},
	Signuptwo: {
		screen: SignupFormtwo,
		navigationOptions: {
			headerStyle: globalStyles.headerWithoutShadow,
			headerTintColor: '#B2B2B2',
			title: 'Complete (20%)',
			tabBarVisible: false,
		},
	},
	Signupthree: {
		screen: SignupFormthree,
		navigationOptions: {
			headerStyle: globalStyles.headerWithoutShadow,
			headerTintColor: '#B2B2B2',
			title: 'Complete (40%)',
			tabBarVisible: false,
		},
	},
	Signupfour: {
		screen: SignupupFormfour,
		navigationOptions: {
			headerStyle: globalStyles.headerWithoutShadow,
			headerTintColor: '#B2B2B2',
			title: 'Complete (90%)',
			tabBarVisible: false,
		},
	},
	AddmoreQualification: {
		screen: AddmoreQualification,
		navigationOptions: {
			headerStyle: globalStyles.headerWithoutShadow,
			headerTintColor: '#B2B2B2',
			title: 'Add more',
			tabBarVisible: false,
		},
	},
	Main: {
		screen: DrawerPage,
		navigationOptions: {
			header: null,
		},
	},
	Addshedulescreen: {
		screen: Addshedulescreen,
		navigationOptions: {
			headerStyle: globalStyles.headerWithoutShadow,
			headerTintColor: '#37a6ff',
			title: 'Add Availabilty screen',
			tabBarVisible: false,
		},
	},
	Editshedulescreen: {
		screen: Editshedulescreen,
		navigationOptions: {
			headerStyle: globalStyles.headerWithoutShadow,
			headerTintColor: '#37a6ff',
			title: 'Edit Availabilty screen',
			tabBarVisible: false,
		},
	},
	EditMoreQualification: {
		screen: EditMoreQualification,
		navigationOptions: {
			headerStyle: globalStyles.headerWithoutShadow,
			headerTintColor: '#B2B2B2',
			title: 'Add more',
			tabBarVisible: false,
		},
	},
});
