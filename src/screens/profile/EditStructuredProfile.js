import React, { Component } from 'react';
import { View, Text, Dimensions, ScrollView, TouchableOpacity, DeviceEventEmitter, Platform, ActivityIndicator, Modal, Image } from 'react-native';
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
import Button from '../../components/button';
import moment from 'moment';
import Events from '../../utils/Events';

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
		value: 'Others',
	},
];

class EditStructureprofile extends Component {
	constructor(props) {
		super(props);
		console.log('datadtadtadat', this.props.navigation.state.params)
		let { Qualifications, certificates, doctor: { courses, candidates_qualifications, full_time, last_appraisal_date, last_appraisal_evidence, occupational_health_doc, salary, is_negotiable, dbs_check, candidates_referees, q1, q2 } } = this.props.navigation.state.params.profileData;
		let candidateArray, candidateArray2, stateData = {};
		console.log('candidates_referees', candidates_referees)
		candidateArray = candidates_qualifications.find(item => item['name'] === "MBBS");
		if (candidateArray == undefined) {
			candidateArray2 = candidates_qualifications.find(item => item['name'] === "Others");
		}
		if (candidateArray) {
			stateData = {
				...stateData,
				mainQualification: candidateArray.name,
				qualicompletedyear: moment(candidateArray.yearofcompletion).format('YYYY-MM-DD'),
				mainQualCert: candidateArray.cert
			}
		}
		else {
			stateData = {
				...stateData,
				mainQualification: candidateArray2.name,
				qualicompletedyear: moment(candidateArray2.yearofcompletion).format('YYYY-MM-DD'),
				mainQualCert: candidateArray2.cert
			}
		}
		stateData = {
			...stateData,
			qualification1: '',
			yearofcompletion1: '',
			cert1Url: '',
			qualification2: '',
			yearofcompletion2: '',
			cert2Url: '',
			qualification3: '',
			yearofcompletion3: '',
			cert3Url: '',
		}
		candidates_qualifications.map((item, i) => {
			if (item.name === "MBBS" && (!stateData.mainQualification === "MBBS")) {
				stateData = {
					...stateData,
					qualification1: 'MBBS',
					yearofcompletion1: moment(item.yearofcompletion).format('YYYY-MM-DD'),
					cert1Url: item.cert,
				}
			} else if (item.name === "Other2" && (!stateData.mainQualification === "Others")) {
				stateData = {
					...stateData,
					qualification3: 'Others2',
					yearofcompletion3: item.cert,
					yearofcompletion3: moment(item.yearofcompletion).format('YYYY-MM-DD'),
					cert3Url: item.cert,
				}
			} else if (item.name === "MBChB") {
				stateData = {
					...stateData,
					qualification2: 'MBChB',
					yearofcompletion2: item.cert,
					yearofcompletion2: moment(item.yearofcompletion).format('YYYY-MM-DD'),
					cert2Url: item.cert,
				}
			}
		})

		if (Number(full_time) === 1) {
			let { doctor: { current_emp, current_emp_cert, current_emp_contact } } = this.props.navigation.state.params.profileData;
			stateData = {
				...stateData,
				current_emp,
				current_emp_cert,
				current_emp_contact,
				last_employer_name: '',
				last_employer_contact: '',
				last_employer_doc: ''
			}
		} else {
			let { doctor: { last_employer_name, last_employer_contact, last_employer_doc } } = this.props.navigation.state.params.profileData;
			stateData = {
				...stateData,
				current_emp: '',
				current_emp_cert: '',
				current_emp_contact: '',
				last_employer_name,
				last_employer_contact,
				last_employer_doc,
			}
		}

		stateData = { ...stateData, referees1: false, refree_type1: '', phone_number1: '', name1: '', email1: '', designation1: '', address1: '', referees2: false, refree_type2: '', phone_number2: '', name2: '', email2: '', designation2: '', address2: '', referees3: false, refree_type3: '', phone_number3: '', name3: '', email3: '', designation3: '', address3: '' }

		candidates_referees.map((item) => {
			console.log('itemitemitemitem', item)
			if (item.refree_type == "1") {
				stateData = { ...stateData, referees1: true, refree_type1: item.refree_type, phone_number1: item.phone_number, name1: item.name, email1: item.email, designation1: item.designation, address1: item.address }
			} else if (item.refree_type == "2") {
				stateData = { ...stateData, referees2: true, refree_type2: item.refree_type, phone_number2: item.phone_number, name2: item.name, email2: item.email, designation2: item.designation, address2: item.address }
			} else if (item.refree_type == "3") {
				stateData = { ...stateData, referees3: true, refree_type3: item.refree_type, phone_number3: item.phone_number, name3: item.name, email3: item.email, designation3: item.designation, address3: item.address }
			}
		})

		stateData = { ...stateData, traingDocUrl1: '', traingDocUrl2: '', traingDocUrl3: '', traingDocUrl4: '', traingDocUrl5: '', traingDocUrl6: '', traingDocUrl7: '', traingDocUrl8: '', traingDocUrl9: '', traingDocUrl10: '', traingDoc1: {}, traingDoc2: {}, traingDoc3: {}, traingDoc4: {}, traingDoc5: {}, traingDoc6: {}, traingDoc7: {}, traingDoc8: {}, traingDoc9: {}, traingDoc10: {} }
		courses.map((item, i) => {
			let index = i + 1;
				stateData = { ...stateData, ['traingDocUrl' + item.id]: item };
				console.log('mappppppppppp', stateData)
			
		})
		console.log('statattttedata,', stateData)
		this.state = {
			...stateData,
			EditMore: false,
			q1,
			q2,
			doc1: '',
			doc2: '',
			doc3: '',
			cert1: {},
			cert2: {},
			cert3: {},
			mainQualCertAgain: {},
			current_emp_certAgain: {},
			last_employer_docAgain: {},
			last_appraisal_evidenceAgain: {},
			occupational_health_doc_Again: {},
			Qualifications,
			certificates,
			full_time: Number(full_time) == 1 ? 1 : 0 ,
			last_appraisal_date: moment(last_appraisal_date).format('YYYY-MM-DD'),
			last_appraisal_evidence,
			occupational_health_doc,
			dbs_check,
			salary: Number(salary),
			is_negotiable,
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
			uploadCurrentCompanyEvidanceError: '',
			qualificationerror: '',
			currentcompanycontacterror: '',
			currentcompanynameerror: '',
			lastemployernameerror: '',
			lastemployercontacterror: '',
			lastemployerdetailsError: '',
			dbserror: '',
			question1error: '',
			question2error: '',
			isItNegotiableError: '',
			qualidocserror: '',
			salaryerror: '',
			eppdocError: '',
			traningdocsError: '',
			refereeserror: '',
			name1error: '',
			contact1error: '',
			email1error: '',
			designation1error: '',
			address1error: '',
			name2error: '',
			email2error: '',
			designation2error: '',
			address2error: '',
			name3error: '',
			contact3error: '',
			email3error: '',
			designation3error: '',
			address3error: '',
			disable : true
		};
	}
	componentDidMount(){
		Events.on('backButtonPage', this.backButtonPage);
		Events.on('editButtonPage', this.editButtonPage);

	}
	componentWillUnmount(){
		Events.removeListener('backButtonPage', this.backButtonPage);
		Events.removeListener('editButtonPage', this.editButtonPage);
	}
	backButtonPage=(data)=>{
		this.props.navigation.pop();
	}
	editButtonPage=(data)=>{
		this.setState({disable: false})
	}
	handlePressCheckedBox = checked => {
		this.setState({
			isChecked: checked,
		});
	};

