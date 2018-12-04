import {
	SHEDULE_CHECKING,
	SHEDULE_FETHCED,
	SHEDULE_FAILED,
	SHEDULE_DELETED_COMPLETELY,
} from '../actions/Sheduleactions';
const INITIAL_STATE = {
	sheduledata: [],
	loader: false,
	request: {},
};
export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SHEDULE_CHECKING:
			return { ...state, loader: true };
		case SHEDULE_FAILED:
			return { ...state, loader: false };
		case SHEDULE_DELETED_COMPLETELY:
			return { ...state, loader: false, sheduledata: [] };
		case SHEDULE_FETHCED:
			return { ...state, loader: false, sheduledata: action.payload.data, request: action.payload.request };
		default:
			return state;
	}
};
