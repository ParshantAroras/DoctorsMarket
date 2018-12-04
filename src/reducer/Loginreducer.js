import {
	LOGIN_UPDATE,
	LOGIN_CHECKING,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	RESET,
	PROFILE_UPDATE,
	PROFESSIONAL_UPDATE,
	PROFILE_DETAIL_UPDATE,
	CONTACT_DETAIL_UPDATE,
	TABUPDATE
} from '../actions/Loginactions';
import { REHYDRATE } from 'redux-persist/constants';
const INITIAL_STATE = {
	email: '',
	password: '',
	loader: false,
	userdata: {},
	userid: '',
	token: '',
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case REHYDRATE:
			return state;
		case LOGIN_UPDATE:
			return { ...state, [action.payload.prop]: action.payload.value };
		case LOGIN_CHECKING:
			return { ...state, loader: true };
		case LOGIN_SUCCESS:
			console.log('action.payloaddddddd',action.payload);
			const { id, api_token } = action.payload;
			return {
				...state,
				loader: false,
				userdata: action.payload,
				userid: id,
				token: api_token,
			};
		case TABUPDATE:
		console.log({...state,userdata:{...state.userdata,doctor: {...state.userdata.doctor  ,profile_tab:action.payload.value}}}	, 'Tabbbbbbbb');
		 return {...state,userdata:{...state.userdata,doctor: {...state.userdata.doctor  ,profile_tab:action.payload.value}}}	
		case PROFILE_UPDATE:
			console.log(action.payload, 'here');
			return {
				...state,
				userdata: { ...state.userdata, profile_pic: action.payload },
			};
		case LOGIN_FAIL:
			return { ...state, loader: false };
		case PROFESSIONAL_UPDATE:
			const { status, doc1, doc2, gmc_number, locum_specialties_id } = action.payload;
			return { ...state, userdata: { ...state.userdata, status, doc1, doc2, gmc_number, locum_specialties_id } };
		case PROFILE_DETAIL_UPDATE:
			const { fname, lname, email, phone_number } = action.payload;
			return { ...state, userdata: { ...state.userdata, fname, lname, email, phone_number } };
		case CONTACT_DETAIL_UPDATE:
			//const { country, county, home_tel_no, nationalities_id, postcode, street, town } = action.payload;
			return {
				...state,
				userdata: { ...state.userdata, ...action.payload },
			};
		case RESET:
			return INITIAL_STATE;
		default:
			return state;
	}
};
