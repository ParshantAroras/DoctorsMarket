import RestClient from '../utils/restclient';
import { toast } from '../components/toast';
import { resetNavigationTo } from '../utils';



export const RESET = 'RESET';
export const TIMELOG_REQUEST_FAIL = 'TIMELOG_REQUEST_FAIL';
export const TIMELOG_REQUEST_SUCCESS = 'TIMELOG_REQUEST_SUCCESS';
export const TIMELOG_REQUEST_CHECKING = 'TIMELOG_REQUEST_CHECKING';
export const ADD_TIMELOG = 'ADD_TIMELOG';


export const EDIT_TIMELOG = 'EDIT_TIMELOG';
/*
Add Time Log Hours
*/
export const addTimeLogHours = (body , callBack) => dispatch => {
	console.log("body3",body)
    dispatch({ type: TIMELOG_REQUEST_CHECKING });
    
	RestClient.post('/apis/add_entry', {}, body).then(response => {
		// console.log(response, 'login resposne');
		if (response.status === 200) {
			console.log("invidteAccepted123",response)
			 dispatch({ type: ADD_TIMELOG, payload: response.data[0] });
			callBack();
			toast({ text: 'TimeLog successfully Added', type: 'danger' });
		}
        else {
			// dispatch({ type: JOB_REQUEST_FAIL });
			toast({ text: response.message, type: 'danger' });
		}
	});
}; 

/*
Add Time Log Hours
*/
export const editTimeLogHours = (body , callBack) => dispatch => {
	console.log("body3",body)
    dispatch({ type: TIMELOG_REQUEST_CHECKING });
	RestClient.post('/apis/edit_entry', {}, body).then(response => {
		// console.log(response, 'login resposne');
		if (response.status === 200) {
			console.log("invidteAccepted",response)
			 dispatch({ type: EDIT_TIMELOG, payload: body });
			callBack();
			toast({ text: 'TimeLog successfully Updated', type: 'danger' });
		}
        else {
			// dispatch({ type: JOB_REQUEST_FAIL });
			toast({ text: response.message, type: 'danger' });
		}
	});
}; 

/*
View All Time Logs
*/
export const viewAllTieLogs = ({body},navigation) => dispatch => {
	console.log("body3",body)
     dispatch({ type: TIMELOG_REQUEST_CHECKING });
    
	RestClient.post('/apis/timelogListing', {}, body).then(response => {
		 console.log(response, 'login resposne');
		if (response.status === 200) {
			console.log("invidteAccepted",response)
			 dispatch({ type: TIMELOG_REQUEST_SUCCESS, payload: response.data });
		}
        else {
			if (response.status === 410) {
				resetNavigationTo('auth', navigation);
				dispatch({ type: RESET });
			}
			dispatch({ type: TIMELOG_REQUEST_FAIL });
			toast({ text: response.message, type: 'danger' });
		}
	});
}; 

/*
View All Time Logs
*/
export const viewAllNextSchedules = ({body},navigation , callBack ) => dispatch => {
	console.log("body3",body)
    // dispatch({ type: JOB_REQUEST_CHECKING });
	RestClient.post('/apis/getNextShift', {}, body).then(response => {
		 console.log(response, 'login resposne');
		if (response.status === 200) {
			console.log("viewAllNextSchedules",response)
			// dispatch({ type: JOB_REQUEST_STATUS_CHANGE, payload: {id :body.job_id,invite_status: 'interested'} });
			callBack(response.data);
		}
        else {
			if (response.status === 410) {
				resetNavigationTo('auth', navigation);
				dispatch({ type: RESET });
			}
			// dispatch({ type: JOB_REQUEST_FAIL });
			toast({ text: response.message, type: 'danger' });
		}
	});
}; 