	editProfile = () => {
		let context = this;
		this.setState({
			qualificationerror: '',
			qualicompletedyearerror: '',
			dbserror: '',
			currentcompanycontacterror: '',
			currentcompanynameerror: '',
			uploadEvidanceError: '',
			uploadCurrentCompanyEvidanceError: '',
			lastemployernameerror: '',
			lastemployercontacterror: '',
			lastemployerdetailsError: '',
			dbserror: '',
			question1error: '',
			question2error: '',
			qualidocserror: '',
			salaryerror: '',
			lastappraisalerror: '',
			isItNegotiableError: '',
			eppdocError: '',
			traningdocsError: '',
			lastappraisaldocerror: '',
			refereeserror: '',
			name1error: '',
			contact1error: '',
			email1error: '',
			designation1error: '',
			address1error: '',
			name2error: '',
			email2error: '',
			contact2error: '',
			designation2error: '',
			address2error: '',
			name3error: '',
			contact3error: '',
			email3error: '',
			designation3error: '',
			address3error: ''
		});

		let { mainQualification,
			qualicompletedyear,
			mainQualCert,
			full_time, current_emp,
			current_emp_contact,
			current_emp_cert,
			current_emp_certAgain,
			last_employer_name,
			last_employer_contact,
			last_employer_doc,
			last_appraisal_date,
			last_appraisal_evidence,
			occupational_health_doc,
			dbscheckdetail,
			referees1,
			referees2,
			referees3,
			name1,
			contact1,
			email1,
			designation1,
			address1,
			dbs_check,
			name2,
			contact2,
			email2,
			designation2,
			address2,
			name3,
			contact3,
			email3,
			designation3,
			address3,
			salary,
			phone_number1,
			phone_number2,
			phone_number3,
			last_appraisal_evidenceAgain,
			mainQualCertAgain,
			q1,
			q2,
			last_employer_docAgain,
			occupational_health_doc_Again,
			yearofcompletion2,
			qualification2,
			cert2,
			yearofcompletion1,
			qualification1,
			cert1,
			yearofcompletion3,
			qualification3,
			cert3,
			is_negotiable } = this.state;
			let {navigation} = this.props;
		console.log("this.props", this.props);

		if (!mainQualification) {
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
		if (!mainQualCert) {
			this.setState({ qualidocserror: 'Please attach one document' });
			Toast.show({
				text: 'Please attach one document',
				buttonText: 'Okay',
				type: 'danger',
			});
			return;
		}

		if (full_time) {
			if (current_emp == 0) {
				this.setState({ currentcompanynameerror: 'Please enter hospital name' });
				Toast.show({
					text: 'Please enter hospital name',
					buttonText: 'Okay',
					type: 'danger',
				});
				return;
			}
			if (current_emp.length > 0 && !Regex.validateString(current_emp)) {
				this.setState({ currentcompanynameerror: 'Please enter a valid hospital name' });
				Toast.show({
					text: 'Please enter a valid hospital name',
					buttonText: 'Okay',
					type: 'danger',
				});
				return;
			}
			if (current_emp_contact.length == 0) {
				this.setState({ currentcompanycontacterror: 'Please enter contact number' });
				Toast.show({
					text: 'Please enter contact number',
					buttonText: 'Okay',
					type: 'danger',
				});
				return;
			}
			if (!Regex.validateMobileWithEleventDigit(current_emp_contact)) {
				this.setState({ currentcompanycontacterror: 'Please enter a valid contact number' });
				Toast.show({
					text: 'Please enter a valid contact number',
					buttonText: 'Okay',
					type: 'danger',
				});
				return;
			}

			if (!current_emp_cert && !current_emp_certAgain.hasOwnProperty('uri')) {
				this.setState({ uploadCurrentCompanyEvidanceError: 'Please attach one document' });
				Toast.show({
					text: 'Please attach one document',
					buttonText: 'Okay',
					type: 'danger',
				});
				return;
			}
		}
		else {
			if (last_employer_name.length == 0) {
				this.setState({ lastemployernameerror: 'Please enter Employer Name' });
				Toast.show({
					text: 'Please enter Employer Name',
					buttonText: 'Okay',
					type: 'danger',
				});
				return;
			}

			if (last_employer_name.length > 0 && !Regex.validateString(last_employer_name)) {
				this.setState({ lastemployernameerror: 'Please enter a valid Employer Name' });
				Toast.show({
					text: 'Please enter a valid Employer Name',
					buttonText: 'Okay',
					type: 'danger',
				});
				return;
			}

			if (last_employer_contact.length == 0) {
				this.setState({ lastemployercontacterror: 'Please enter contact number' });
				Toast.show({
					text: 'Please enter contact number',
					buttonText: 'Okay',
					type: 'danger',
				});
				return;
			}
			if (!Regex.validateMobileWithEleventDigit(last_employer_contact)) {
				this.setState({ lastemployercontacterror: 'Please enter a valid contact number' });
				Toast.show({
					text: 'Please enter a valid contact number',
					buttonText: 'Okay',
					type: 'danger',
				});
				return;
			}

			if (!last_employer_doc && !last_employer_docAgain.hasOwnProperty('uri')) {
				this.setState({ lastemployerdetailsError: 'Please attach one document' });
				Toast.show({
					text: 'Please attach one document',
					buttonText: 'Okay',
					type: 'danger',
				});
				return;
			}
		}

		if (!last_appraisal_date) {
			this.setState({ lastappraisalerror: 'Please select your Last Appraisel' });

			Toast.show({
				text: 'Please select your Last Appraisel',
				buttonText: 'Okay',
				type: 'danger',
			});
			return;
		}

		console.log('last_appraisal_evidence', last_appraisal_evidence, last_appraisal_evidenceAgain)
		if (!last_appraisal_evidence && !last_appraisal_evidenceAgain.hasOwnProperty('uri')) {
			this.setState({ lastappraisaldocerror: 'Please attach one document' });
			Toast.show({
				text: 'Please attach one document',
				buttonText: 'Okay',
				type: 'danger',
			});
			return;
		}

		if (!occupational_health_doc && !occupational_health_doc_Again.hasOwnProperty('uri')) {
			this.setState({ eppdocError: 'Please attach one document' });
			Toast.show({
				text: 'Please attach one document',
				buttonText: 'Okay',
				type: 'danger',
			});
			return;
		}
		//pending
		// if (traningdocs.length == 0) { 
		// 	this.setState({ traningdocsError: 'Please attach one document' });
		// 	Toast.show({
		// 		text: 'Please attach one document',
		// 		buttonText: 'Okay',
		// 		type: 'danger',
		// 	});
		// 	return;
		// }

		if (dbscheckdetail === null) {
			this.setState({ dbserror: 'Please verify dbs check details' });
			Toast.show({
				text: 'Please verify dbs check details',
				buttonText: 'Okay',
				type: 'danger',
			});
			return;
		}

		if (!((referees1 && referees2) || (referees2 && referees3) || (referees3 && referees1))) {
			this.setState({ refereeserror: 'Please selcet atleast two referees' });
			Toast.show({
				text: 'Please selcet atleast two referees',
				buttonText: 'Okay',
				type: 'danger',
			});
			return;
		}
		if (referees1) {

			if (name1.length == 0) {
				this.setState({ name1error: 'Please enter Refree1 Name' });
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

			if (phone_number1.length == 0) {
				this.setState({ contact1error: 'Please enter Referee1 contact number' });
				Toast.show({
					text: 'Please enter Referee1 contact number',
					buttonText: 'Okay',
					type: 'danger',
				});
				return;
			}
			if (!Regex.validateMobileWithEleventDigit(phone_number1)) {
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
				this.setState({ designation1error: 'Please enter Refree1 Designation' });
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
				this.setState({ address1error: 'Please enter Refree1 Address' });
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

		if (referees2) {

			if (name2.length == 0) {
				this.setState({ name2error: 'Please enter Refree2 Name' });
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

			if (phone_number2.length == 0) {
				this.setState({ contact2error: 'Please enter Referee2 contact number' });
				Toast.show({
					text: 'Please enter Referee2 contact number',
					buttonText: 'Okay',
					type: 'danger',
				});
				return;
			}
			if (!Regex.validateMobileWithEleventDigit(phone_number2)) {
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
				this.setState({ designation2error: 'Please enter Refree2 Designation' });
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
				this.setState({ address2error: 'Please enter Refree2 Address' });
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

		if (referees3) {

			if (name3.length == 0) {
				this.setState({ name3error: 'Please enter Refree3 Name' });
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

			if (phone_number3.length == 0) {
				this.setState({ contact3error: 'Please enter Referee3 contact number' });
				Toast.show({
					text: 'Please enter Referee3 contact number',
					buttonText: 'Okay',
					type: 'danger',
				});
				return;
			}
			if (!Regex.validateMobileWithEleventDigit(phone_number3)) {
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
				this.setState({ designation3error: 'Please enter Refree3 Designation' });
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
				this.setState({ address3error: 'Please enter Refree3 Address' });
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


		console.log("salaryiiioioioioioioioioioio", salary)
		if (salary === '' || salary === null) {
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
		if (is_negotiable === null) {
			this.setState({ isItNegotiableError: 'Please enter a valid salary' });
			Toast.show({
				text: 'is salary is negotiatable?',
				buttonText: 'Okay',
				type: 'danger',
			});
			return;
		}

		if (q1 === null) {
			this.setState({ question1error: 'Please answer the question' });
			Toast.show({
				text: 'Please answer the question',
				buttonText: 'Okay',
				type: 'danger',
			});
			return;
		}

		if (q2 === null) {
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
		formdata.append('api_token', this.props.token);
		// formdata.append('qualicompletedyear', qualicompletedyear);
		// formdata.append('qualification_id', qualification.id);
		// formdata.append('qualification_doc', qualification_doc);
		formdata.append('full_time', full_time ? 1 : 2);

		if (full_time ==1) {

			formdata.append('current_emp', current_emp);
			formdata.append('current_emp_contact', current_emp_contact);
			console.log('current_emp_certAgain', current_emp_certAgain)
			if (current_emp_certAgain.hasOwnProperty('uri')) {
				formdata.append('current_company_doc', current_emp_certAgain);
			}
		} else {
			formdata.append('last_employer_name', last_employer_name);
			formdata.append('last_employer_contact', last_employer_contact);
			if (last_employer_docAgain.hasOwnProperty('uri')) {
				formdata.append('last_employer_doc', last_employer_docAgain);
			}
		}
		formdata.append('last_appraisal_date', last_appraisal_date);

		if (last_appraisal_evidenceAgain.hasOwnProperty('uri')) {
			formdata.append('last_appraisal_evidence', last_appraisal_evidenceAgain);
		}

		if (occupational_health_doc_Again.hasOwnProperty('uri')) {
			formdata.append('occupational_health_doc', occupational_health_doc_Again);
		}
		let qualidocsDummy = [];
		console.log("qualicompletedyear", qualicompletedyear,mainQualCertAgain)
		// qualidocs.push({qualification: qualification.id == '1' ? 'MBBS' : 'Others',yearofcompletion: qualicompletedyear,cert : qualification_doc})
		
		if(mainQualCertAgain.hasOwnProperty('uri')){
			qualidocsDummy = [{ qualification: mainQualification, yearofcompletion: qualicompletedyear, cert: mainQualCertAgain }]
		 }else{
			qualidocsDummy = [{ qualification: mainQualification, yearofcompletion: qualicompletedyear }]
		 }	

		// qualidocsDummy = [...qualidocs, { qualification: mainQualification, yearofcompletion: qualicompletedyear, cert: mainQualCertAgain }]
		console.log('qualidocs', qualidocsDummy)
		if (yearofcompletion2 !== '') {
			if (cert2.hasOwnProperty('uri')) {
				qualidocsDummy.push({
					qualification: qualification2,
					yearofcompletion: yearofcompletion2,
					cert: cert2,
				})
			} else {
				qualidocsDummy.push({
					qualification: qualification2,
					yearofcompletion: yearofcompletion2,
				})
			}
		}
		if (yearofcompletion1 !== '') {
			if (cert1.hasOwnProperty('uri')) {
				qualidocsDummy.push({
					qualification: qualification1,
					yearofcompletion: yearofcompletion1,
					cert: cert1,
				})
			} else {
				qualidocsDummy.push({
					qualification: qualification1,
					yearofcompletion: yearofcompletion1,
				})
			}
		}
		if (yearofcompletion3 !== '') {
			if (cert3.hasOwnProperty('uri')) {
				qualidocsDummy.push({
					qualification: qualification3,
					yearofcompletion: yearofcompletion3,
					cert: cert3,
				})
			} else {
				qualidocsDummy.push({
					qualification: qualification3,
					yearofcompletion: yearofcompletion3,
				})
			}
		}
		// formdata.append(qualification.id == '1' ? 'MBBS' : 'Others', {qualification: qualification.id == '1' ? 'MBBS' : 'Others',yearofcompletion: qualicompletedyear,cert : qualification_doc});
		formdata.append('qualificationarray', JSON.stringify(qualidocsDummy));
		formdata.append('salary', salary);
		if (qualidocsDummy.length > 0) {
			qualidocsDummy.map(item => {
				console.log('item', item)
				if(item && item.cert){
					formdata.append(item.qualification, item.cert);
				}
			});
		}

		let traningdocs = []
		trainingcourses.map((item, i) => {
			let index = i + 1;

			if (context.state['traingDoc' + index].hasOwnProperty('uri')) {
				formdata.append(item.id, context.state['traingDoc' + index]);
				traningdocs.push({ c_name: item.name, id: item.id, value: context.state['traingDoc' + index] })
			}
		})

		formdata.append('traningdocs', JSON.stringify(traningdocs));

		// formdata.append('traningdocs', JSON.stringify(traningdocs));
		// console.log('traningdocs', traningdocs)
		// if (traningdocs.length > 0) {
		// 	traningdocs.map(item => {
		// 		formdata.append(item.id, item.value);
		// 	});
		// }

		formdata.append('dbs_check', dbs_check);
		let refressdata = [];
		if (referees1) {
			refressdata.push({
				candidate_id: this.props.userdata.doctor.id,
				refree_type: 1,
				name: name1,
				phone_number: phone_number1,
				email: email1,
				designation: designation1,
				address: address1
			})
		}
		if (referees2) {
			refressdata.push({
				candidate_id: this.props.userdata.doctor.id,
				refree_type: 2,
				name: name2,
				phone_number: phone_number2,
				email: email2,
				designation: designation2,
				address: address2
			})
		}
		if (referees3) {
			refressdata.push({
				candidate_id: this.props.userdata.doctor.id,
				refree_type: 3,
				name: name3,
				phone_number: phone_number3,
				email: email3,
				designation: designation3,
				address: address3
			})
		}
		console.log('refressdata', refressdata)
		formdata.append('Refrees', JSON.stringify(refressdata));

		formdata.append('q1', q1);
		formdata.append('q2', q2);
		formdata.append('is_negotiable', is_negotiable);
		console.log(formdata, 'formdtata====<>');
		context.setState({ visible: true });
		//	apis/saveStructuralData

		RestClient.imageUpload('/apis/saveStructuralData', {}, formdata).then(response => {
			context.setState({ visible: false });
			console.log('resposneresposneresposneresposneresposne', response);
			if (response.status === 200) {
				toast({ text: response.message });
				navigation.pop();
			} else if (response.status === 401) {
				toast({ text: response.message });
			}
		}).catch((error) => {
			console.log("errorerrrororororo", error)
			context.setState({ visible: false });
		});


		//navigate('SignupupFormfive');
	};
	_handleFocusNextField = nextField => {
		this.refs[nextField].focus();
	};


	render() {
		let context = this;
		const {
			navigation: { navigate },
			SignupUpdate,
			currentcompanydoc,
			currentcompanyname,
			currentcompanycontact,
		} = this.props;
		let { certificates, Qualifications, mainQualCert, full_time, current_emp,
			current_emp_cert,
			current_emp_contact,
			last_employer_name,
			last_employer_contact,
			last_appraisal_date,
			last_appraisal_evidence,
			last_employer_doc,
			occupational_health_doc,
			salary,
			is_negotiable,
			dbs_check,
			refree_type1,
			refree_type2,
			refree_type3,
			phone_number1,
			phone_number2,
			phone_number3,
			name1,
			name2,
			name3,
			email1,
			email2,
			email3,
			designation1,
			designation2,
			designation3,
			referees1,
			referees2,
			referees3,
			address1,
			address2,
			address3,
			q1,
			q2,
			cert1Url,
			cert2Url,
			cert3Url,
			mainQualification,
			disable
		} = this.state;
		console.log('salarysalarysalarysalarysalary', salary)
		return (
			<View style={{ flex: 1, backgroundColor: '#fff' }}>
				<KeyboardAwareScrollView
					extraHeight={moderateScale(200)}
					enableResetScrollToCoords={false}
					style={{
						flex: 1,
						backgroundColor: '#fff',
						paddingHorizontal: scale(10),
					}}
				>
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
								onPress={() => { context.setState({ EditMore: true }) }}
							>
								<Text
									style={{
										fontFamily: fonts.fontPrimaryLight,
										fontSize: normalize(10),
										color: '#02B2FE',
									}}
								>
									Edit More
								</Text>
							</TouchableOpacity>
						</View>

						<Dropdown
							error={this.state.qualificationerror}
							label={'Undergraduate'}
							data={qualificationlist}
							disabled={disable}
							fontSize={15}
							pickerStyle={{
								borderWidth: 1,
								borderColor: '#666666',
								borderRadius: 5,
							}}
							value={mainQualification}
							itemTextStyle={[
								{
									fontSize: 16,
									fontFamily: fonts.fontPrimaryLight,
								},
							]}
							onChangeText={(value, index) => {
								console.log(value, index)
								this.setState({
									mainQualification: value
								})
							}}
						/>

						<View style={{ marginVertical: verticalScale(5) }}>
							<Text style={{ opacity: 0.7 }}>Year of completion</Text>
							<DatePickerComponent
							    disabled={disable}
								dob={this.state.qualicompletedyear}
								onDateChange={date => {
									context.setState({ qualicompletedyear: date })
								}
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
						     	disabled={disable}
								docurl={Qualifications + mainQualCert}
								documentSelected={res => {
									context.setState({mainQualCertAgain: res})
								}
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
								selected={full_time === 1}
								onPress={() => {!disable && this.setState({ full_time: 1 })}}
								label="Yes"
							/>
							<Genderfield
								selected={full_time === 0}
								onPress={() => {!disable &&this.setState({ full_time: 0 })}}
								label="No"
							/>
						</View>
					</View>
					{this.state.full_time ? <View style={{ flex: 0.5, marginHorizontal: scale(10) }}>
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
								value={current_emp}
								disabled={disable}
								defaultValue={''}
								keyboardType="default"
								autoCapitalize="sentences"
								autoCorrect={false}
								enablesReturnKeyAutomatically={true}
								onFocus={this.onFocus}
								onChangeText={text => {
									context.setState({ current_emp: text });
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
								value={current_emp_contact}
								defaultValue={''}
								disabled={disable}
								keyboardType="numeric"
								autoCapitalize="sentences"
								autoCorrect={false}
								returnKeyType="done"
								enablesReturnKeyAutomatically={true}
								onFocus={this.onFocus}
								onChangeText={text => {
									context.setState({ current_emp_contact: text })
								}}
								//onSubmitEditing={this._handleFocusNextField.bind(this, 'Surname')}
								returnKeyType="next"
								label="Contact Number"
								error={this.state.currentcompanycontacterror}
								tintColor={'#02B2FE'}
							/>
							{full_time ? <Accordion Header="Upload evidence">
								<DocumentUploader
							    	disabled={disable}
									docurl={current_emp_cert ? certificates + current_emp_cert : ''}
									documentSelected={res => {
										console.log('itsssssss working')
										context.setState({ current_emp_certAgain: res })
									}
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
								{this.state.uploadCurrentCompanyEvidanceError}
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
									value={last_employer_name}
									defaultValue={''}
									disabled={disable}
									keyboardType="default"
									autoCapitalize="sentences"
									autoCorrect={false}
									enablesReturnKeyAutomatically={true}
									onFocus={this.onFocus}
									onChangeText={text => {
										context.setState({ last_employer_name: text })
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
									value={last_employer_contact}
									defaultValue={''}
									keyboardType="numeric"
									disabled={disable}
									returnKeyType="done"
									autoCapitalize="sentences"
									autoCorrect={false}
									enablesReturnKeyAutomatically={true}
									onFocus={this.onFocus}
									onChangeText={text => {
										context.setState({ last_employer_contact: text })
									}}
									//onSubmitEditing={this._handleFocusNextField.bind(this, 'Surname')}
									returnKeyType="next"
									label="Contact Number"
									error={this.state.lastemployercontacterror}
									tintColor={'#02B2FE'}
								/>

								{!full_time ? <View><Accordion Header="Upload evidence">
									<DocumentUploader
                                        disabled={disable}
										docurl={last_employer_doc ? certificates + last_employer_doc : ''}
										documentSelected={res =>
											context.setState({ last_employer_docAgain: res })
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
								   disabled={disable}
									dob={last_appraisal_date}
									onDateChange={date => context.setState({ last_appraisal_date: date })}
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
							<DocumentUploader
						     	disabled={disable}
								docurl={certificates + last_appraisal_evidence}
								documentSelected={res =>
									context.setState({ last_appraisal_evidenceAgain: res })
								} />
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
							<DocumentUploader
							    disabled={disable}
								docurl={certificates + occupational_health_doc}
								documentSelected={res =>
									context.setState({ occupational_health_doc_Again: res })
								} />
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
								{trainingcourses.map((item, i) => {
									let index = i + 1;
									console.log('trainingcourses')
									return (
										<Accordion Header={item.name}>
											<DocumentUploader
											     disabled={disable}
												docurl={this.state['traingDocUrl' + index] != '' && this.state['traingDocUrl' + index] !== undefined && this.state['traingDocUrl' + index]._joinData && this.state['traingDocUrl' + index]._joinData.cert ? certificates + this.state['traingDocUrl' + index]._joinData.cert : ''}
												documentSelected={res => {
													context.setState({ ['traingDoc' + index]: res })
												}
													// SignupUpdate({
													// 	prop: 'traningdocs',
													// 	value: [
													// 		...this.props.traningdocs,
													// 		{ c_name: item.name, id: item.id, value: res },
													// 	],
													// })
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
							value={salary.toString()}
							disabled={disable}
							keyboardType="numeric"
							autoCapitalize="sentences"
							autoCorrect={false}
							returnKeyType="done"
							enablesReturnKeyAutomatically={true}
							onFocus={this.onFocus}
							onChangeText={text => {
								context.setState({ salary: text })
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
									selected={is_negotiable === true}
									onPress={() => {!disable && context.setState({ is_negotiable: true })}}
									label="Yes"
								/>
								<Genderfield
									selected={is_negotiable === false}
									onPress={() => {!disable && context.setState({ is_negotiable: false })}}
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
									selected={dbs_check == 1}
									onPress={() => {!disable && context.setState({ dbs_check: 1 })}}
									label="Yes"
								/>
								<GenderfieldLong
									selected={dbs_check == 0}
									onPress={() => {!disable && context.setState({ dbs_check: 0 })}}
									label="No"
								/>
								<GenderfieldLong
									selected={dbs_check == 2}
									onPress={() => {!disable && context.setState({ dbs_check: 2 })}}
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
							<View style={{ flex: 0.8, marginTop: verticalScale(10), flexDirection: 'row', marginBottom: verticalScale(10) }}>
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
									containerStyle={{ flexDirection: 'column', alignItems: 'center' }}
									checkboxStyle={{
										width: moderateScale(25),
										height: moderateScale(25),
									}}
									checked={referees1}
									onChange={checked => {!disable && context.setState({ referees1: !referees1 })}}
								/>
								<CheckBox
									label="Past Employer"
									labelStyle={{
										fontFamily: fonts.fontPrimaryLight,
										fontSize: normalize(10),
										color: '#000000',
										opacity: 0.8,
									}}
									containerStyle={{ flexDirection: 'column', alignItems: 'center' }}
									checkboxStyle={{
										width: moderateScale(25),
										height: moderateScale(25),
									}}
									checked={referees2}
									onChange={checked => {!disable && context.setState({ referees2: !referees2 })}}
								/>
								<CheckBox
									label="Professional Known"
									labelStyle={{
										fontFamily: fonts.fontPrimaryLight,
										fontSize: normalize(10),
										color: '#000000',
										opacity: 0.8,
									}}
									containerStyle={{ flexDirection: 'column', alignItems: 'center' }}
									checkboxStyle={{
										width: moderateScale(25),
										height: moderateScale(25),
									}}
									checked={referees3}
									onChange={checked => {!disable && context.setState({ referees3: !referees3 })}}
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


					{referees1 && <View style={{ flex: 0.5, marginHorizontal: scale(10) }}>
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
								value={name1}
								defaultValue={''}
								disabled={disable}
								keyboardType="default"
								autoCapitalize="sentences"
								autoCorrect={false}
								enablesReturnKeyAutomatically={true}
								onFocus={this.onFocus}
								onChangeText={text => {
									context.setState({ name1: text })

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
								value={phone_number1}
								defaultValue={''}
								keyboardType="numeric"
								disabled={disable}
								autoCapitalize="sentences"
								autoCorrect={false}
								onSubmitEditing={this._handleFocusNextField.bind(this, 'email1')}
								returnKeyType="done"
								enablesReturnKeyAutomatically={true}
								onFocus={this.onFocus}
								onChangeText={text => {
									context.setState({
										phone_number1: text
									})
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
								value={email1}
								defaultValue={''}
								keyboardType="email-address"
								disabled={disable}
								autoCapitalize="none"
								autoCorrect={false}
								enablesReturnKeyAutomatically={true}
								onFocus={this.onFocus}
								onChangeText={text => {
									context.setState({ email1: text })
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
								value={designation1}
								defaultValue={''}
								disabled={disable}
								keyboardType="default"
								autoCapitalize="sentences"
								autoCorrect={false}
								returnKeyType="done"
								enablesReturnKeyAutomatically={true}
								onFocus={this.onFocus}
								onChangeText={text => {
									context.setState({ designation1: text })
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
								value={address1}
								defaultValue={''}
								disabled={disable}
								keyboardType="default"
								autoCapitalize="sentences"
								autoCorrect={false}
								returnKeyType="done"
								enablesReturnKeyAutomatically={true}
								onFocus={this.onFocus}
								onChangeText={text => {
									context.setState({ address1: text })
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

					{referees2 && <View style={{ flex: 0.5, marginHorizontal: scale(10) }}>
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
								value={name2}
								defaultValue={''}
								keyboardType="default"
								autoCapitalize="sentences"
								disabled={disable}
								autoCorrect={false}
								enablesReturnKeyAutomatically={true}
								onFocus={this.onFocus}
								onChangeText={text => {
									context.setState({ name2: text })
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
								value={phone_number2}
								defaultValue={''}
								keyboardType="numeric"
								disabled={disable}
								autoCapitalize="sentences"
								autoCorrect={false}
								returnKeyType="done"
								enablesReturnKeyAutomatically={true}
								onFocus={this.onFocus}
								onChangeText={text => {
									context.setState({ phone_number2: text })
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
								value={email2}
								defaultValue={''}
								disabled={disable}
								keyboardType="email-address"
								autoCapitalize="none"
								autoCorrect={false}
								enablesReturnKeyAutomatically={true}
								onFocus={this.onFocus}
								onChangeText={text => {
									context.setState({ email2: text })
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
								value={designation2}
								disabled={disable}
								defaultValue={''}
								keyboardType="default"
								autoCapitalize="sentences"
								autoCorrect={false}
								returnKeyType="done"
								enablesReturnKeyAutomatically={true}
								onFocus={this.onFocus}
								onChangeText={text => {
									context.setState({ designation2: text })
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
								value={address2}
								disabled={disable}
								defaultValue={''}
								keyboardType="default"
								autoCapitalize="sentences"
								autoCorrect={false}
								returnKeyType="done"
								enablesReturnKeyAutomatically={true}
								onFocus={this.onFocus}
								onChangeText={text => {
									context.setState({ address2: text })
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
					{referees3 && <View style={{ flex: 0.5, marginHorizontal: scale(10) }}>
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
								value={name3}
								defaultValue={''}
								disabled={disable}
								keyboardType="default"
								autoCapitalize="sentences"
								autoCorrect={false}
								enablesReturnKeyAutomatically={true}
								onFocus={this.onFocus}
								onChangeText={text => {
									context.setState({ name3: text })
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
								defaultValue={''}
								value={phone_number3?phone_number3 : ''}
								disabled={disable}
								keyboardType="numeric"
								autoCapitalize="sentences"
								autoCorrect={false}
								returnKeyType="done"
								enablesReturnKeyAutomatically={true}
								onFocus={this.onFocus}
								onChangeText={text => {
									context.setState({ phone_number3: text })
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
								value={email3}
								defaultValue={''}
								disabled={disable}
								keyboardType="email-address"
								autoCapitalize="none"
								autoCorrect={false}
								enablesReturnKeyAutomatically={true}
								onFocus={this.onFocus}
								onChangeText={text => {
									context.setState({ email3: text })
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
								value={designation3}
								defaultValue={''}
								keyboardType="default"
								disabled={disable}
								autoCapitalize="sentences"
								autoCorrect={false}
								returnKeyType="done"
								enablesReturnKeyAutomatically={true}
								onFocus={this.onFocus}
								onChangeText={text => {
									context.setState({ designation3: text })
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
								value={address3}
								defaultValue={''}
								keyboardType="default"
								disabled={disable}
								autoCapitalize="sentences"
								autoCorrect={false}
								returnKeyType="done"
								enablesReturnKeyAutomatically={true}
								onFocus={this.onFocus}
								onChangeText={text => {
									context.setState({ address3: text })
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
								selected={q1 === true}
								onPress={() => {!disable && context.setState({ q1: true })}}
								label="Yes"
							/>
							<Genderfield
								selected={q1 === false}
								onPress={() => {!disable && context.setState({ q1: false })}}
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
								selected={q2 === true}
								onPress={() => {!disable && context.setState({ q2: true })}}
								label="Yes"
							/>
							<Genderfield
								selected={q2 === false}
								onPress={() => {!disable && context.setState({ q2: false })}}
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
					{!disable && <View
						style={{
							flex: 0.2,
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<Button
							label={'EDIT'}
							disabled={false}
							onPress={this.editProfile}
							styles={{
								button: {
									height: verticalScale(50),
									width: width - 70,
									alignItems: 'center',
									justifyContent: 'center',
									borderRadius: 5,
									paddingLeft: 15,
									paddingRight: 15,
									borderRadius: 50,
									marginVertical: verticalScale(40),
								},

								label: [
									{
										fontSize: normalize(16),
										color: '#FFFFFF',
										letterSpacing: 5,
									},
								],
							}}
						/>
					</View>}
					<View style={{ width, height: 180 }} />
				</KeyboardAwareScrollView>
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

				{this.state.EditMore && (
					<Modal
						backdrop={false}
						isOpen={this.state.EditMore}
						onClosed={() => this.setState({ EditMore: false })}
						style={{
							flex: 1,
							backgroundColor: 'transparent',
							alignItems: 'center',
							justifyContent: 'center',
						}}
						position={'center'}
					><View style={{ flex: 1 }}>
							<TouchableOpacity style={{
								flex: 1, zIndex: 1, position: 'absolute',
								right: moderateScale(4),
								top: verticalScale(30), height: verticalScale(60), width: moderateScale(60), justifyContent: 'center', alignItems: 'center'
							}} onPress={() => { this.setState({ EditMore: false }) }}>
								<Image source={require('../../images/Group51.png')} style={{ width: 15, height: 15 }} />
							</TouchableOpacity>
							<ScrollView style={{ padding: 10, paddingTop: verticalScale(25), backgroundColor: 'white' }}>

								{!(mainQualification === 'MBBS') && <Accordion expanded Header="MBBS Qualification document">
									<Text style={{ opacity: 0.7, marginBottom: 15 }}>Year of completion</Text>
									<DatePickerComponent 
									 disabled={disable}
									dob={this.state.yearofcompletion2} 
									onDateChange={date => this.setState({ yearofcompletion2: date })} />
									<DocumentUploader
									   disabled={disable}
										styles={{ marginBottom: 10, height: verticalScale(120) }}
										docurl={cert1Url ? Qualifications + cert1Url : ''}
										documentSelected={res => {
											this.setState({
												qualification1: 'MBBS',
												yearofcompletion1: this.state.yearofcompletion2,
												cert1: res,
											})
										}
										}
									/>
									<View style={{ width, height: 20 }} />
								</Accordion>}
								<Accordion expanded Header="MB ChB Qualification document">
									<Text style={{ opacity: 0.7, marginBottom: 15 }}>Year of completion</Text>
									<DatePickerComponent 
									disabled={disable}
									dob={this.state.yearofcompletion2} 
									onDateChange={date => this.setState({ yearofcompletion2: date })} />
									<DocumentUploader
									disabled={disable}
										styles={{ marginBottom: 10, height: verticalScale(120) }}
										docurl={cert2Url ? Qualifications + cert2Url : ''}
										documentSelected={res => {
											this.setState({
												qualification2: 'MBChB',
												yearofcompletion2: this.state.yearofcompletion2,
												cert2: res,
											})
										}
											// SignupUpdate({
											// 	prop: 'qualidocs',
											// 	value: [
											// 		...this.props.qualidocs,
											// 		{
											// 			qualification: 'MBChB',
											// 			yearofcompletion: this.state.doc2,
											// 			cert: res,
											// 		},
											// 	],
											// })
										}
									/>
									<View style={{ width, height: 20 }} />
								</Accordion>
								<Accordion expanded Header="Other Qualification document">
									<Text style={{ opacity: 0.7, marginBottom: 15 }}>Year of completion</Text>
									<DatePickerComponent
									disabled={disable}
									dob={this.state.yearofcompletion3} onDateChange={date => this.setState({ yearofcompletion3: date })} />
									<DocumentUploader
										disabled={disable}
										styles={{ marginBottom: 10, height: verticalScale(120) }}
										docurl={cert3Url ? Qualifications + cert3Url : ''}
										documentSelected={res => {
											this.setState({
												qualification3: 'Other2',
												yearofcompletion3: this.state.yearofcompletion3,
												cert3: res,
											})
										}
										}
									/>
									<View style={{ width, height: 20 }} />
								</Accordion>
							</ScrollView>
						</View>
					</Modal>
				)}</View>
		);
	}
}

const mapStateToProps = ({ SignupReducer, Loginreducer }) => {
	const { userid, token, userdata } = Loginreducer;

	return {
		userid, token, userdata
	};
};

export default connect(
	mapStateToProps,
	{ registraion, SignupUpdate }
)(EditStructureprofile);
