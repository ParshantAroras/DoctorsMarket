export const SIGNUP_UPDATE = 'SIGNUP_UPDATE';
export const LOCATION_DETAIL = 'LOCATION_DETAIL';
export const SIGNUP_CHECK = 'SIGNUP_CHECK';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAIL = 'SIGNUP_FAIL';
export const RESET = 'RESET';
import RestClient from '../utils/restclient';
import { LOGIN_CHECKING, LOGIN_SUCCESS, LOGIN_FAIL } from '../actions/Loginactions';
import { DeviceEventEmitter } from 'react-native';
import { toast } from '../components/toast';
import { resetNavigationTo } from '../utils';
export const SignupUpdate = ({ prop, value }) => {
	return {
		type: SIGNUP_UPDATE,
		payload: { prop, value },
	};
};

export const LocationUpdate = data => {
	return {
		type: LOCATION_DETAIL,
		payload: data[0],
	};
};

export const intialState = () => {
	return {
		type: RESET,
	};
};

export const registraion = ({ body, navigation }) => dispatch => {
	console.log(body);
	dispatch({ type: SIGNUP_CHECK });
	//console.log(body, "form reigistarion");
	RestClient.post('/apis/register', {}, body)
		.then(response => {
			console.log(response, 'signup resposne');
			if (response.status === 200) {
				dispatch({ type: SIGNUP_SUCCESS });
				resetNavigationTo('auth', navigation);
				toast({ text: response.message });
			} else {
				dispatch({ type: SIGNUP_FAIL });

				toast({ text: response.message });
			}
		})
		.catch(eror => {
			console.log(eror);
			// alert(eror);
		});
};
