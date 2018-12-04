import {
	SIGNUP_UPDATE,
	LOCATION_DETAIL,
	RESET,
	SIGNUP_CHECK,
	SIGNUP_SUCCESS,
	SIGNUP_FAIL,
} from '../actions/Signupactions';
import {
	LOGIN_UPDATE,
	LOGIN_CHECKING,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	PROFILE_UPDATE,
	PROFESSIONAL_UPDATE,
	PROFILE_DETAIL_UPDATE,
	CONTACT_DETAIL_UPDATE,
} from '../actions/Loginactions';
const INITIAL_STATE = {
	Forename: '',
	title: '',
	Surname: '',
	email: '',
	phonenumber: '',
	gmcverified: false,
	grade: {},
	gender: '',
	password: '',
	country: {},
	nationality: {},
	dob: '',
	postalcode: '',
	streetname: '',
	street_number: '',
	state: '',
	city: '',
	position: {},
	telephone: '',
	specialist: [],
	havegmcnumber: false,
	righttoworkUK: true,
	profregno: '',
	countrytowork: [],
	gmcnumber: '',
	doc1: '',
	doc2: '',
	device_token: '',
	loader: false,
	title: {},
	profdoc: {},
	qualification: {},
	qualicompletedyear: '',
	qualidocs: [],
	currentcompanydoc: {},
	currentcompanyname: '',
	currentcompanycontact: '',
	lastemployername: '',
	lastemployercontact: '',
	lastemployerdetails: {},
	lastappraisal: '',
	last_appraisal_evidence: {},
	eppdoc: {},
	qualification_doc: {},
	traningdocs: [],
	dbscheckdetail: null,
	referees1: false,
	referees2: false,
	referees3: false,
	question1: null,
	question2: null,
	question3: null,
	question4: null,
	question5: null,
	salary: '',
	is_negotiable: null,
	isCurrentWorking: true,
	email1: '',
	designation1: '',
	address1: '',
	name1 : '',
	contact1 : '',
	email2: '',
	designation2: '',
	address2: '',
	name2 : '',
	contact2 : '',
	email3: '',
	designation3: '',
	address3: '',
	name3 : '',
	contact3 : '',
};
import doctorgrade from '../utils/doctorgrade';
import titlearray from '../utils/titles';
export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SIGNUP_UPDATE:
			return { ...state, [action.payload.prop]: action.payload.value };
		case LOCATION_DETAIL:
			console.log(action.payload);
			// debugger;
			return {
				...state,
				country: action.payload.country != null ? action.payload.country : '',
				postalcode: action.payload.postalCode != null ? action.payload.postalCode : '',
				state: action.payload.adminArea != null ? action.payload.adminArea : '',
				streetname: action.payload.streetName != null ? action.payload.streetName : '',
				position: action.payload.position != null ? action.payload.position : {},
				city: action.payload.subAdminArea != null ? action.payload.subAdminArea : '',
			};
		case LOGIN_SUCCESS:
			console.log(action.payload, 'from signup reducer-------->');
			const { title_id, email, first_name, last_name, phone } = action.payload;
			var title = titlearray.find(function(obj) {
				return obj.id === JSON.stringify(title_id);
			});

			return { ...state, title, email, Forename: first_name, Surname: last_name, phonenumber: phone, };
		case SIGNUP_CHECK:
			return { ...state, loader: true };
		case SIGNUP_SUCCESS:
			return { ...INITIAL_STATE, loader: false };
		case SIGNUP_FAIL:
			return { ...state, loader: false };
		case RESET:
			return INITIAL_STATE;
		default:
			return state;
	}
};
