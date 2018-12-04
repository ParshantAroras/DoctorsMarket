import { NOTIFICATION_RECIEVED, NOTIFICATION_CLEARED,DEVICE_TOKEN } from '../actions/Notifcationactions';
const INITIAL_STATE = {
	notifications: [],
	noticlear: false,
	deviceToken: '',
};
export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case NOTIFICATION_RECIEVED:
			console.log(action.payload);
			return { ...state, noticlear: true };
		case NOTIFICATION_CLEARED:
			return { ...state, noticlear: false };
		case DEVICE_TOKEN:
		    return {...state, deviceToken : action.deviceToken}	
		default:
			return state;
	}
};
