import { combineReducers } from 'redux';
import testreducer from '../reducer/testreducer';
import SignupReducer from '../reducer/Signupreducer';
import Loginreducer from '../reducer/Loginreducer';
import Notireducer from '../reducer/Notireducer';
import Shedulereducer from '../reducer/Shedulereducer';
import JobRequestReducer from '../reducer/JobRequestReducer';
import TimeLogReducer from '../reducer/TimeLogReducer';


const reducers = combineReducers({
	testreducer: testreducer,
	SignupReducer: SignupReducer,
	Loginreducer: Loginreducer,
	Notireducer: Notireducer,
	Shedulereducer: Shedulereducer,
	JobRequestReducer,
	TimeLogReducer

});
export default reducers;
