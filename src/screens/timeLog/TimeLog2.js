import React, { Component } from 'react';
import { View, TouchableOpacity, FlatList, Image, Dimensions, Platform, ScrollView,Modal,ActivityIndicator,StyleSheet } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { HeaderTitle } from '../../components/HeaderTitle';

import { Card, CardItem, Text, Icon, Right, Content } from 'native-base';
import { scale, verticalScale,moderateScale, fonts } from '../../config';
import { normalize } from 'react-native-elements';
import EIcon from 'react-native-vector-icons/EvilIcons';
import ENIcon from 'react-native-vector-icons/Entypo';
import Icons from 'react-native-vector-icons/FontAwesome';

import { connect } from 'react-redux';
const { height, width } = Dimensions.get('window');
import { Dropdown } from 'react-native-material-dropdown';
import { viewAllTieLogs } from '../../actions/TimeLogsActions';
import Connection from '../../config/connection';

import moment from 'moment';
import { capitalizeFirstLetter, leftPad } from '../../utils';
import Accordion from 'react-native-collapsible/Accordion';
import ModalBox from 'react-native-modalbox';
import EditHoursModal from './EditHoursModal';



let options = [
	{
		value: 'All',
		id: -1,
	},
	{
		value: 'Pending',
		id: 0,
	},
	{
		value: 'Approved',
		id: 1,
	},
	{
		value: 'Declined',
		id: 2,
	},
];
class TimeLog2 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedFilter: -1,
			activeSections: [],
			openModal: false,
			selectedJobId : '',
			ViewNotesModal : false,
			workNotes: ''
		};
		this.editTimeLog = this.editTimeLog.bind(this);
	}
	componentDidMount = () => {
		console.log('this.props', this.props);
		const { token, userid,navigation } = this.props;
		console.log('this.propsssss', this.props)
		let body = {
			user_id: userid,
			api_token: token
		};
		this.props.viewAllTieLogs({ body },navigation);
	};


	iconname = status => {
		switch (status) {
			case 0:
				return 'exclamation';
			case 1:
				return 'check';
			case 2:
				return 'circle-with-cross';
			default:
				return null;
		}
	};

	_renderSectionTitle = section => {
		return (null
		);
	};

	editTimeLog(section){
		let context = this;
		this.setState({ selectedJobdata  : section},()=>{
			context.setState({ openModal : true});

		})

		
    console.log('sectionsectionsectionsection',section)
	}

	_renderContent = section => {
		console.log('section', section)
		
		return (
			<View

				style={{
					width,
					borderColor: '#666',
					height: Platform.OS == 'ios' ? verticalScale(60) : moderateScale(76),
					borderBottomWidth: Platform.OS == 'ios' ? 0.4 : 0.2,
					paddingLeft : moderateScale(12)
				}}
			>
				<View style={{ flexDirection: 'row',paddingTop :verticalScale(10),  }}>
					<View style={{ flex: 1, justifyContent: 'flex-start',flexDirection: 'row' }}>
						<Text style={styles.belowText} >Start Time : </Text><Text style={styles.opactityBold}>{section.start_time}</Text>
					</View>
					<View style={{ flex: 1, justifyContent: 'flex-start',flexDirection: 'row' }}>
						<Text style={styles.belowText} >End Time : </Text><Text style={styles.opactityBold}> {section.end_time} </Text>
					
					</View>
				</View>
				<View style={{ flexDirection: 'row',paddingTop :verticalScale(10)   }}>
					<View style={{ flex: 1, justifyContent: 'flex-start',flexDirection: 'row' }}>
						<Text style={styles.belowText}>Chargable Time:</Text><Text  style={styles.opactityBold}> {leftPad(section.chargable_hours, 2)+ ' : '+ leftPad(section.chargable_minutes, 2)}</Text>
						
					</View>
					<View style={{ flex: 1,flexDirection :'row', justifyContent: 'flex-start' }}>
					
						<TouchableOpacity onPress={()=>{ this.setState({workNotes : section.work_notes,ViewNotesModal :true}) }}><Text style={[styles.belowText,styles.colorView]}>View Notes</Text></TouchableOpacity>
						{section.status !== 1 &&<TouchableOpacity onPress={()=>{this.editTimeLog(section)}} style={{paddingLeft : moderateScale(5)}}><Icons name="edit" size={20} color="#900" /></TouchableOpacity>}
					</View>
				</View>
			</View>
		);
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
					source={require('../../images/hospital4.png')}
					style={{ width: scale(60), height: verticalScale(68) }}
					resizeMode="contain"
				/>
			);
		}
	};


	renderItem = (item) => {
		console.log('iteemmmm', item)
		// return(<View><Text>789</Text>></View>)
		let { emergency_job_id, date, status, emergency_job: { user: { first_name , last_name,profile_pic },user_id } } = item;
	    console.log(' Connection.getMedia(user_id,profile_pic)', Connection.getMedia(user_id,profile_pic))
		return (
			<View
				style={{
					width,
					height: moderateScale(85),
					flexDirection: 'row',
					marginVertical: verticalScale(2),
					borderBottomWidth: Platform.OS == 'ios' ? 0.4 : 0.8,
					borderColor: '#666',
				}}
			>
				<View style={{ flex: 0.3, alignItems: 'center', justifyContent: 'center' }}>
				{this.renderAvatar(user_id,profile_pic)}
					{/* <Image source={profile_pic == null ? require('../../images/hospital5.png'): {uri : Connection.getMedia(user_id,profile_pic)}} style={{ width: scale(40), height: verticalScale(40) }} /> */}
				</View>
				<View style={{ flex: 0.7 }}>
					<View style={{ flex: 0.7, flexDirection: 'row'}}>
						<View style={{ flex: 0.7, alignItems: 'flex-start', justifyContent: 'center' }}>
							<Text style={{ fontFamily: fonts.fontPrimaryLight, fontSize: normalize(12) , opacity: 0.6,paddingTop : moderateScale(5) }}>
								{'#' + leftPad(emergency_job_id, 5)}
							</Text>
							<Text style={{ fontFamily: fonts.fontPrimaryLight, fontSize: normalize(20) }}>
								{first_name && capitalizeFirstLetter(first_name) }
								{" "}
								{last_name && capitalizeFirstLetter(last_name) }
							</Text>
						</View>
						<View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'flex-start' }}>
						 <View style={{	position: 'absolute',
									right : moderateScale(0),
									top : moderateScale(9),}}>
							<Text
								style={{
									fontFamily: fonts.fontPrimaryLight,
								
									opacity: 0.6,
									textAlign: 'left',
									fontSize: normalize(12),
									paddingRight: 30,
								}}
							>
							 {moment(date).format('MMM DD') }
							</Text>
						</View>	
						</View>
					</View>
					<View
						style={{
							flex: 0.3,
							alignItems: 'center',
							justifyContent: 'space-between',
							flexDirection: 'row'
						}}
					>
						{status === 0 && (
							<View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
								<EIcon
									name={this.iconname(status)}
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
						{status === 1 && (
							<View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
								<EIcon
									name={this.iconname(status)}
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
									Approved
								</Text>
							</View>
						)}
						{status === 2 && (
							<View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
								<ENIcon
									name={this.iconname(status)}
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
						{/* <Text style={{ fontFamily: fonts.fontPrimaryLight, paddingRight: 30 }}>{date}</Text> */}
					</View>
				</View>
			</View>
		);
	};
	dropdownselection = (value, index, data) => {
		console.log('value, index, data)', value, index, data[index].id)
		this.setState({ selectedFilter: data[index].id });
	};
	_updateSections = activeSections => {
		this.setState({ activeSections });
	};
	navigateTO = () => {
      this.setState({openModal : false})
	}

	render() {
		let list = this.props.timeLogData;
		let { selectedFilter,selectedJobId,selectedJobdata } = this.state;

		if (selectedFilter !== -1) {
			console.log('loglog', list)
			list = list.filter((data, i, thisdata) => {
				console.log("selectedFilter", data)
				return (data.status == selectedFilter)
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
						height: Platform.OS === 'ios' ? verticalScale(55) : moderateScale(50),
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
						Timelogs
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
					{/* <FlatList
						style={{ flex: 1, marginTop: 18 }}
						showsVerticalScrollIndicator={false}
						data={list}
						renderItem={this.renderItem}
						style={{ marginHorizontal: scale(10) }}
					/> */}
					<ScrollView>
					{ list.length == 0 && <View style={{height : height*0.50,justifyContent : 'center',alignItems: 'center'}}>
				<Text> No Record Found </Text>
				</View>}	
						<Accordion
							sections={list}
							underlayColor={'#FFFFFF'}
							activeSections={this.state.activeSections}
							renderSectionTitle={this._renderSectionTitle}
							renderHeader={this.renderItem}
							renderContent={this._renderContent}
							onChange={this._updateSections}
						/>
					</ScrollView>
				

				</View>
				{this.state.ViewNotesModal && <ModalBox
					onClosed={() => this.setState({ ViewNotesModal: false })}
					swipeToClose={false}
					style={{
						width: scale(300),
						height: verticalScale(150),
						elevation: 1,
						borderRadius: 2,
					    zIndex: 1, 
						paddingHorizontal: 0
					}}
					position={'center'}
					ref={'modal3'}
					isOpen={this.state.ViewNotesModal}
				>
					<View style={{
							marginRight: 0,
							marginTop: 0
						}}>
						<View>
						<View style={{paddingTop: verticalScale(10)}}>
						    <Text style={styles.workNotesTitle}>Work Notes</Text>
						</View>	
						<View style={{paddingTop: verticalScale(10),paddingLeft : moderateScale(5), alignItems: 'flex-start'}}>
							<View>
						 	<Text style={{textAlign :'left'}} >{this.state.workNotes}</Text>
					     	</View>	
					   </View>
					</View>		
					</View>
					</ModalBox>}
				{this.state.openModal && <Modal
				        // animationType={'slide'}
						backdrop={false}
						isOpen={this.state.openModal}
						onClosed={() => this.setState({ openModal: false })}
						style={{
							flex: 1,
							backgroundColor: 'transparent',
							alignItems: 'center',
							justifyContent: 'center',
						}}
						position={'center'}
					>
	                  <EditHoursModal  selectedJobdata={selectedJobdata} onClosed={() => this.setState({ openModal: false })} navigateTo={()=>this.navigateTO()}/>
					</Modal>}
					{this.props.loader && (
						<View
							style={{
								flex: 1,
								zIndex:600,
								position : 'absolute',
								top : verticalScale(280),
								right : moderateScale(150),
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
const styles = StyleSheet.create({
	belowText : {
		fontFamily: fonts.fontPrimaryBold,
		fontSize: normalize(12)
	}, 
	opactityBold : {
		fontFamily: fonts.fontPrimaryRegular,
		fontSize: normalize(12)
		},
	colorView :{
		color: '#37a6ff'
		 },
	workNotesTitle:{
		textAlign : 'center',fontFamily: fonts.fontPrimaryBold , fontSize: moderateScale(20)
	}	
});

const mapStateToProps = ({ TimeLogReducer, Loginreducer }) => {
	console.log('Loginreduce222222r', TimeLogReducer)
	const { timeLogData, loader } = TimeLogReducer
	const { token, userid } = Loginreducer;
	return {
		token,
		userid,
		timeLogData,
		loader
	};
};

export default connect(
	mapStateToProps,
	{ viewAllTieLogs }
)(TimeLog2);