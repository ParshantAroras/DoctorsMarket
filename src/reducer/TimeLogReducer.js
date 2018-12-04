import _ from 'underscore';
import {
	TIMELOG_REQUEST_CHECKING,
    TIMELOG_REQUEST_SUCCESS,
	RESET,
    TIMELOG_REQUEST_FAIL,
	EDIT_TIMELOG,
	ADD_TIMELOG
} from '../actions/TimeLogsActions';
import { REHYDRATE } from 'redux-persist/constants';
const INITIAL_STATE = {
	timeLogData: [],
	loader : false
};

export default (state = INITIAL_STATE, action) => {
    console.log('action.payload',action.payload);
	switch (action.type) {

		case REHYDRATE:
			return state;
		case TIMELOG_REQUEST_CHECKING:
			return { ...state, loader: true };
        case TIMELOG_REQUEST_SUCCESS:
			return {
				...state,
				loader: false,
				timeLogData : action.payload,
			};
		case TIMELOG_REQUEST_FAIL:
			return { ...state, loader: false };
		case ADD_TIMELOG :		
		let timeLogDataAdd = [...state.timeLogData];
		timeLogDataAdd.unshift(action.payload);
		return {
			...state,
			loader: false,
			timeLogData : timeLogDataAdd,
		};
		case EDIT_TIMELOG:
		let timeLogDataChange = [...state.timeLogData];
		let findIndex = _.findIndex(timeLogDataChange, { id: action.payload.timelog_id });
		console.log('findIndex',...state.timeLogData, action.payload , findIndex)
		if(findIndex != -1){
			 timeLogDataChange[findIndex].chargable_hours = action.payload.chargable_hours;
			 timeLogDataChange[findIndex].chargable_minutes = action.payload.chargable_minutes;
			 timeLogDataChange[findIndex].end_time = action.payload.end_time;
			 timeLogDataChange[findIndex].start_time = action.payload.start_time;
			 timeLogDataChange[findIndex].work_notes = action.payload.work_notes;
			return { ...state, timeLogData: timeLogDataChange , loader: false};
		}
		return {...state}	   
		case RESET:
			return INITIAL_STATE;
		default:
			return state;
	}
};