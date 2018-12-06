import React, { Component } from 'react';
import { View, Text, Dimensions, ScrollView, TouchableOpacity, DeviceEventEmitter, Platform,ActivityIndicator,Modal } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import StepIndicatorView from '../../components/stpeindicatorview';
import { colors, normalize, scale, verticalScale, moderateScale, fonts } from '../../config';
import ButtonwithIcon from '../../components/ButtonwithIcon';
//import CheckBox from "../../components/checkbox";
import Genderfield from '../../components/genderfield';
import GenderfieldLong from '../../components/genderfieldLong';
import NextButton from '../../components/nextbutton';
//import Icon from 'react-native-vector-icons/FontAwesome';
const { height, width } = Dimensions.get('window');
import CheckBox from 'react-native-modest-checkbox';
import { connect } from 'react-redux';
import { registraion } from '../../actions/Signupactions';
import Spinner from '../../components/spinner';
import { toast } from '../../components/toast';
import title from '../../utils/titles';
import { Dropdown } from 'react-native-material-dropdown';
import { TextField } from 'react-native-material-textfield';
import Tickcomponet from '../../components/tickcomponent';
import DatePickerComponent from '../../components/datepicker';
import Accordion from '../../components/accordian';
import DocumentUploader from '../../components/documentuploader';
import { SignupUpdate } from '../../actions/Signupactions';
import Regex from '../../utils/regex';
import RestClient from '../../utils/restclient';
import { tabUpdate } from '../../actions/Loginactions';
import { Toast } from 'native-base';
import { reset } from '../../actions/Loginactions';
import { resetNavigationTo } from '../../utils';
import trainingcourses from '../../utils/trainingcourses';
import Icon from 'react-native-vector-icons/FontAwesome';

let tranings = [
	'Fire Safety',
	'Equality, Diversity and Human Rights',
	'Health, Safety and Welfare',
	'Resuscitation',
	'Infection Prevention and Control',
	'Conflict Resolution',
	'Moving and Handling',
	'Preventing Radicalisation',
	'Data Security Awareness',
	'Safeguarding Adults',
	'Safeguarding Children',
];

const qualificationlist = [
	{
		id: '1',
		value: 'MBBS',
	},
	{
		id: '2',
		value: 'Other',
	},
];

class SignupupFormStrucProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isChecked: false,
			visible: false,
			titleerror: '',
			YearCompleted: '',
			YearCompleted2: '',
			companyName: '',
			telephoneNumber: '',
			telephoneNumber2: '',
			lastAppraisal: '',
			immunisationStatus: '',
			immunisationStatus2: '',
			qualificationerror: '',
			currentcompanycontacterror: '',
			currentcompanynameerror: '',
			lastemployernameerror: '',
			lastemployercontacterror: '',
			lastemployerdetailsError : '',
			dbserror: '',
			question1error: '',
			question2error: '',
			isItNegotiableError : '',
			qualidocserror: '',
			salaryerror: '',
			eppdocError: '',
			traningdocsError : '',
			refereeserror: '',
	   		name1error : '',
			contact1error : '',
			email1error : '',
			designation1error : '',
			address1error : '',
			name2error : '',
			email2error : '',
			designation2error : '',
			address2error : '',
			name3error : '',
			contact3error : '',
			email3error : '',
			designation3error : '',
 			address3error : ''
		};
	}

	handlePressCheckedBox = checked => {
		this.setState({
			isChecked: checked,
		});
	};

	nextButton = () => {
		let context = this;
		this.setState({
			qualificationerror: '',
			qualicompletedyearerror: '',
			dbserror: '',
			qualificationerror: '',
			currentcompanycontacterror: '',
			currentcompanynameerror: '',
			uploadEvidanceError : '',
			lastemployernameerror: '',
			lastemployercontacterror: '',
			lastemployerdetailsError : '',
			dbserror: '',
			question1error: '',
			question2error: '',
			qualidocserror: '',
			salaryerror: '',
			lastappraisalerror: '',
			isItNegotiableError : '',
			eppdocError: '',
			traningdocsError :'',
			lastappraisaldocerror: '',
			refereeserror: '',
			name1error : '',
			contact1error : '',
			email1error : '',
			designation1error : '',
			address1error : '',
			name2error : '',
			email2error : '',
			contact2error : '',
			designation2error : '',
			address2error : '',
			name3error : '',
			contact3error : '',
			email3error : '',
			designation3error : '',
 			address3error : ''
		});
		const {
			SignupReducer,
			navigation,
			qualification,
			qualicompletedyear,
			currentcompanydoc,
			currentcompanyname,
			currentcompanycontact,
			dbscheckdetail,
			question1,
			question2,
			qualidocs,
			eppdoc,
			qualification_doc,
			lastemployername,
			lastemployercontact,
			lastemployerdetails,
			lastappraisal,
			navigation: { navigate },
			salary,
			is_negotiable,
			last_appraisal_evidence,
			traningdocs,
			referees1,
			referees2,
			referees3,
			name1,
			contact1,
			email1,
			designation1,
			address1,
			name2,
			contact2,
			email2,
			designation2,
			address2,
			name3,
			contact3,
			email3,
			designation3,
            address3
		} = this.props;

		console.log("this.props",this.props);
		/*	//debugger;
		let formdata = new FormData();

		formdata.append('fname', SignupReducer.Forename);
		formdata.append('lname', SignupReducer.Surname);
		formdata.append('email', SignupReducer.email);
		formdata.append('password', SignupReducer.password);
		formdata.append('phone_number', SignupReducer.phonenumber);
		formdata.append('genders_id', SignupReducer.gender == 'male' ? '1' : '2');
		formdata.append('nationalities_id', SignupReducer.nationality.id);
		formdata.append('street', SignupReducer.streetname);
		formdata.append('town', SignupReducer.city);

		formdata.append('county', SignupReducer.state);
		formdata.append('country', SignupReducer.country);
		formdata.append('postcode', SignupReducer.postalcode);
		formdata.append('home_tel_no', SignupReducer.telephone);
		formdata.append('locum_specialties_id', SignupReducer.specialist.id);
		formdata.append('status', SignupReducer.crbverified == true ? '1' : '0');

		formdata.append('acnt_status', '0');
		formdata.append('gmc_number', SignupReducer.gmcnumber);
		formdata.append('latitude', SignupReducer.position.lat ? SignupReducer.position.lat : '');
		formdata.append('longitude', SignupReducer.position.lng ? SignupReducer.position.lng : '');
		formdata.append('longitude', SignupReducer.position.lng ? SignupReducer.position.lng : '');
		formdata.append('avail_types_id', '');
		formdata.append('device_token', SignupReducer.device_token ? SignupReducer.device_token : '');
		formdata.append('device_type', Platform.OS == 'ios' ? '1' : '0');
		if (SignupReducer.doc1) {
			formdata.append('doc1', {
				...SignupReducer.doc1,
				name: SignupReducer.doc1.fileName
					? SignupReducer.doc1.fileName
					: SignupReducer.doc1.uri
							.split('/')
							.pop()
							.split('#')[0]
							.split('?')[0],
			});
		}
		if (SignupReducer.doc2) {
			formdata.append('doc2', {
				...SignupReducer.doc2,
				name: SignupReducer.doc2.fileName
					? SignupReducer.doc2.fileName
					: SignupReducer.doc2.uri
							.split('/')
							.pop()
							.split('#')[0]
							.split('?')[0],
			});
		}
		console.log(JSON.stringify(formdata));
		this.props.registraion({ formdata, navigation });
		*/
		//console.log(qualification, 'qualit');
		//	console.log(referees, 'reefsfs');
		//	debugger;
		/**/
		if (!qualification.id) {
			this.setState({ qualificationerror: 'Please select your qualification' });
			Toast.show({
				text: 'Please select your qualification',
				buttonText: 'Okay',
				type: 'danger',
			});
			return;
		}
		if (!qualicompletedyear) {
			this.setState({ qualicompletedyearerror: 'Please fill your completed year' });

			Toast.show({
				text: 'Please fill your completed year',
				buttonText: 'Okay',
				type: 'danger',
			});
			return;
		}
		if (!qualification_doc.hasOwnProperty('uri')) {
			this.setState({ qualidocserror: 'Please attach one document' });
			Toast.show({
				text: 'Please attach one document',
				buttonText: 'Okay',
				type: 'danger',
			});
			return;
		}
		console.log("currentcompanyname",currentcompanyname,currentcompanyname.length > 0 ,!Regex.validateString(currentcompanyname))
	if(this.props.isCurrentWorking){
		if (currentcompanyname.length == 0) {
			this.setState({ currentcompanynameerror: 'Please enter hospital name' });
			Toast.show({
				text: 'Please enter hospital name',
				buttonText: 'Okay',
				type: 'danger',
			});
			return;
		}
		if (currentcompanyname.length > 0 && !Regex.validateString(currentcompanyname)) {
			this.setState({ currentcompanynameerror: 'Please enter a valid hospital name' });
			Toast.show({
				text: 'Please enter a valid hospital name',
				buttonText: 'Okay',
				type: 'danger',
			});
			return;
		}
		if (currentcompanycontact.length == 0) {
			this.setState({ currentcompanycontacterror: 'Please enter contact number' });
			Toast.show({
				text: 'Please enter contact number',
				buttonText: 'Okay',
				type: 'danger',
			});
			return;
		}
		if (!Regex.validateMobileWithEleventDigit(currentcompanycontact)) {
			this.setState({ currentcompanycontacterror: 'Please enter a valid contact number' });
			Toast.show({
				text: 'Please enter a valid contact number',
				buttonText: 'Okay',
				type: 'danger',
			});
			return;
		}

		if (!currentcompanydoc.hasOwnProperty('uri')) {
			this.setState({ uploadEvidanceError: 'Please attach one document' });
			Toast.show({
				text: 'Please attach one document',
				buttonText: 'Okay',
				type: 'danger',
			});
			return;
		}
	}	
	else{	
		if (lastemployername.length == 0) {
			this.setState({lastemployernameerror: 'Please enter Employer Name' });
			Toast.show({
				text: 'Please enter Employer Name',
				buttonText: 'Okay',
				type: 'danger',
			});
			return;
		}

		if (lastemployername.length > 0 && !Regex.validateString(lastemployername)) {
			this.setState({ lastemployernameerror: 'Please enter a valid Employer Name' });
			Toast.show({
				text: 'Please enter a valid Employer Name',
				buttonText: 'Okay',
				type: 'danger',
			});
			return;
		}
		
		if (lastemployercontact.length == 0) {
			this.setState({ lastemployercontacterror: 'Please enter contact number' });
			Toast.show({
				text: 'Please enter contact number',
				buttonText: 'Okay',
				type: 'danger',
			});
			return;
		}
		if (!Regex.validateMobileWithEleventDigit(lastemployercontact)) {
			this.setState({ lastemployercontacterror: 'Please enter a valid contact number' });
			Toast.show({
				text: 'Please enter a valid contact number',
				buttonText: 'Okay',
				type: 'danger',
			});
			return;
		}
 
		if (!lastemployerdetails.hasOwnProperty('uri')) {
			this.setState({ lastemployerdetailsError: 'Please attach one document' });
			Toast.show({
				text: 'Please attach one document',
				buttonText: 'Okay',
				type: 'danger',
			});
			return;
		}
	}
		
		if (!lastappraisal) {
			this.setState({ lastappraisalerror: 'Please select your Last Appraisel' });

			Toast.show({
				text: 'Please select your Last Appraisel',
				buttonText: 'Okay',
				type: 'danger',
			});
			return;
		}
		
 console.log('last_appraisal_evidence',last_appraisal_evidence)
		if (!last_appraisal_evidence.hasOwnProperty('uri')) {
			this.setState({ lastappraisaldocerror: 'Please attach one document' });
			Toast.show({
				text: 'Please attach one document',
				buttonText: 'Okay',
				type: 'danger',
			});
			return;
		}
		
		if (!eppdoc.hasOwnProperty('uri')) {
			this.setState({ eppdocError: 'Please attach one document' });
			Toast.show({
				text: 'Please attach one document',
				buttonText: 'Okay',
				type: 'danger',
			});
			return;
		}
		if (traningdocs.length == 0) {
			this.setState({ traningdocsError: 'Please attach one document' });
			Toast.show({
				text: 'Please attach one document',
				buttonText: 'Okay',
				type: 'danger',
			});
			return;
		}

		if (dbscheckdetail === null) {
			this.setState({ dbserror: 'Please verify dbs check details' });
			Toast.show({
				text: 'Please verify dbs check details',
				buttonText: 'Okay',
				type: 'danger',
			});
			return;
		}
     
		if (!((referees1 && referees2) || (referees2 && referees3) || (referees3 && referees1) )) {
			this.setState({ refereeserror: 'Please selcet atleast two referees' });
			Toast.show({
				text: 'Please selcet atleast two referees',
				buttonText: 'Okay',
				type: 'danger',
			});
			return;
		}
	    if(referees1){
			
			if (name1.length == 0) {
				this.setState({name1error: 'Please enter Refree1 Name' });
				Toast.show({
					text: 'Please enter Refree1 Name',
					buttonText: 'Okay',
					type: 'danger',
				});
				return;
			}
	
			if (name1.length > 0 && !Regex.validateString(name1)) {
				this.setState({ name1error: 'Please enter a valid Refree1 Name' });
				Toast.show({
					text: 'Please enter a valid Employer Name',
					buttonText: 'Okay',
					type: 'danger',
				});
				return;
			}
			
			if (contact1.length == 0) {
				this.setState({ contact1error: 'Please enter Referee1 contact number' });
				Toast.show({
					text: 'Please enter Referee1 contact number',
					buttonText: 'Okay',
					type: 'danger',
				});
				return;
			}
			if (!Regex.validateMobileWithEleventDigit(contact1)) {
				this.setState({ contact1error: 'Please enter a valid  Referee1 contact number' });
				Toast.show({
					text: 'Please enter a valid  Referee1 contact number',
					buttonText: 'Okay',
					type: 'danger',
				});
				return;
			}
			if (email1.length === 0) {
				this.setState({ email1error: 'Please enter Referee1 email' });
				Toast.show({
					text: 'Please enter email',
					buttonText: 'Okay',
					type: 'danger',
				});
				return;
			}
			if (!Regex.validateEmail(email1)) {
				this.setState({ email1error: 'Referee1 Email is  not valid' });
				Toast.show({
					text: 'Referee1 Email is  not valid',
					buttonText: 'Okay',
					type: 'danger',
				});
				return;
			}

			if (designation1.length == 0) {
				this.setState({designation1error: 'Please enter Refree1 Designation' });
				Toast.show({
					text: 'Please enter Refree1 Designation',
					buttonText: 'Okay',
					type: 'danger',
				});
				return;
			}
	
			if (designation1.length > 0 && !Regex.validateString(designation1)) {
				this.setState({ designation1error: 'Please enter a valid Refree1 Designation' });
				Toast.show({
					text: 'Please enter a valid Refree1 Designation',
					buttonText: 'Okay',
					type: 'danger',
				});
				return;
			}
			if (address1.length == 0) {
				this.setState({address1error: 'Please enter Refree1 Address' });
				Toast.show({
					text: 'Please enter Refree1 Address',
					buttonText: 'Okay',
					type: 'danger',
				});
				return;
			}
	
			if (address1.length > 0 && !Regex.validateString(address1)) {
				this.setState({ address1error: 'Please enter a valid Refree1 Address' });
				Toast.show({
					text: 'Please enter a valid Refree1 Address',
					buttonText: 'Okay',
					type: 'danger',
				});
				return;
			}
		}

		if(referees2){
			
			if (name2.length == 0) {
				this.setState({name2error: 'Please enter Refree2 Name' });
				Toast.show({
					text: 'Please enter Refree2 Name',
					buttonText: 'Okay',
					type: 'danger',
				});
				return;
			}
	
			if (name2.length > 0 && !Regex.validateString(name2)) {
				this.setState({ name2error: 'Please enter a valid Refree2 Name' });
				Toast.show({
					text: 'Please enter a valid Refree2 Name',
					buttonText: 'Okay',
					type: 'danger',
				});
				return;
			}
			
			if (contact2.length == 0) {
				this.setState({ contact2error: 'Please enter Referee2 contact number' });
				Toast.show({
					text: 'Please enter Referee2 contact number',
					buttonText: 'Okay',
					type: 'danger',
				});
				return;
			}
			if (!Regex.validateMobileWithEleventDigit(contact2)) {
				this.setState({ contact2error: 'Please enter a valid  Referee2 contact number' });
				Toast.show({
					text: 'Please enter a valid  Referee2 contact number',
					buttonText: 'Okay',
					type: 'danger',
				});
				return;
			}
			if (email2.length === 0) {
				this.setState({ email2error: 'Please enter Referee2 email' });
				Toast.show({
					text: 'Please enter Referee2 email',
					buttonText: 'Okay',
					type: 'danger',
				});
				return;
			}
			if (!Regex.validateEmail(email2)) {
				this.setState({ email2error: 'Referee1 Email is  not valid' });
				Toast.show({
					text: 'Referee1 Email is  not valid',
					buttonText: 'Okay',
					type: 'danger',
				});
				return;
			}

			if (designation2.length == 0) {
				this.setState({designation2error: 'Please enter Refree2 Designation' });
				Toast.show({
					text: 'Please enter Refree2 Designation',
					buttonText: 'Okay',
					type: 'danger',
				});
				return;
			}
	
			if (designation2.length > 0 && !Regex.validateString(designation2)) {
				this.setState({ designation2error: 'Please enter a valid Refree2 Designation' });
				Toast.show({
					text: 'Please enter a valid Refree2 Designation',
					buttonText: 'Okay',
					type: 'danger',
				});
				return;
			}
			if (address2.length == 0) {
				this.setState({address2error: 'Please enter Refree2 Address' });
				Toast.show({
					text: 'Please enter Refree1 Designation',
					buttonText: 'Okay',
					type: 'danger',
				});
				return;
			}
	
			if (address2.length > 0 && !Regex.validateString(address2)) {
				this.setState({ address2error: 'Please enter a valid Refree2 Address' });
				Toast.show({
					text: 'Please enter a valid Refree2 Address',
					buttonText: 'Okay',
					type: 'danger',
				});
				return;
			}
		}

		if(referees3){
			
			if (name3.length == 0) {
				this.setState({name3error: 'Please enter Refree3 Name' });
				Toast.show({
					text: 'Please enter Refree3 Name',
					buttonText: 'Okay',
					type: 'danger',
				});
				return;
			}
	
			if (name3.length > 0 && !Regex.validateString(name3)) {
				this.setState({ name3error: 'Please enter a valid Refree3 Name' });
				Toast.show({
					text: 'Please enter a valid Refree3 Name',
					buttonText: 'Okay',
					type: 'danger',
				});
				return;
			}
			
			if (contact3.length == 0) {
				this.setState({ contact3error: 'Please enter Referee3 contact number' });
				Toast.show({
					text: 'Please enter Referee3 contact number',
					buttonText: 'Okay',
					type: 'danger',
				});
				return;
			}
			if (!Regex.validateMobileWithEleventDigit(contact3)) {
				this.setState({ contact3error: 'Please enter a valid  Referee3 contact number' });
				Toast.show({
					text: 'Please enter a valid  Referee3 contact number',
					buttonText: 'Okay',
					type: 'danger',
				});
				return;
			}
			if (email3.length === 0) {
				this.setState({ email3error: 'Please enter Referee3 email' });
				Toast.show({
					text: 'Please enter Referee3 email',
					buttonText: 'Okay',
					type: 'danger',
				});
				return;
			}
			if (!Regex.validateEmail(email3)) {
				this.setState({ email3error: 'Referee3 Email is  not valid' });
				Toast.show({
					text: 'Referee3 Email is  not valid',
					buttonText: 'Okay',
					type: 'danger',
				});
				return;
			}

			if (designation3.length == 0) {
				this.setState({designation3error: 'Please enter Refree3 Designation' });
				Toast.show({
					text: 'Please enter Refree3 Designation',
					buttonText: 'Okay',
					type: 'danger',
				});
				return;
			}
	
			if (designation3.length > 0 && !Regex.validateString(designation3)) {
				this.setState({ designation2error: 'Please enter a valid Refree3 Designation' });
				Toast.show({
					text: 'Please enter a valid Refree3 Designation',
					buttonText: 'Okay',
					type: 'danger',
				});
				return;
			}
			if (address3.length == 0) {
				this.setState({address3error: 'Please enter Refree3 Address' });
				Toast.show({
					text: 'Please enter Refree3 Designation',
					buttonText: 'Okay',
					type: 'danger',
				});
				return;
			}
	
			if (address3.length > 0 && !Regex.validateString(address3)) {
				this.setState({ address3error: 'Please enter a valid Refree3 Address' });
				Toast.show({
					text: 'Please enter a valid Refree3 Address',
					buttonText: 'Okay',
					type: 'danger',
				});
				return;
			}
		}


      console.log("salary",salary)
		if (salary === ''  || salary === null) {
			this.setState({ salaryerror: 'Please fill your salary' });
			Toast.show({
				text: 'Please fill your salary',
				buttonText: 'Okay',
				type: 'danger',
			});
			return;
		}

		if (!Regex.validateNumbers(salary)) {
			this.setState({ salaryerror: 'Please enter a valid salary' });
			Toast.show({
				text: 'Please enter a valid salary',
				buttonText: 'Okay',
				type: 'danger',
			});
			return;
		}
		if (Number(salary) > 100) {
			this.setState({ salaryerror: 'Please enter salary less than or equal to 100' });
			Toast.show({
				text: 'Please enter salary less than or equal to 100',
				buttonText: 'Okay',
				type: 'danger',
			});
			return;
		}
		if(is_negotiable===null){
			this.setState({ isItNegotiableError: 'Please enter a valid salary' });
			Toast.show({
				text: 'is salary is negotiatable?',
				buttonText: 'Okay',
				type: 'danger',
			});
			return;
		}

		if (question1 === null) {
			this.setState({ question1error: 'Please answer the question' });
			Toast.show({
				text: 'Please answer the question',
				buttonText: 'Okay',
				type: 'danger',
			});
			return;
		}

		if (question2 === null) {
			this.setState({ question2error: 'Please answer the question' });
			Toast.show({
				text: 'Please answer the question',
				buttonText: 'Okay',
				type: 'danger',
			});
			return;
		}

		let formdata = new FormData();
		let qualificationslist = [];

		formdata.append('user_id', this.props.userid);
		console.log("this.props",this.props)
		formdata.append('api_token', this.props.token);
		// formdata.append('qualicompletedyear', qualicompletedyear);
		// formdata.append('qualification_id', qualification.id);
		// formdata.append('qualification_doc', qualification_doc);
		formdata.append('full_time',  this.props.isCurrentWorking ? 1 : 2);
		
         if(this.props.isCurrentWorking){
		
		formdata.append('current_emp', currentcompanyname);
		formdata.append('current_emp_contact', currentcompanycontact);
		if(currentcompanydoc.hasOwnProperty('uri')){
			formdata.append('current_company_doc', currentcompanydoc);
		}
	   }else{
		formdata.append('last_employer_name', lastemployername);
		formdata.append('last_employer_contact', lastemployercontact);
		if(lastemployerdetails.hasOwnProperty('uri')){
			formdata.append('last_employer_doc', lastemployerdetails);
		}
	}
		formdata.append('last_appraisal_date', lastappraisal);

		if(last_appraisal_evidence.hasOwnProperty('uri')){
		formdata.append('last_appraisal_evidence', last_appraisal_evidence);
		}

		if(eppdoc.hasOwnProperty('uri')){
			formdata.append('occupational_health_doc', eppdoc);
		}
		let qualidocsDummy = [];
		// qualidocs.push({qualification: qualification.id == '1' ? 'MBBS' : 'Others',yearofcompletion: qualicompletedyear,cert : qualification_doc})
	     qualidocsDummy = [...qualidocs,{qualification: qualification.id == '1' ? 'MBBS' : 'Other',yearofcompletion: qualicompletedyear,cert : qualification_doc}] 
	     console.log('qualidocs',qualidocsDummy)
		// formdata.append(qualification.id == '1' ? 'MBBS' : 'Others', {qualification: qualification.id == '1' ? 'MBBS' : 'Others',yearofcompletion: qualicompletedyear,cert : qualification_doc});
		formdata.append('qualificationarray', JSON.stringify(qualidocsDummy));
		formdata.append('salary', salary);
		if (qualidocsDummy.length > 0) {
			qualidocsDummy.map(item => {
				console.log('item',item)
				formdata.append(item.qualification, item.cert);
			});
		}
		formdata.append('traningdocs', JSON.stringify(traningdocs));
		console.log('traningdocs',traningdocs)
		if (traningdocs.length > 0) {
			traningdocs.map(item => {
				formdata.append(item.id, item.value);
			});
		}
		
		formdata.append('dbs_check', dbscheckdetail);
		let refressdata = [];
		if(referees1){
			refressdata.push({ candidate_id : this.props.userdata.doctor.id,
				refree_type	: 1,
				name : 	name1,
				phone_number : contact1,	
				email: email1,	
				designation	: designation1,
				address : address1})
		}
		if(referees2){
			refressdata.push({ candidate_id : this.props.userdata.doctor.id,
				refree_type	: 2,
				name : 	name2,
				phone_number : contact2,	
				email: email2,	
				designation	: designation2,
				address : address2})
		}
		if(referees3){
			refressdata.push({ candidate_id : this.props.userdata.doctor.id,
				refree_type	: 3,
				name : 	name3,
				phone_number : contact3,	
				email: email3,	
				designation	: designation3,
				address : address3})
		}
		console.log('refressdata',refressdata)
		formdata.append('Refrees', JSON.stringify(refressdata));
		
		formdata.append('q1', question1);
		formdata.append('q2', question2);
		formdata.append('is_negotiable', is_negotiable);
		console.log('simpleFormdata',formdata)
		console.log(JSON.stringify(formdata), 'formdtata====<>');
		context.setState({ visible: true });
		//	apis/saveStructuralData
    
		RestClient.imageUpload('/apis/saveStructuralData', {}, formdata).then(response => {
			context.setState({ visible: false });
			console.log(response, 'resposne');
			if (response.status === 200) {
				toast({ text: response.message });
				navigate('SignupupFormfive');
				context.props.tabUpdate({value: 4});
			} else if (response.status === 401) {
				this.props.reset();
				toast({ text: response.message });
				resetNavigationTo('auth', navigation);
			}
		}).catch((error)=>{
			console.log(error)
			context.setState({ visible: false });
		});


		//navigate('SignupupFormfive');
	};
	_handleFocusNextField = nextField => {
		this.refs[nextField].focus();
	};

	render() {
		const {
			navigation: { navigate },
			SignupUpdate,
			currentcompanydoc,
			currentcompanyname,
			currentcompanycontact,
		} = this.props;
		return (
			<View style={{ flex: 1, backgroundColor: '#fff' }}>
				<Tickcomponet step={4} />
				<KeyboardAwareScrollView
				    extraHeight={moderateScale(200)}
					enableResetScrollToCoords={false}
					style={{
						flex: 1,
						backgroundColor: '#fff',
						paddingHorizontal: scale(10),
					}}
				>
					<View
						style={{
							flex: 0.2,
							paddingHorizontal: scale(10),
							paddingTop: verticalScale(2),
							marginTop: verticalScale(15),
							marginBottom: verticalScale(10),
						}}
					>
						<Text
							style={{
								fontFamily: fonts.fontPrimaryLight,
								fontSize: normalize(36),
								color: '#000000',
								opacity: 0.8,
							}}
						>
							Structured Profile
						</Text>
					</View>
					<View style={{ flex: 0.8, paddingHorizontal: scale(10) }}>
						<View
							style={{
								flex: 0.2,
								paddingVertical: verticalScale(10),
								flexDirection: 'row',
							}}
						>
							<View style={{ flex: 0.7 }}>
								<Text
									style={{
										fontFamily: fonts.fontPrimaryLight,
										fontSize: normalize(12),
										color: '#02B2FE',
										opacity: 1.1,
									}}
								>
									Educational Qualifications
								</Text>
							</View>
							<TouchableOpacity
								style={{ flex: 0.3, alignItems: 'flex-end' }}
								onPress={() => navigate('AddmoreQualification')}
							>
								<Text
									style={{
										fontFamily: fonts.fontPrimaryLight,
										fontSize: normalize(10),
										color: '#02B2FE',
									}}
								>
									Add More
								</Text>
							</TouchableOpacity>
						</View>

						<Dropdown
							error={this.state.qualificationerror}
							label={'Undergraduate'}
							data={qualificationlist}
							fontSize={15}
							pickerStyle={{
								borderWidth: 1,
								borderColor: '#666666',
								borderRadius: 5,
							}}
							value={'select graduation'}
							itemTextStyle={[
								{
									fontSize: 16,
									fontFamily: fonts.fontPrimaryLight,
								},
							]}
							onChangeText={(value, index) => {
								SignupUpdate({
									prop: 'qualification',
									value: { value: value, id: qualificationlist[index].id },
								});
							}}
						/>

						<View style={{ marginVertical: verticalScale(5) }}>
							<Text style={{ opacity: 0.7 }}>Year of completion</Text>
							<DatePickerComponent
								dob={this.props.qualicompletedyear}
								onDateChange={date =>
									SignupUpdate({
										prop: 'qualicompletedyear',
										value: date,
									})
								}
							/>
							<Text
								style={{
									color: 'rgb(213, 0, 0)',
									fontSize: 12,
									marginVertical: verticalScale(2),
								}}
							>
								{this.state.qualicompletedyearerror}
							</Text>
						</View>
						<Accordion Header="Upload evidence">
							<DocumentUploader
								documentSelected={res =>
									SignupUpdate({
										prop: 'qualification_doc',
										value: res,
									})
								}
							/>
						</Accordion>

						<Text
							style={{
								color: 'rgb(213, 0, 0)',
								fontSize: 12,
								marginVertical: verticalScale(2),
							}}
						>
							{this.state.qualidocserror}
						</Text>
					</View>
					<View style={{ flex: 0.5, marginTop: verticalScale(10) }}>
							<View style={{ flex: 0.2 }}>
								<Text
									style={{
										fontFamily: fonts.fontPrimaryLight,
										fontSize: normalize(12),
										marginHorizontal: scale(10),
										opacity: 0.8,
										textAlign: 'left',
									}}
								>
									Are you in current full time employment ?
								</Text>
							</View>
							<View style={{ flex: 0.8, flexDirection: 'row', marginTop: verticalScale(10) }}>
								<Genderfield
									selected={this.props.isCurrentWorking === true}
									onPress={() => SignupUpdate({ prop: 'isCurrentWorking', value: true })}
									label="Yes"
								/>
								<Genderfield
									selected={this.props.isCurrentWorking === false}
									onPress={() => SignupUpdate({ prop: 'isCurrentWorking', value: false })}
									label="No"
								/>
							</View>
						</View>
					{this.props.isCurrentWorking ? <View style={{ flex: 0.5, marginHorizontal: scale(10) }}>
						<View
							style={{
								flex: 0.2,
								marginTop: verticalScale(10),
							}}
						>
							<Text
								style={{
									fontFamily: fonts.fontPrimaryLight,
									fontSize: normalize(12),
									color: '#02B2FE',
									opacity: 1.1,
								}}
							>
							 Employment Details
							</Text>
						</View>




			
						<View>
							<TextField
								maxLength={11}
								ref={this.companyName}
								value={currentcompanyname}
								defaultValue={''}
								keyboardType="default"
								autoCapitalize="sentences"
								autoCorrect={false}
								enablesReturnKeyAutomatically={true}
								onFocus={this.onFocus}
								onChangeText={text => {
									SignupUpdate({
										prop: 'currentcompanyname',
										value: text,
									});
								}}
								onSubmitEditing={this._handleFocusNextField.bind(this, 'currentcompanycontact')}
								returnKeyType="next"
								label="Current Employer"
								error={this.state.currentcompanynameerror}
								tintColor={'#02B2FE'}
							/>
							<TextField
								maxLength={11}
								ref={'currentcompanycontact'}
								value={currentcompanycontact}
								defaultValue={''}
								keyboardType="numeric"
								autoCapitalize="sentences"
								autoCorrect={false}
								returnKeyType="done"
								enablesReturnKeyAutomatically={true}
								onFocus={this.onFocus}
								onChangeText={text => {
									SignupUpdate({
										prop: 'currentcompanycontact',
										value: text,
									});
								}}
								//onSubmitEditing={this._handleFocusNextField.bind(this, 'Surname')}
								returnKeyType="next"
								label="Contact Number"
								error={this.state.currentcompanycontacterror}
								tintColor={'#02B2FE'}
							/>

							{this.props.isCurrentWorking ? <Accordion Header="Upload evidence">
								<DocumentUploader
								   uri={this.props.currentcompanydoc.uri}
									documentSelected={res =>
										SignupUpdate({
											prop: 'currentcompanydoc',
											value: res,
										})
									}
								/>
							</Accordion> : null}
							<Text
							style={{
								color: 'rgb(213, 0, 0)',
								fontSize: 12,
								marginVertical: verticalScale(2),
							}}
						>
							{this.state.uploadEvidanceError}
						</Text>
							
						</View>
					</View>
					:
					<View
						style={{
							flex: 0.5,
							marginHorizontal: scale(10),
							marginTop: verticalScale(15),
						}}
					>
						<View
							style={{
								flex: 0.2,
							}}
						>
							<Text
								style={{
									fontFamily: fonts.fontPrimaryLight,
									fontSize: normalize(12),
									color: '#02B2FE',
									opacity: 1.1,
								}}
							>
								Last Full Time Employment (if currently not in full-time employment)
							</Text>
						</View>
						<View style={{ flex: 0.8 }}>
							<TextField
								maxLength={18}
								ref={'lastemployername'}
								value={this.props.lastemployername}
								defaultValue={''}
								keyboardType="default"
								autoCapitalize="sentences"
								autoCorrect={false}
								enablesReturnKeyAutomatically={true}
								onFocus={this.onFocus}
								onChangeText={text => {
									SignupUpdate({
										prop: 'lastemployername',
										value: text,
									});
								}}
								//onSubmitEditing={this._handleFocusNextField.bind(this, 'Surname')}
								returnKeyType="next"
								label="Employer's Name"
								error={this.state.lastemployernameerror}
								tintColor={'#02B2FE'}
							/>
							<TextField
								maxLength={11}
								ref={'lastemployercontact'}
								value={this.props.lastemployercontact}
								defaultValue={''}
								keyboardType="numeric"
								returnKeyType="done"
								autoCapitalize="sentences"
								autoCorrect={false}
								enablesReturnKeyAutomatically={true}
								onFocus={this.onFocus}
								onChangeText={text => {
									SignupUpdate({
										prop: 'lastemployercontact',
										value: text,
									});
								}}
								//onSubmitEditing={this._handleFocusNextField.bind(this, 'Surname')}
								returnKeyType="next"
								label="Contact Number"
								error={this.state.lastemployercontacterror}
								tintColor={'#02B2FE'}
							/>

							{!this.props.isCurrentWorking ? <View><Accordion Header="Upload evidence">
								<DocumentUploader
									documentSelected={res =>
										SignupUpdate({
											prop: 'lastemployerdetails',
											value: res,
										})
									}
								/>
							</Accordion></View> : null}
							<Text
							style={{
								color: 'rgb(213, 0, 0)',
								fontSize: 12,
								marginVertical: verticalScale(2),
							}}
						>
							{this.state.lastemployerdetailsError}
						</Text>
						</View>
				        </View>}
						<View>
						<View>
							<View
								style={{
									height: verticalScale(60),
									width,
									marginRight: 0,

									marginVertical: verticalScale(10),
								}}
							>
								<Text style={{ opacity: 0.7, marginBottom: 15 }}>
									Last Appraisal or ARCP (for trainees)
								</Text>
								<DatePickerComponent
									dob={this.props.lastappraisal}
									onDateChange={date => SignupUpdate({ prop: 'lastappraisal', value: date })}
								/>
							     <Text
									style={{
										color: 'rgb(213, 0, 0)',
										fontSize: 12,
										marginVertical: verticalScale(2),
									}}
							>
								{this.state.lastappraisalerror}
							</Text>
							</View>
						</View>
						<Accordion Header="Last Appraisal Evidence">
							<DocumentUploader documentSelected={res => SignupUpdate({ prop: 'last_appraisal_evidence', value: res })} />
						</Accordion>
						
						<Text
							style={{
								color: 'rgb(213, 0, 0)',
								fontSize: 12,
								marginVertical: verticalScale(2),
							}}
						>
							{this.state.lastappraisaldocerror}
						</Text>

						<Accordion Header="Occupational Health Screen for EPP">
							<DocumentUploader documentSelected={res => SignupUpdate({ prop: 'eppdoc', value: res })} />
						</Accordion>
						<Text
							style={{
								color: 'rgb(213, 0, 0)',
								fontSize: 12,
								marginVertical: verticalScale(2),
							}}
						>
							{this.state.eppdocError}
						</Text>

						<View style={{ flex: 0.5 }}>
							<View
								style={{
									flex: 0.1,
									paddingHorizontal: scale(10),
									marginTop: verticalScale(8),
								}}
							>
								<Text
									style={{
										fontFamily: fonts.fontPrimaryLight,
										fontSize: normalize(12),
										color: '#02B2FE',
										opacity: 1.1,
									}}
								>
									Upload Mandatory Training Evidence
								</Text>
							</View>
							<ScrollView
								horizontal
								contentContainerStyle={{
									flexDirection: 'row',
									paddingBottom: 20,
								}}
							>
								{trainingcourses.map(item => {
									return (
										<Accordion Header={item.name}>
											<DocumentUploader
												documentSelected={res =>
													SignupUpdate({
														prop: 'traningdocs',
														value: [
															...this.props.traningdocs,
															{ c_name: item.name, id: item.id, value: res },
														],
													})
												}
											/>
										</Accordion>
									);
								})}
							</ScrollView>
							<Text
							style={{
								color: 'rgb(213, 0, 0)',
								fontSize: 12,
								marginVertical: verticalScale(2),
							}}
						>
							{this.state.traningdocsError}
						</Text>
							
						</View>

						<TextField
							maxLength={3}
							ref={'salary'}
							value={this.props.salary}
							defaultValue={''}
							keyboardType="numeric"
							autoCapitalize="sentences"
							autoCorrect={false}
							returnKeyType="done"
							enablesReturnKeyAutomatically={true}
							onFocus={this.onFocus}
							onChangeText={text => {
								SignupUpdate({
									prop: 'salary',
									value: text,
								});
							}}
							style={{ marginTop: 5 }}
							//onSubmitEditing={this._handleFocusNextField.bind(this, 'Surname')}
							returnKeyType="next"
							label="Hourly Wage"
							error={this.state.salaryerror}
							tintColor={'#02B2FE'}
						/>

						<View style={{ flex: 0.5, marginTop: verticalScale(10) }}>
							<View style={{ flex: 0.2 }}>
								<Text
									style={{
										fontFamily: fonts.fontPrimaryLight,
										fontSize: normalize(12),
										marginHorizontal: scale(10),
										opacity: 0.8,
										textAlign: 'left',
									}}
								>
									Is salary is negotiatable?
								</Text>
							</View>
							<View style={{ flex: 0.8, flexDirection: 'row', marginTop: verticalScale(10) }}>
								<Genderfield
									selected={this.props.is_negotiable === 1}
									onPress={() => SignupUpdate({ prop: 'is_negotiable', value: 1 })}
									label="Yes"
								/>
								<Genderfield
									selected={this.props.is_negotiable === 0}
									onPress={() => SignupUpdate({ prop: 'is_negotiable', value: 0 })}
									label="No"
								/>
							</View>
							<Text
								style={{
									color: 'rgb(213, 0, 0)',
									fontSize: 12,
									marginVertical: verticalScale(5),
								}}
							>
								{this.state.isItNegotiableError}
							</Text>
						</View>
						<View style={{ flex: 0.5 }}>
							<View style={{ flex: 0.2, marginVertical: verticalScale(10) }}>
								<Text
									style={{
										fontFamily: fonts.fontPrimaryLight,
										fontSize: normalize(14),
										marginHorizontal: scale(10),
										color: '#000000',
										opacity: 0.8,
										textAlign: 'left',
									}}
								>
									DBS Check Details
								</Text>
							</View>
							<View style={{ flex: 0.8 }}>
								<GenderfieldLong
									selected={this.props.dbscheckdetail === 1}
									onPress={() => SignupUpdate({ prop: 'dbscheckdetail', value: 1 })}
									label="Yes"
								/>
								<GenderfieldLong
									selected={this.props.dbscheckdetail === 0}
									onPress={() => SignupUpdate({ prop: 'dbscheckdetail', value: 0 })}
									label="No"
								/>
								<GenderfieldLong
									selected={this.props.dbscheckdetail === 2}
									onPress={() => SignupUpdate({ prop: 'dbscheckdetail', value: 2 })}
									label="Need to Apply"
								/>

								<Text
									style={{
										color: 'rgb(213, 0, 0)',
										fontSize: 12,
										marginVertical: verticalScale(2),
									}}
								>
									{this.state.dbserror}
								</Text>
							</View>
						</View>
						<View style={{ flex: 0.5 }}>
							<View stlye={{ flex: 0.2 }}>
								<Text
									style={{
										fontFamily: fonts.fontPrimaryLight,
										fontSize: normalize(14),
										marginHorizontal: scale(10),
										paddingVertical: scale(5),
										color: '#000000',
										opacity: 0.8,
										textAlign: 'left',
									}}
								>
									Referees
								</Text>
							</View>
							<View style={{ flex: 0.8, marginTop: verticalScale(10) , flexDirection : 'row',marginBottom: verticalScale(10) }}>
								{/* <GenderfieldLong
									selected={this.props.referees1 == true}
									onPress={() => SignupUpdate({ prop: 'referees1', value: !this.props.referees1 })}
									label="Current Employer"
								/> */}
						<CheckBox
							label="Current Employer"
							labelStyle={{
								fontFamily: fonts.fontPrimaryLight,
								fontSize: normalize(10),
								color: '#000000',
								opacity: 0.8,
							}}
							containerStyle={{ flexDirection : 'column', alignItems: 'center'}}
							checkboxStyle={{
								width: moderateScale(25),
								height: moderateScale(25),
							}}
							checked={this.props.referees1}
							onChange={checked => SignupUpdate({ prop: 'referees1', value: !this.props.referees1 }) }
						/>
							<CheckBox
							label="Past Employer"
							labelStyle={{
								fontFamily: fonts.fontPrimaryLight,
								fontSize: normalize(10),
								color: '#000000',
								opacity: 0.8,
							}}
							containerStyle={{ flexDirection : 'column', alignItems: 'center'}}
							checkboxStyle={{
								width: moderateScale(25),
								height: moderateScale(25),
							}}
							checked={this.props.referees2}
							onChange={checked => SignupUpdate({ prop: 'referees2', value: !this.props.referees2 }) }
						/>
							<CheckBox 
							label="Professional Known"
							labelStyle={{
								fontFamily: fonts.fontPrimaryLight,
								fontSize: normalize(10),
								color: '#000000',
								opacity: 0.8,
							}}
							containerStyle={{ flexDirection : 'column', alignItems: 'center'}}
							checkboxStyle={{
								width: moderateScale(25),
								height: moderateScale(25),
							}}
							checked={this.props.referees3}
							onChange={checked => SignupUpdate({ prop: 'referees3', value: !this.props.referees3 }) }
						/>
								{/* <GenderfieldLong
									selected={this.props.referees2 == true}
									onPress={() => SignupUpdate({ prop: 'referees2', value: !this.props.referees2 })}
									label="Past Employer"
								/>
								<GenderfieldLong
									selected={this.props.referees3 == true}
									onPress={() => SignupUpdate({ prop: 'referees3', value: !this.props.referees3 })}
									label="Professional & Good Standing"
								/> */}
							</View>
							<Text
									style={{
										color: 'rgb(213, 0, 0)',
										fontSize: 12,
										marginVertical: verticalScale(2),
									}}
								>
									{this.state.refereeserror}
								</Text>
						</View>
					</View>


{this.props.referees1 && <View style={{ flex: 0.5, marginHorizontal: scale(10) }}>
						<View
							style={{
								flex: 0.2,
								marginTop: verticalScale(10),
							}}
						>
							<Text
								style={{
									fontFamily: fonts.fontPrimaryLight,
									fontSize: normalize(12),
									color: '#02B2FE',
									opacity: 1.1,
								}}
							>
							 Current Employer
							</Text>
						</View>
						<View>
							<TextField
								maxLength={20}
								ref={'name'}
								value={this.props.name1}
								defaultValue={''}
								keyboardType="default"
								autoCapitalize="sentences"
								autoCorrect={false}
								enablesReturnKeyAutomatically={true}
								onFocus={this.onFocus}
								onChangeText={text => {
									SignupUpdate({
										prop: 'name1',
										value: text,
									});
								}}
								onSubmitEditing={this._handleFocusNextField.bind(this, 'currentcompanycontact1')}
								returnKeyType="next"
								label="Name"
								error={this.state.name1error}
								tintColor={'#02B2FE'}
							/>
							<TextField
								maxLength={11}
								ref={'currentcompanycontact1'}
								value={this.props.contact1}
								defaultValue={''}
								keyboardType="numeric"
								autoCapitalize="sentences"
								autoCorrect={false}
								onSubmitEditing={this._handleFocusNextField.bind(this, 'email1')}
								returnKeyType="done"
								enablesReturnKeyAutomatically={true}
								onFocus={this.onFocus}
								onChangeText={text => {
									SignupUpdate({
										prop: 'contact1',
										value: text,
									});
								}}
								onSubmitEditing={this._handleFocusNextField.bind(this, 'email1')}
								returnKeyType="next"
								label="Contact Number"
								error={this.state.contact1error}
								tintColor={'#02B2FE'}
							/>
                            <TextField
								maxLength={30}
								ref={'email1'}
								value={this.props.email1}
								defaultValue={''}
								keyboardType="email-address"
								autoCapitalize="none"
								autoCorrect={false}
								enablesReturnKeyAutomatically={true}
								onFocus={this.onFocus}
								onChangeText={text => {
									SignupUpdate({
										prop: 'email1',
										value: text,
									});
								}}
								onSubmitEditing={this._handleFocusNextField.bind(this, 'designation1')}
								returnKeyType="next"
								label="Email"
								error={this.state.email1error}
								tintColor={'#02B2FE'}
							/>
							<TextField
								maxLength={20}
								ref={'designation1'}
								value={this.props.designation1}
								defaultValue={''}
								keyboardType="default"
								autoCapitalize="sentences"
								autoCorrect={false}
								returnKeyType="done"
								enablesReturnKeyAutomatically={true}
								onFocus={this.onFocus}
								onChangeText={text => {
									SignupUpdate({
										prop: 'designation1',
										value: text,
									});
								}}
								onSubmitEditing={this._handleFocusNextField.bind(this, 'address1')}
								returnKeyType="next"
								label="Designation"
								error={this.state.designation1error}
								tintColor={'#02B2FE'}
							/>
	                       <TextField
								maxLength={20}
								ref={'address1'}
								value={this.props.address1}
								defaultValue={''}
								keyboardType="default"
								autoCapitalize="sentences"
								autoCorrect={false}
								returnKeyType="done"
								enablesReturnKeyAutomatically={true}
								onFocus={this.onFocus}
								onChangeText={text => {
									SignupUpdate({
										prop: 'address1',
										value: text,
									});
								}}
								//onSubmitEditing={this._handleFocusNextField.bind(this, 'Surname')}
								returnKeyType="next"
								label="Address"
								error={this.state.address1error}
								tintColor={'#02B2FE'}
							/>
							
							<Text
							style={{
								color: 'rgb(213, 0, 0)',
								fontSize: 12,
								marginVertical: verticalScale(2),
							}}
						>
							{this.state.uploadEvidanceError}
						</Text>
							
						</View>
					</View>}

					{this.props.referees2 && <View style={{ flex: 0.5, marginHorizontal: scale(10) }}>
						<View
							style={{
								flex: 0.2,
								marginTop: verticalScale(10),
							}}
						>
							<Text
								style={{
									fontFamily: fonts.fontPrimaryLight,
									fontSize: normalize(12),
									color: '#02B2FE',
									opacity: 1.1,
								}}
							>
							 Past Employer
							</Text>
						</View>
						<View>
							<TextField
								maxLength={20}
								ref={'name2'}
								value={this.props.name2}
								defaultValue={''}
								keyboardType="default"
								autoCapitalize="sentences"
								autoCorrect={false}
								enablesReturnKeyAutomatically={true}
								onFocus={this.onFocus}
								onChangeText={text => {
									SignupUpdate({
										prop: 'name2',
										value: text,
									});
								}}
								onSubmitEditing={this._handleFocusNextField.bind(this, 'currentcompanycontact2')}
								returnKeyType="next"
								label="Name"
								error={this.state.name2error}
								tintColor={'#02B2FE'}
							/>
							<TextField
								maxLength={11}
								ref={'currentcompanycontact2'}
								value={this.props.contact2}
								defaultValue={''}
								keyboardType="numeric"
								autoCapitalize="sentences"
								autoCorrect={false}
								returnKeyType="done"
								enablesReturnKeyAutomatically={true}
								onFocus={this.onFocus}
								onChangeText={text => {
									SignupUpdate({
										prop: 'contact2',
										value: text,
									});
								}}
								onSubmitEditing={this._handleFocusNextField.bind(this, 'email2')}
								returnKeyType="next"
								label="Contact Number"
								error={this.state.contact2error}
								tintColor={'#02B2FE'}
							/>
                            <TextField
								maxLength={30}
								ref={'email2'}
								value={this.props.email2}
								defaultValue={''}
								keyboardType="email-address"
								autoCapitalize="none"
								autoCorrect={false}
								enablesReturnKeyAutomatically={true}
								onFocus={this.onFocus}
								onChangeText={text => {
									SignupUpdate({
										prop: 'email2',
										value: text,
									});
								}}
								onSubmitEditing={this._handleFocusNextField.bind(this, 'designation2')}
								returnKeyType="next"
								label="Email"
								error={this.state.email2error}
								tintColor={'#02B2FE'}
							/>
							<TextField
								maxLength={20}
								ref={'designation2'}
								value={this.props.designation2}
								defaultValue={''}
								keyboardType="default"
								autoCapitalize="sentences"
								autoCorrect={false}
								returnKeyType="done"
								enablesReturnKeyAutomatically={true}
								onFocus={this.onFocus}
								onChangeText={text => {
									SignupUpdate({
										prop: 'designation2',
										value: text,
									});
								}}
								onSubmitEditing={this._handleFocusNextField.bind(this, 'address2')}
								returnKeyType="next"
								label="Designation"
								error={this.state.designation2error}
								tintColor={'#02B2FE'}
							/>
	                       <TextField
								maxLength={20}
								ref={'address2'}
								value={this.props.address2}
								defaultValue={''}
								keyboardType="default"
								autoCapitalize="sentences"
								autoCorrect={false}
								returnKeyType="done"
								enablesReturnKeyAutomatically={true}
								onFocus={this.onFocus}
								onChangeText={text => {
									SignupUpdate({
										prop: 'address2',
										value: text,
									});
								}}
								//onSubmitEditing={this._handleFocusNextField.bind(this, 'Surname')}
								returnKeyType="next"
								label="Address"
								error={this.state.address2error}
								tintColor={'#02B2FE'}
							/>
							
							<Text
							style={{
								color: 'rgb(213, 0, 0)',
								fontSize: 12,
								marginVertical: verticalScale(2),
							}}
						>
							{this.state.uploadEvidanceError}
						</Text>
							
						</View>
					</View>}
{this.props.referees3 && <View style={{ flex: 0.5, marginHorizontal: scale(10) }}>
<View
	style={{
		flex: 0.2,
		marginTop: verticalScale(10),
	}}
>
	<Text
		style={{
			fontFamily: fonts.fontPrimaryLight,
			fontSize: normalize(12),
			color: '#02B2FE',
			opacity: 1.1,
		}}
	>
Professional  && Good Standing
	</Text>
</View>
<View>
	<TextField
		maxLength={20}
		ref={'name3'}
		value={this.props.name3}
		defaultValue={''}
		keyboardType="default"
		autoCapitalize="sentences"
		autoCorrect={false}
		enablesReturnKeyAutomatically={true}
		onFocus={this.onFocus}
		onChangeText={text => {
			SignupUpdate({
				prop: 'name3',
				value: text,
			});
		}}
		onSubmitEditing={this._handleFocusNextField.bind(this, 'currentcompanycontact3')}
		returnKeyType="next"
		label="Name"
		error={this.state.name3error}
		tintColor={'#02B2FE'}
	/>
	<TextField
		maxLength={11}
		ref={'currentcompanycontact3'}
		value={this.props.contact3}
		defaultValue={''}
		keyboardType="numeric"
		autoCapitalize="sentences"
		autoCorrect={false}
		returnKeyType="done"
		enablesReturnKeyAutomatically={true}
		onFocus={this.onFocus}
		onChangeText={text => {
			SignupUpdate({
				prop: 'contact3',
				value: text,
			});
		}}
		onSubmitEditing={this._handleFocusNextField.bind(this, 'email3')}
		returnKeyType="next"
		label="Contact Number"
		error={this.state.contact3error}
		tintColor={'#02B2FE'}
	/>
	<TextField
		maxLength={30}
		ref={'email3'}
		value={this.props.email3}
		defaultValue={''}
		keyboardType="email-address"
		autoCapitalize="none"
		autoCorrect={false}
		enablesReturnKeyAutomatically={true}
		onFocus={this.onFocus}
		onChangeText={text => {
			SignupUpdate({
				prop: 'email3',
				value: text,
			});
		}}
		onSubmitEditing={this._handleFocusNextField.bind(this, 'designation3')}
		returnKeyType="next"
		label="Email"
		error={this.state.email3error}
		tintColor={'#02B2FE'}
	/>
	<TextField
		maxLength={20}
		ref={'designation3'}
		value={this.props.designation3}
		defaultValue={''}
		keyboardType="default"
		autoCapitalize="sentences"
		autoCorrect={false}
		returnKeyType="done"
		enablesReturnKeyAutomatically={true}
		onFocus={this.onFocus}
		onChangeText={text => {
			SignupUpdate({
				prop: 'designation3',
				value: text,
			});
		}}
		onSubmitEditing={this._handleFocusNextField.bind(this, 'address3')}
		returnKeyType="next"
		label="Designation"
		error={this.state.designation3error}
		tintColor={'#02B2FE'}
	/>
   <TextField
		maxLength={20}
		ref={'address3'}
		value={this.props.address3}
		defaultValue={''}
		keyboardType="default"
	    autoCapitalize="sentences"
		autoCorrect={false}
		returnKeyType="done"
		enablesReturnKeyAutomatically={true}
		onFocus={this.onFocus}
		onChangeText={text => {
			SignupUpdate({
				prop: 'address3',
				value: text,
			});
		}}
		//onSubmitEditing={this._handleFocusNextField.bind(this, 'Surname')}
		returnKeyType="next"
		label="Address"
		error={this.state.address3error}
		tintColor={'#02B2FE'}
	/>
	
	<Text
	style={{
		color: 'rgb(213, 0, 0)',
		fontSize: 12,
		marginVertical: verticalScale(2),
	}}
>
	{this.state.uploadEvidanceError}
</Text>
	
</View>
</View>}




					<View style={{ flex: 0.5, marginTop: verticalScale(10) }}>
						<View style={{ flex: 0.2 }}>
							<Text
								style={{
									fontFamily: fonts.fontPrimaryLight,
									fontSize: normalize(12),
									marginHorizontal: scale(10),
									opacity: 0.8,
									textAlign: 'left',
								}}
							>
								Does your visa have a condition restricting employment or occupation in the UK?
							</Text>
						</View>
						<View style={{ flex: 0.8, flexDirection: 'row', marginTop: verticalScale(10) }}>
							<Genderfield
								selected={this.props.question1 === 1}
								onPress={() => SignupUpdate({ prop: 'question1', value: 1 })}
								label="Yes"
							/>
							<Genderfield
								selected={this.props.question1 === 0}
								onPress={() => SignupUpdate({ prop: 'question1', value: 0 })}
								label="No"
							/>
						</View>
						<Text
							style={{
								color: 'rgb(213, 0, 0)',
								fontSize: 12,
								marginVertical: verticalScale(5),
							}}
						>
							{this.state.question1error}
						</Text>
					</View>
					<View style={{ flex: 0.5, marginTop: verticalScale(10) }}>
						<View style={{ flex: 0.2 }}>
							<Text
								style={{
									fontFamily: fonts.fontPrimaryLight,
									fontSize: normalize(12),
									marginHorizontal: scale(10),
									opacity: 0.8,
									textAlign: 'left',
								}}
							>
								Do you have any current UNSPENT police cautions, reprimands or final warnings in the
								United Kingdom or in any other country?
							</Text>
						</View>
						<View style={{ flex: 0.8, flexDirection: 'row', marginTop: verticalScale(10) }}>
							<Genderfield
								selected={this.props.question2 === 1}
								onPress={() => SignupUpdate({ prop: 'question2', value: 1 })}
								label="Yes"
							/>
							<Genderfield
								selected={this.props.question2 === 0}
								onPress={() => SignupUpdate({ prop: 'question2', value: 0 })}
								label="No"
							/>
						</View>
						<Text
							style={{
								color: 'rgb(213, 0, 0)',
								fontSize: 12,
								marginVertical: verticalScale(5),
							}}
						>
							{this.state.question2error}
						</Text>
					</View>

					<View style={{ width, height: 180 }} />
				</KeyboardAwareScrollView>
				<NextButton onPress={this.nextButton} />
				{this.state.visible && (
					<Modal
						backdrop={false}
						isOpen={this.state.visible}
						onClosed={() => this.setState({ visible: false })}
						style={{
							flex: 1,
							backgroundColor: 'transparent',
							alignItems: 'center',
							justifyContent: 'center',
						}}
						position={'center'}
					>
						<View
							style={{
								flex: 1,
								backgroundColor: 'transparent',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<ActivityIndicator color={'#02B2FE'} size={'large'} />

							<Text style={{ color: '#02B2FE' }}>Loading ...</Text>
						</View>
					</Modal>
				)}
			</View>
		);
	}
}

const mapStateToProps = ({ SignupReducer, Loginreducer }) => {
	const { userid, token, userdata } = Loginreducer;
	const {
		loader,
		qualification,
		qualicompletedyear,
		qualidocs,
		currentcompanydoc,
		currentcompanyname,
		currentcompanycontact,
		lastemployername,
		lastemployercontact,
		lastemployerdetails,
		traningdocs,
		dbscheckdetail,
		referees1,
		referees2,
		referees3,
		question1,
		question2,
		question3,
		question4,
		question5,
		lastappraisal,
		last_appraisal_evidence,
		eppdoc,
		qualification_doc,
		salary,
		is_negotiable,
		isCurrentWorking,
		email1,
		designation1,
		address1,
		name1,
		contact1,
		email2,
		designation2,
		address2,
		name2,
		contact2,
		email3,
		designation3,
		address3,
		name3,
		contact3,
	} = SignupReducer;
	return {
		SignupReducer,
		loader,
		qualification,
		qualicompletedyear,
		qualidocs,
		currentcompanydoc,
		currentcompanyname,
		currentcompanycontact,
		lastemployername,
		lastemployercontact,
		lastemployerdetails,
		traningdocs,
		dbscheckdetail,
		referees1,
		referees2,
		referees3,
		question1,
		question2,
		question3,
		question4,
		question5,
		lastappraisal,
		last_appraisal_evidence,
		userid,
		token,
		userdata,
		eppdoc,
		qualification_doc,
		salary,
		is_negotiable,
		isCurrentWorking,
		email1,
		designation1,
		address1,
		name1,
		contact1,
		email2,
		designation2,
		address2,
		name2,
		contact2,
		email3,
		designation3,
		address3,
		name3,
		contact3
	};
};

export default connect(
	mapStateToProps,
	{ registraion, SignupUpdate,tabUpdate }
)(SignupupFormStrucProfile);
