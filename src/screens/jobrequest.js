
import React, { Component } from 'react';
import { View, TouchableOpacity, FlatList, Image, Dimensions, Platform,ActivityIndicator } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { HeaderTitle } from '../components/HeaderTitle';

import { Card, CardItem, Text, Icon, Right, Content } from 'native-base';
import { scale, verticalScale, fonts, moderateScale } from '../config';
import { normalize } from 'react-native-elements';

import EIcon from 'react-native-vector-icons/EvilIcons';
import ENIcon from 'react-native-vector-icons/Entypo';
const { height, width } = Dimensions.get('window');
import { Dropdown } from 'react-native-material-dropdown';
import moment from 'moment';
import { JobRequest,acceptInvite,rejectInvite,JobRequestDetail } from '../actions/JobRequestActions';
import { connect } from 'react-redux';
import idx from '../utils/Idx';
import Modal from 'react-native-modalbox';
import Button from '../components/button';
import { capitalizeFirstLetter, leftPad } from '../utils';
import Connection from '../config/connection';

// const datavalues = [
// 	{
// 		id: '#99523466',
// 		name: 'British Healthcare',
// 		status: 1,
// 		amount: 250,
// 		time: new Date(),
// 		imageurl: require('../images/hospital1.png'),
// 	},
// 	{
// 		id: '#99523466',
// 		name: 'British Healthcare',
// 		status: 1,
// 		amount: 250,
// 		time: new Date(),
// 		imageurl: require('../images/hospital2.png'),
// 	},
// 	{
// 		id: '#99523466',
// 		name: 'British Healthcare',
// 		status: 2,
// 		amount: 250,
// 		time: new Date(),
// 		imageurl: require('../images/hospital3.png'),
// 	},
// 	{
// 		id: '#99523466',
// 		name: 'British Healthcare',
// 		status: 3,
// 		amount: 250,
// 		time: new Date(),
// 		imageurl: require('../images/hospital4.png'),
// 	},
// 	{
// 		id: '#99523466',
// 		name: 'British Healthcare',
// 		status: 2,
// 		amount: 250,
// 		time: new Date(),
// 		imageurl: require('../images/hospital5.png'),
// 	},
// 	{
// 		id: '#99523466',
// 		name: 'British Healthcare',
// 		status: 2,
// 		amount: 250,
// 		time: new Date(),
// 		imageurl: require('../images/hospital4.png'),
// 	},
// 	{
// 		id: '#99523466',
// 		name: 'British Healthcare',
// 		status: 2,
// 		amount: 250,
// 		time: new Date(),
// 		imageurl: require('../images/hospital5.png'),
// 	},
// 	{
// 		id: '#99523466',
// 		name: 'British Healthcare',
// 		status: 3,
// 		amount: 250,
// 		time: new Date(),
// 		imageurl: require('../images/hospital4.png'),
// 	},
// 	{
// 		id: '#99523466',
// 		name: 'British Healthcare',
// 		status: 2,
// 		amount: 250,
// 		time: new Date(),
// 		imageurl: require('../images/hospital5.png'),
// 	},
// ];

