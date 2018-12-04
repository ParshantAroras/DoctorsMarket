import { Platform } from 'react-native';
export const fonts = {
	fontPrimaryLight: Platform.OS === 'ios' ? 'SFUIDisplay-Light' : 'sf_ui_display_light',
	fontPrimaryBlack: Platform.OS === 'ios' ? 'SFUIDisplay-Black' : 'Ssf_ui_display_black',
	fontPrimaryItalic: Platform.OS === 'ios' ? 'SFUIDisplay-Medium' : 'sf_ui_display_medium',
	fontPrimaryBold: Platform.OS === 'ios' ? 'SFUIDisplay-Bold' : 'sf_ui_display_bold',
	fontPrimaryRegular: Platform.OS === 'ios' ? 'SFUIDisplay-Regular' : 'sf_ui_display_regular',
};
