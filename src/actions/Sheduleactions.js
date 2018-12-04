export const SHEDULE_CHECKING = 'SHEDULE_CHECKING';
export const SHEDULE_FETHCED = 'SHEDULE_FETHCED';
export const SHEDULE_FAILED = 'SHEDULE_FAILED';
export const SHEDULE_DELETED_COMPLETELY = 'SHEDULE_DELETED_COMPLETELY';
import RestClient from '../utils/restclient';
import { DeviceEventEmitter } from 'react-native';
import { resetNavigationTo } from '../utils';
import { toast } from '../components/toast';
import { RESET } from './Loginactions';
export const shedulefetching = ({ body, navigation }) => dispatch => {
	console.log(body, 'jnkjkl');

	dispatch({ type: SHEDULE_CHECKING });
	RestClient.post('/apis/viewAvailability', {}, body).then(response => {
		console.log(response, 'availabilty resposne');
		if (response.status === 200) {
			dispatch({ type: SHEDULE_FETHCED, payload: response });
		} else if (response.status === 400) {
			dispatch({ type: SHEDULE_FAILED });
			toast({ text: response.message });
		} else if (response.status === 404) {
			dispatch({ type: SHEDULE_FAILED });
			toast({ text: response.message });
		} else if (response.status === 401) {
			//alert('lpp');
			dispatch({ type: RESET });
			resetNavigationTo('auth', navigation);
		}
	});
};

export const deleteshedule = ({ user_id, api_token, id, navigation }) => dispatch => {
	console.log(user_id, api_token, id, navigation);
	dispatch({ type: SHEDULE_CHECKING });
	RestClient.post('/apis/deleteAvailability', {}, { user_id, api_token, id }).then(response => {
		console.log(response, 'response');
		if (response.status === 200) {
			dispatch({ type: SHEDULE_FETHCED, payload: response });
		} else if (response.status === 400) {
			dispatch({ type: SHEDULE_DELETED_COMPLETELY });
			toast({ text: response.message });
		} else if (response.status === 404) {
			dispatch({ type: SHEDULE_FAILED });
			toast({ text: response.message });
		} else if (response.status === 401) {
			dispatch({ type: RESET });
			resetNavigationTo('auth', navigation);
			toast({ text: response.message });
		}
	});
};