let options = [
	{
		value: 'All',
		id: 'all',
	},
	{
		value: 'Sent',
		id: 'sent',
	},
	{
		value: 'Interested',
		id: 'interested',
	},
	{
		value: 'Accepted',
		id: 'accepted',
	},
	{
		value: 'Rejected',
		id: 'rejected',
	},

];
 class Jobrequest extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: this.props.jobRequestData,
			isOpen : false,
			modalData : {},
			selectedFilter : 'all'
		};
		this.acceptInviteFromHospitlal = this.acceptInviteFromHospitlal.bind(this);
		this.rejectInviteFromHospitlal = this.rejectInviteFromHospitlal.bind(this);
		// this.willFocusSubscription = this.props.navigation.addListener('willFocus', () => {
		// 	fetch('https://facebook.github.io/react-native/movies.json')
		// 		.then(response => response.json())
		// 		.then(responseJson => {
		// 			console.log(responseJson.movies);
		// 		})
		// 		.catch(error => {
		// 			console.error(error);
		// 		});
		// });
	}
	componentDidMount(){
		const {navigation,token,userid} = this.props;
		console.log('this.propsssss',this.props)
		let body = {
			user_id: userid,
			api_token: token
		};

		this.props.JobRequest({ body });
	}

	iconname = status => {
		switch (status) {
			case 'sent':
				return 'exclamation';
			case 'interested':
				return 'check';
			case 'accepted':
				return 'check';
			 case 'rejected':
			 return 'circle-with-cross';
			default:
				return null;
		}
	};
	openModal = (item) => {
		let context = this;
		const {navigation,token,userid} = this.props;
		console.log('this.propsssss',item)
		let body = {
			user_id: userid,
			api_token: token,
			job_id : item.emergency_job_id
		};
   
		this.props.JobRequestDetail({ body },(JobData)=>{
	   console.log('JobDatadatadtad',JobData)
	   navigation.navigate('JobRequestDetail',{JobData,item})
		});



		// this.setState({isOpen : true,modalData :item})
	

	}
	/*
	accept the invite from hopital
	*/
	acceptInviteFromHospitlal(){
		let context = this;
		const {navigation,token,userid} = this.props;
		const {invite_key,emergency_job_id} = this.state.modalData;
		let body = {
			user_id: userid,
			api_token: token,
			job_id : emergency_job_id,
			invite_key
		};
		console.log("body",body)
		this.props.acceptInvite( body,()=>{
		    context.setState({isOpen : false})
		});
	}

	/*
	reject the invite from hospital
	*/

	rejectInviteFromHospitlal(){
		let context = this;
		const {navigation,token,userid} = this.props;
		const {invite_key,emergency_job_id} = this.state.modalData;
		let body = {
			user_id: userid,
			api_token: token,
			job_id : emergency_job_id,
			invite_key
		};
		console.log("body2",body)
		this.props.rejectInvite( body,()=>{
			console.log('its workinggggggggggg')
		    context.setState({isOpen : false})
		});
	}

	renderItem = ({ item }) => {
		console.log("itemmmm",item);
		let {emergency_job: {salary,distance,user_id,user: {id,first_name,last_name,profile_pic},modified},invite_status,emergency_job_id} = item;
		return (
			<TouchableOpacity
				style={{
					width,
					height: verticalScale(90),
					flexDirection: 'row',
					marginVertical: verticalScale(2),
					borderBottomWidth: Platform.OS == 'ios' ? 0.5 : 0.8,
					borderColor: '#666',
				}}
				onPress={()=>this.openModal(item)}
			>
				<View style={{ flex: 0.3, alignItems: 'center', justifyContent: 'center' }}>
				{this.renderAvatar(user_id,profile_pic)}

					{/* <Image source={require('../images/hospital4.png')} style={{ width: scale(60), height: verticalScale(68) }} /> */}
				</View>
				<View style={{ flex: 0.7 }}>
					<View style={{ flex: 0.4, flexDirection: 'row' }}>
						<View style={{ flex: 0.7, alignItems: 'flex-start', justifyContent: 'center' }}>
							<Text style={{ fontFamily: fonts.fontPrimaryLight, fontSize: normalize(18) }}>
								{first_name && capitalizeFirstLetter(first_name) }
								{" "}
								{last_name && capitalizeFirstLetter(last_name) }
							</Text>
						</View>
						
						<View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'flex-start' }}>
							<Text
								style={{
									fontFamily: fonts.fontPrimaryLight,
									opacity: 0.3,
									textAlign: 'left',
									fontSize: normalize(12),
									paddingRight: 30,
								}}
							>
								{moment(modified).isSame(new Date(), "day") ? moment(modified).format('hh: mm') : moment(modified).isSame(new Date()- 1, "day") ? 'Yesterday' : moment(modified).format('MMM DD')}
							</Text>
						</View>
					</View>
					<View style={{ flex: 0.3, flexDirection: 'row' }}>
						<View style={{ alignItems: 'flex-start', justifyContent: 'center' }}>
					
							<Text style={{ color: '#989898', fontFamily: fonts.fontPrimaryLight, fontSize: normalize(10) }}>
							   {/* Within {distance ? distance : 30} km range */}
							   {"Job Id #"} {emergency_job_id}
							</Text>
						</View>
					</View>

					<View
						style={{
							flex: 0.3,
							alignItems: 'center',
							justifyContent: 'space-between',
							flexDirection: 'row',
						}}
					>
						{invite_status === 'sent' && (
							<View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
								<EIcon
									name={this.iconname(invite_status)}
									size={16}
									color={'#CEBD2E'}
									style={{ marginTop: verticalScale(4), marginRight: verticalScale(5) }}
								/>
								<Text
									style={{
										fontFamily: fonts.fontPrimaryLight,
										fontSize: normalize(16),
										color: '#CEBD2E',
									}}
								>
									Pending
								</Text>
							</View>
						)}
						{invite_status === "interested" && (
							<View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
								<EIcon
									name={this.iconname(invite_status)}
									size={16}
									color={'#55CC55'}
									style={{ marginTop: verticalScale(4), marginRight: verticalScale(5) }}
								/>
								<Text
									style={{
										fontFamily: fonts.fontPrimaryLight,
										fontSize: normalize(16),
										color: '#55CC55',
									}}
								>
									Interested
								</Text>
							</View>
						)}
						{invite_status === "accepted" && (
							<View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
								<ENIcon
									name={this.iconname(invite_status)}
									size={16}
									color={'#FF7F50'}
									style={{ marginTop: verticalScale(4), marginRight: verticalScale(5) }}
								/>
								<Text
									style={{
										fontFamily: fonts.fontPrimaryLight,
										fontSize: normalize(16),
										color: '#FF7F50',
									}}
								>
									Accepted
								</Text>
							</View>
						)}
								{invite_status === "rejected" && (
							<View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
								<ENIcon
									name={this.iconname(invite_status)}
									size={16}
									color={'#FF6363'}
									style={{ marginTop: verticalScale(4), marginRight: verticalScale(5) }}
								/>
								<Text
									style={{
										fontFamily: fonts.fontPrimaryLight,
										fontSize: normalize(16),
										color: '#FF6363',
									}}
								>
									Declined
								</Text>
							</View>
						)}
						{/* <Text style={{ fontFamily: fonts.fontPrimaryLight, paddingRight: 30 }}>{salary}$</Text> */}
					</View>
				</View>
			</TouchableOpacity>
		);
	};
	dropdownselection = (value, index, data) => {
		console.log('value, index, data)',value, index, data[index].id)
		this.setState({ selectedFilter : data[index].id });
	};
	renderAvatar = (user_id,profile_pic) => {
		console.log(profile_pic, 'profile_pic');
		if (profile_pic) {
			return (
				<Image
					source={{ uri: Connection.getMedia(user_id,profile_pic)  }}
					style={{borderRadius: width*.08,  width: width*.16, height: width*.16 }}
					resizeMode="cover"
					resizeMethod='resize'
				/>
			);
		} else {
			return (
				<Image
					source={require('../images/hospital4.png')}
					style={{ width: scale(60), height: verticalScale(68) }}
					resizeMode="contain"
				/>
			);
		}
	};


	render() {
		let list = this.props.jobRequestData;
		let {selectedFilter} = this.state;
		console.log("selectedFilter",selectedFilter)
          if(selectedFilter !== 'all'){
			  console.log('loglog',selectedFilter)
			list = list.filter((data,i,thisdata)=>{
				return(data.invite_status == selectedFilter)
			})
		  }
		return (
			<View
				style={{
					flex: 1,
					backgroundColor: '#FFFFFF',
				}}
			>
				<View
					style={{
						height: verticalScale(55),
						width,
						paddingLeft: scale(15),
						paddingTop: verticalScale(8),
						backgroundColor: 'transparent',
						flexDirection: 'row',
					}}
				>
					<Text
						style={{
							color: '#000000',
							opacity: 0.84,
							fontFamily: fonts.fontPrimaryLight,
							fontSize: normalize(36),
						}}
					>
			    	Job Requests
					</Text>
				</View>
				<View
					style={{
						height: verticalScale(50),
						marginHorizontal: scale(15),
						marginBottom: verticalScale(23),
					}}
				>
					<Dropdown
						label="Select option"
						data={options}
						itemTextStyle={{ fontFamily: fonts.fontPrimaryLight }}
						onChangeText={this.dropdownselection}
					/>
				</View>
				<View style={{ flex: 1 }}>
					<FlatList
						style={{ flex: 1, marginTop: 18 }}
						showsVerticalScrollIndicator={false}
						data={list}
						ListEmptyComponent={() => 
							<Text style={{marginTop : verticalScale(150), textAlign : 'center'}}>No Job Request Found</Text>  
						}
						renderItem={this.renderItem}
						style={{ marginHorizontal: scale(10) }}
					/>
				</View>
			 <Modal
					onClosed={() => this.setState({ isOpen: false })}
					swipeToClose={false}
					style={{
						width: scale(300),
						height: verticalScale(380),
						alignItems: 'center',
						elevation: 1,
					    zIndex: 1, 
						paddingHorizontal: 0
					}}
					position={'center'}
					ref={'modal3'}
					isOpen={this.state.isOpen}
				>
					<View
						style={{
							width: 300,
							height: 40,
							alignItems: 'flex-end',
							justifyContent: 'center',
							marginRight: 0,
							marginTop: 0
						}}
					>
						<EIcon onPress={() => this.setState({ isOpen: false })} name="close" size={30} color="black" />
					</View>
					<View style={{
						flexDirection : 'row',

					}}>
					<View style={{ flex: 0.3, alignItems: 'center', justifyContent: 'center' }}>
					   <Image source={require('../images/hospital4.png')} style={{ width: moderateScale(50), height: moderateScale(50) }} />
				   </View>
					  <View  style={{ flex: 0.7 }} > 	  
						<Text
							style={{
								textAlign: 'center',
								marginRight: 5,
								fontFamily: fonts.fontPrimaryLight,
								fontSize: normalize(17),
								marginVertical: verticalScale(5),
							}}
						>
						{idx(this.state, _ => _.modalData.emergency_job.user.first_name) && capitalizeFirstLetter(this.state.modalData.emergency_job.user.first_name) + ' '+ capitalizeFirstLetter(this.state.modalData.emergency_job.user.last_name)}
						</Text>
						<Text
							style={{
								textAlign: 'center',
								marginRight: 5,
								fontFamily: fonts.fontPrimaryLight,
								fontSize: normalize(12),
								marginVertical: verticalScale(5),
							}}
						>
					    Job ID # {idx(this.state, _ => _.modalData.emergency_job.id) && this.state.modalData.emergency_job.id}
						</Text>
						</View>
					</View>
					<View style={{
						     	height : verticalScale(50),
								flexDirection : 'row',
								justifyContent : 'space-between',
								alignItems : 'flex-end'
					}}>
					<Text
						style={{
							flex : 1,
							textAlign: 'center',
							marginRight: 5,
							fontFamily: fonts.fontPrimaryLight,
							fontSize: normalize(12),
							marginVertical: verticalScale(5),
						}}
					>
					{idx(this.state, _ => _.modalData.emergency_job.start_date) && moment(this.state.modalData.emergency_job.start_date).format("Do MMM ") + ' '+ moment(this.state.modalData.emergency_job.end_date).format("Do MMM ")}
					</Text>
					<Text
							style={{
								flex : 1,
								textAlign: 'center',
								marginRight: 5,
								fontFamily: fonts.fontPrimaryLight,
								fontSize: normalize(12),
								marginVertical: verticalScale(5),
							}}
						>
							{idx(this.state, _ => _.modalData.emergency_job.salary) ? this.state.modalData.emergency_job.salary : 10} £ Per Hour
						</Text>
					</View>
					<View style={{
						height : verticalScale(50),
						flexDirection : 'row',
						justifyContent : 'space-between',
						alignItems : 'flex-start'
					}}>
						<Text
							style={{ 
								flex : 1,
								textAlign: 'center',
								marginRight: 0,
								fontFamily: fonts.fontPrimaryLight,
								fontSize: normalize(12),
								marginVertical: verticalScale(5),
							}}
						>
							{idx(this.state, _ => _.modalData.emergency_job.start_time) && moment(this.state.modalData.emergency_job.start_time).format("h:mm a") + ' '+ moment(this.state.modalData.emergency_job.end_time).format("h:mm a")}
						</Text>
						<Text
							style={{
								flex : 1,
								textAlign: 'center',
								marginRight: 0,
								fontFamily: fonts.fontPrimaryLight,
								fontSize: normalize(12),
								marginVertical: verticalScale(5),
							}}
						>
							{idx(this.state, _ => _.modalData.emergency_job.distance) ? this.state.modalData.emergency_job.distance : 30} Miles Away
						</Text>
                   </View>
				   {this.state.modalData.invite_status === 'sent' && <Button
						label={'INTERESTED'}
						disabled={false}
						onPress={() => this.acceptInviteFromHospitlal()}
						styles={{
							button: {
								height: verticalScale(50),
								width: scale(180),
								alignItems: 'center',
								justifyContent: 'center',
								borderRadius: 5,
								paddingLeft: 15,
								paddingRight: 15,
								borderRadius: 100,
								marginVertical: verticalScale(10),
							},

							label: [
								{
									fontSize: normalize(16),
									color: '#FFFFFF',
									letterSpacing: 5,
								},
							],
						}}
					/>}
					{this.state.modalData.invite_status === 'sent' && <Button
						label={'REJECT'}
						disabled={false}
						onPress={() => this.rejectInviteFromHospitlal()}
						styles={{
							button: {
								height: verticalScale(50),
								width: scale(180),
								alignItems: 'center',
								justifyContent: 'center',
								borderRadius: 5,
								paddingLeft: 15,
								paddingRight: 15,
								borderRadius: 100,
								elevation: 3,
								marginVertical: verticalScale(10),
							},

							label: [
								{
									fontSize: normalize(16),
									color: '#FFFFFF',
									letterSpacing: 5,
								},
							],
						}}
					/>}
				</Modal>
				{this.props.loader&& (
						<View
							style={{
								flex: 1,
								zIndex:100,
								position : 'absolute',
								top : scale(220),
								right : scale(150),
								backgroundColor: 'transparent',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<ActivityIndicator color={'#02B2FE'} size={'large'} />

							<Text style={{ color: '#02B2FE' }}>loading....</Text>
						</View>
				)}
			</View>
		);
	}
}
const mapStateToProps = ({ JobRequestReducer , Loginreducer}) => {
	console.log('Loginreducer',JobRequestReducer)
	const {jobRequestData,loader} = JobRequestReducer;
	const { token, userid} = Loginreducer;
	return {
		token,
		userid,
		jobRequestData,
		loader
	};
};

export default connect(
	mapStateToProps,
	{JobRequest,acceptInvite,rejectInvite,JobRequestDetail}
)(Jobrequest);


