/*
FileName : JobRequest.js
Description :  Containe the job request actions 

*/
export const JOB_REQUEST_CHECKING = 'JOB_REQUEST_CHECKING';
export const JOB_REQUEST_SUCCESS = 'JOB_REQUEST_SUCCESS';
export const JOB_REQUEST_FAIL = 'JOB_REQUEST_FAIL';
export const JOB_REQUEST_STATUS_CHANGE = 'JOB_REQUEST_STATUS_CHANGE';
import RestClient from '../utils/restclient';
import { toast } from '../components/toast';
/*
Get the all jobs from hospitals
*/
export const JobRequest = ({ body }) => dispatch => {
	console.log(body);
	dispatch({ type: JOB_REQUEST_CHECKING });

	RestClient.post('/apis/getJobListing', {}, body).then(response => {
		console.log(response, 'login resposne');
		if (response.status === 200) {
			dispatch({ type: JOB_REQUEST_SUCCESS, payload: response.data });
        }
        else {
			dispatch({ type: JOB_REQUEST_FAIL });
			toast({ text: response.message, type: 'danger' });
		}
	});
};  

/*
Accept the invite from hospital
*/
export const acceptInvite = (body , callBack) => dispatch => {
	console.log("body3",body)
	dispatch({ type: JOB_REQUEST_CHECKING });
	RestClient.post('/apis/accept_invite', {}, body).then(response => {
		console.log(response, 'login resposne');
		if (response.status === 200) {
			console.log("invidteAccepted",response)
			dispatch({ type: JOB_REQUEST_STATUS_CHANGE, payload: {id :body.job_id,invite_status: 'interested'} });
			toast({ text: 'Job is Accepted Successfully ', type: 'danger' });
			callBack();
		}
        else {
			dispatch({ type: JOB_REQUEST_FAIL });
			toast({ text: response.message, type: 'danger' });
		}
	});
}; 

/*
Accept the invite from hospital
*/
export const rejectInvite = ( body,callBack) => dispatch => {
	console.log("body3",body)
	dispatch({ type: JOB_REQUEST_CHECKING });
	RestClient.post('/apis/reject_invite', {}, body).then(response => {
		console.log(response, 'login resposne');
		if (response.status === 200) {
			console.log("inviteRejected",response)
			dispatch({ type: JOB_REQUEST_STATUS_CHANGE, payload: {id :body.job_id,invite_status: 'rejected'} });
			toast({ text: 'Job is Declined Successfully ', type: 'danger' });
			callBack();
		}
        else {
			dispatch({ type: JOB_REQUEST_FAIL });
			toast({ text: response.message, type: 'danger' });
		}
	});
}; 


/*
Get the all jobs from hospitals
*/
export const JobRequestDetail = ({ body },callBack) => dispatch => {
	console.log(body);
	dispatch({ type: JOB_REQUEST_CHECKING });
	RestClient.post('/apis/viewJob', {}, body).then(response => {
		console.log(response, 'login resposne');
		if (response.status === 200) {
			dispatch({ type: JOB_REQUEST_FAIL });
			callBack(response.data);
        }
        else {
			dispatch({ type: JOB_REQUEST_FAIL });
			toast({ text: response.message, type: 'danger' });
		}
	});
};  








