export const LOGIN_UPDATE = 'LOGIN_UPDATE';
export const LOGIN_CHECKING = 'LOGIN_CHECKING';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const RESET = 'RESET';
export const PROFILE_UPDATE = 'PROFILE_UPDATE';
export const PROFILE_DETAIL_UPDATE = 'PROFILE_DETAIL_UPDATE';
export const PROFESSIONAL_UPDATE = 'PROFESSIONAL_UPDATE';
export const CONTACT_DETAIL_UPDATE = 'CONTACT_DETAIL_UPDATE';
export const TABUPDATE = 'TABUPDATE';
import RestClient from '../utils/restclient';
import { DeviceEventEmitter } from 'react-native';
import { resetNavigationTo } from '../utils';
import { toast } from '../components/toast';
export const LoginUpdate = ({ prop, value }) => {
	return {
		type: LOGIN_UPDATE,
		payload: { prop, value },
	};
};
export const tabUpdate = ({ value }) => {
	console.log("value", value)
	return {
		type: TABUPDATE,
		payload: { value },
	};
};


export const reset = () => {
	return {
		type: RESET,
	};
};

export const LoginChecking = ({ body, navigate }) => dispatch => {
	console.log(body);
	dispatch({ type: LOGIN_CHECKING });

	RestClient.post('/apis/login', {}, body).then(response => {
		console.log(response, 'login resposne');
		if (response.status === 200) {
			console.log("response.data.user", response.data.user)
			dispatch({ type: LOGIN_SUCCESS, payload: response.data.user });
			let userdata = response.data.user;

			if (userdata.doctor.profile_tab === 5 || userdata.doctor.profile_tab === 6 || userdata.doctor.profile_tab === '5' || userdata.doctor.profile_tab === '6' || Number(userdata.doctor.complete_profile)) {
				navigate('Main')
			}
			else if (userdata.doctor.profile_tab === '1' || userdata.doctor.profile_tab === 1 || userdata.doctor.profile_tab === 0 || userdata.doctor.profile_tab === '0') { navigate('Signuptwo'); }
			else if (userdata.doctor.profile_tab === 2 || userdata.doctor.profile_tab === '2') {
				navigate('Signupthree');
			}
			else if (userdata.doctor.profile_tab === 3 || userdata.doctor.profile_tab === '3') {
				navigate('SignupFormStrucProfile');
			}
			else if (userdata.doctor.profile_tab === 4 || userdata.doctor.profile_tab === '4') {
				navigate('SignupupFormfive');
			}

		} else {
			dispatch({ type: LOGIN_FAIL });
			toast({ text: response.message, type: 'danger' });
			//DeviceEventEmitter.emit("showToast", response.message);
		}
	});
};

export const Logotapi = ({ id, token, navigation }) => dispatch => {
	console.log(id, token, 'id,token');
	resetNavigationTo('auth', navigation);
	dispatch({ type: RESET });
	RestClient.post('/apis/logout', {}, { id, api_token: token }).then(response => {
		console.log(response, 'response');
		if (response.message) {
			//  DeviceEventEmitter.emit("showToast", response.message);
			toast({ text: response.message });
		}
	});
};

export const ViewMyProfile = ({ user_id, api_token }, cb) => dispatch => {

	RestClient.post('/apis/myProfile', {}, { user_id: user_id, api_token: api_token }).then(response => {
		console.log(response, 'response');
		if (response.status == 200) {
			cb(response.data);
		}
		else {
			toast({ text: response.message });
		}
	});
};

export const profileimageupdate = data => {
	console.log(data);
	return {
		type: PROFILE_UPDATE,
		payload: data,
	};
};

export const professionalupdate = data => {
	console.log(data);
	return {
		type: PROFESSIONAL_UPDATE,
		payload: data,
	};
};

export const profiledetailupdate = data => {
	return {
		type: PROFILE_DETAIL_UPDATE,
		payload: data,
	};
};

export const contactdetailupdate = data => {
	return {
		type: CONTACT_DETAIL_UPDATE,
		payload: data,
	};
};
