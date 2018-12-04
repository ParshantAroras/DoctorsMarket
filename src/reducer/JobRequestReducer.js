import _ from 'underscore';
import {
	JOB_REQUEST_CHECKING,
    JOB_REQUEST_SUCCESS,
    JOB_REQUEST_FAIL,
	RESET,
	JOB_REQUEST_STATUS_CHANGE
} from '../actions/JobRequestActions';
import { REHYDRATE } from 'redux-persist/constants';
const INITIAL_STATE = {
	jobRequestData: [],
	loader : false
};

export default (state = INITIAL_STATE, action) => {
    console.log('action.payload',action.payload);
	switch (action.type) {

		case REHYDRATE:
			return state;
		case JOB_REQUEST_CHECKING:
			return { ...state, loader: true };
        case JOB_REQUEST_SUCCESS:
			return {
				...state,
				loader: false,
				jobRequestData : action.payload,
			};
		case JOB_REQUEST_FAIL:
			return { ...state, loader: false };
		case JOB_REQUEST_STATUS_CHANGE:
		let jobRequestChange = [...state.jobRequestData];
		let findIndex = _.findIndex(jobRequestChange, { emergency_job_id: action.payload.id });
		console.log('findIndex',findIndex)
		if(findIndex != -1){
			jobRequestChange[findIndex].invite_status = action.payload.invite_status;
			return { ...state, jobRequestData: jobRequestChange , loader: false};
		}
		return {...state}	   
		case RESET:
			return INITIAL_STATE;
		default:
			return state;
	}
};
