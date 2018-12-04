import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  ActivityIndicator,
  Platform,
  Picker,
  Modal
} from "react-native";
import moment from 'moment';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const { height, width } = Dimensions.get("window");
import CommonButton from "./CommonButton";
import ConditionalButton from "./ConditionalButton";
import { addTimeLogHours } from '../../actions/TimeLogsActions';
import { connect } from 'react-redux';
import DateTimePicker from 'react-native-modal-datetime-picker';
import DatePickerComponent from '../../components/datepicker';

import TimePickerComponent from '../../components/timePicker';

import { Dropdown } from 'react-native-material-dropdown';
import { scale, verticalScale, fonts, moderateScale } from '../../config';
import { JobRequest, acceptInvite, rejectInvite } from '../../actions/JobRequestActions';
class AddHours extends Component {
  constructor(props) {
    super(props);
    this.state = {
      starttimemodal: false,
      end_time: false,
      start_Time: false,
      chargable_hours: false,
      startTimeData: '',
      endTimeData: '',
      SelectDateData: '',
      chargeableMinutesdata: '',
      chargeableHoursdata: '',
      candidateIddata : '',
      emergencyJobId: '',
      openModal: true,
      stateTimeError: false,
      endTimeError: false,
      chargeableHourError: false,
      DescritionError: false,
      chargeableHoursdataError : false,
      chargeableMinutesdataError : false,
      emergencyJobIdError :false,
      description: '',
      SelectDateTab : false,
      CustomDatePIcker: false,
      dataTimeModal : false,
      chargeableMinutesdataTimeMinutesError :false,
      DescriptionError : false,
      chargeableMinutesDataLogError : false,
      startTimePicker : '',
      endTimePicker : '',
      customDateSelecterdata : '',
      customDateSelecterdataError : false
    };
    this.addHours = this.addHours.bind(this);
    this._starttimePicked = this._starttimePicked.bind(this);
    this._starttimePickedData = this._starttimePickedData.bind(this);
    this._hidestartTimepicker = this._hidestartTimepicker.bind(this);
    this.startTime = this.startTime.bind(this);
    this.endTime = this.endTime.bind(this);
    this.CustomDatePIcker = this.CustomDatePIcker.bind(this);
  }
  componentDidMount = () => {
    console.log('this.props', this.props);
    const { token, userid, } = this.props;
    console.log('this.propsssss', this.props)
    let body = {
      user_id: userid,
      api_token: token
    };
    this.props.JobRequest({ body });
  };
	dropdownselection = (value, index, data) => {
    console.log('value, index, data)',value, index, data)
    this.setState({ candidateIddata : data[index].candidate_id,emergencyJobId : value });
		// this.setState({ selectedFilter : data[index].id });
	};

  /*
	timelog functionality 
	*/
  addHours() {
    let { startTimePicker, endTimePicker,description,chargeableMinutesdata,chargeableHoursdata,emergencyJobId ,candidateIddata , CustomDatePIcker,SelectDateData,customDateSelecterdata} = this.state;
    const { token, userid ,onClosed,navigateTo} = this.props;
    this.setState({ stateTimeError: false, endTimeError: false, chargeableHourError: false, DescritionError: false,chargeableHoursdataError : false,chargeableMinutesdataError : false,emergencyJobIdError : false,chargeableMinutesdataTimeMinutesError :false,DescriptionError: false,chargeableMinutesDataLogError: false,customDateSelecterdataError : false })
    let context = this;
    if (emergencyJobId == '') {
      this.setState({ emergencyJobIdError: true })
      return;
    }
    if (startTimePicker == '') {
      this.setState({ stateTimeError: true })
      return;
    }
    if (endTimePicker == '') {
      this.setState({ endTimeError: true })
      return;
    }
    if (chargeableHoursdata == '') {
      this.setState({ chargeableHoursdataError: true })
      return;
    }
    if (chargeableMinutesdata == '') {
      this.setState({ chargeableMinutesdataError: true })
      return;
    }
    if (description == '') {
      this.setState({ DescriptionError: true })
      return;
    }
    if(CustomDatePIcker && customDateSelecterdata == ''){
      this.setState({customDateSelecterdataError : true});
      return;
    }
    

    // let duration = moment.duration(endTimeData.diff(startTimeData));
    // var hours = duration.asHours();
    
    
    let endTimeDataMoment  =  moment(endTimePicker, ["h:mm A"]);
    let startTimeDataMoment  =   moment(startTimePicker, ["h:mm A"]);
    console.log(' moment.duration(now.diff(end));', moment.duration(endTimeDataMoment.diff(startTimeDataMoment),endTimeDataMoment,startTimeDataMoment))
   let duration = moment.duration(endTimeDataMoment.diff(startTimeDataMoment));
  console.log('duration',duration)

   let Minutes = duration.asMinutes();
   console.log('Minutes',Minutes)
   if( Minutes < 1){
    this.setState({ chargeableMinutesDataLogError: true })
    return;
  }
   console.log('chargeableHoursdata',Minutes , chargeableHoursdata*60,chargeableMinutesdata,chargeableHoursdata*60 + chargeableMinutesdata)
    if( Minutes <  (Number(chargeableHoursdata)*60 + Number(chargeableMinutesdata))){
      this.setState({ chargeableMinutesdataTimeMinutesError: true })
      return;
    }
  console.log('hoursss',Minutes)

    // let body = {
    //   user_id: userid,
    //   api_token: token,
    //   chargable_minutes: chargeableMinutesdata,
    //   chargable_hours: chargeableHoursdata,
    //   candidate_id : candidateIddata,
    //   date : CustomDatePIcker ?    moment(SelectDateData).format('YYYY-MM-DD')  : moment(new Date()).format('YYYY-MM-DD')   ,
    //   start_time :  moment(startTimeData).format("hh:mm A"),
    //   end_time : moment(endTimeData).format("hh:mm A"),
    //   work_notes: description,
    //   emergency_job_id: emergencyJobId
  
    // };

    let body = {
      user_id: userid,
      api_token: token,
      chargable_minutes: chargeableMinutesdata,
      chargable_hours: chargeableHoursdata,
      candidate_id : candidateIddata,
      date : CustomDatePIcker ?    customDateSelecterdata  : moment(new Date()).format('YYYY-MM-DD')   ,
      start_time :  startTimePicker,
      end_time : endTimePicker,
      work_notes: description,
      emergency_job_id: emergencyJobId
  
    };


    console.log("body", body)
    console.log('this.props', context.props)
    this.props.addTimeLogHours(body, () => {
      navigateTo();
    });
  }

  _starttimePicked(date) {
    console.log('date', date, this.state.start_Time, this.state.chargable_hours, this);
    if (this.state.start_Time) {
      this.setState({ startTimeData: date });
    }
    if (this.state.end_time) {
      this.setState({ endTimeData: date });
    }
  
    this.setState({ starttimemodal: false });
  };

  _starttimePickedData(date){
    if (this.state.SelectDateTab) {
      this.setState({ SelectDateData: date });
    }
    this.setState({dataTimeModal : false });
  }
  
  _hidestartTimepicker() {
    this.setState({  dataTimeModal: false , starttimemodal: false, end_time: false, start_Time: false, chargable_hours: false });
  };
  startTime() {
    this.setState({ starttimemodal: true, end_time: false, start_Time: true, chargable_hours: false })
  }
  endTime() {
    this.setState({ starttimemodal: true, dataTimeModal: false , end_time: true, start_Time: false, chargable_hours: false })
  }
  CustomDatePIcker() {
    this.setState({ dataTimeModal: true , starttimemodal: false, end_time: false, start_Time: false, SelectDateTab: true })
  }


  render() {
    let jobRequestDataDummy = this.props.jobRequestData;
    if (jobRequestDataDummy.length > 0) {
      // jobRequestDataDummy = jobRequestDataDummy == 
      jobRequestDataDummy = jobRequestDataDummy.filter((data, i, thisData) => {
        return (data.invite_status == 'accepted')
      }).map((filterObject) => {
        return { ...filterObject, value: filterObject.emergency_job_id }
      })
      // console.log('jobRequestDataDummy', jobRequestDataDummy)
    }

    let { starttimemodal, SelectDateData, startTimeData, endTimeData, dataTimeModal } = this.state;
    let { jobRequestData } = this.props;
  
    if(jobRequestDataDummy.length == 0 && !this.props.loader2){
      return(<View style={{flex: 1 , justifyContent : 'center',alignItems :'center'}}>
         <View
            style={{
              position : 'absolute',
              right : moderateScale(10),
              top: verticalScale(20),
              height: verticalScale(60),
              alignItems: "flex-end",
              paddingHorizontal: width * 0.05,
              justifyContent: "center",
             
            }}
          >
            <TouchableOpacity style={{  height: verticalScale(60),width : moderateScale(60),justifyContent :'center',alignItems :'center'}} onPress={() => { this.props.onClosed() }}>
              <Image source={require('../../images/Group51.png')} style={{ width: 15, height: 15 }} />
            </TouchableOpacity>
          </View>
      <Text>There is No Accepted Job</Text>
      </View>)
    }



    return (<ScrollView style={{ height: height }} keyboardDismissMode={Platform.OS === 'ios' ?  'on-drag' : 'none'}>
      	<KeyboardAwareScrollView
				enableResetScrollToCoords={false}
					style={{
						flex: 1,
	
					}}
				>
        <View style={{ flex: 1 }}>

          <View
            style={{
              height: verticalScale(60),
              alignItems: "flex-end",
              paddingHorizontal: width * 0.05,
              justifyContent: "center"
            }}
          >
            <TouchableOpacity style={{  height: verticalScale(40),width : moderateScale(40),justifyContent :'center',alignItems :'center'}} onPress={() => { this.props.onClosed() }}>
              <Image source={require('../../images/Group51.png')} style={{ width: 15, height: 15 }} />
            </TouchableOpacity>
          </View>
          <View style={{ height: verticalScale(40), paddingHorizontal: width * 0.1 }}>
            <Text style={{ fontSize: width * 0.038, color: "gray" }}>
              Shift Day
          </Text>
          </View>
          <View style={{ height: verticalScale(40), paddingHorizontal: width * 0.1 }}>
            <ConditionalButton name1={"Today"} name2={"Select Date"} callback={(data)=>{this.setState({CustomDatePIcker: data})}} />
          </View>


 {this.state.CustomDatePIcker && <View
            style={{
              height: verticalScale(70),
              paddingHorizontal: width * 0.1,
              paddingTop : verticalScale(10),
              flexDirection: "row"
            }}
          >
            {/* <TouchableOpacity
              onPress={() => {
            
                this.CustomDatePIcker()
              }}
              style={{
                flex: 1,
                height: verticalScale(70),
                borderWidth: 1,
                borderColor: "#D8D8D8",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text style={{ color: "gray" }}>Select Date</Text>
              <Text
                style={{
                  fontSize: width * 0.045,
                  color: "gray",
                  marginTop: width * 0.025
                }}
              >
                {SelectDateData != '' ? moment(SelectDateData).format('YYYY-MM-DD')  : 'YYYY-MM-DD'}
              </Text>
            </TouchableOpacity> */}
             <View

              style={{
                flex: 1,
                height: verticalScale(70),
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text style={{ color: "gray" }}>Select Date</Text>
              <DatePickerComponent
								dob={this.state.customDateSelecterdata}
                onDateChange={date =>{
                  console.log(date)
								this.setState({customDateSelecterdata: date})
								}}
							/>
            </View> 
</View>}

        <View style={{ flexDirection: 'row' }}>
            <View style={{flex: 1,justifyContent : 'center',alignItems : 'center'}}>
              {this.state.customDateSelecterdataError && <Text style={{ color: 'red',textAlign : 'center' , paddingTop: verticalScale(10) }}>Please Select the Date</Text>}
            </View>
          </View>



          <View styl={{ height: verticalScale(40), paddingVertical: width * 0.2 }}>
            <Dropdown
              label="Select option"
              data={jobRequestDataDummy}
              containerStyle={{ paddingHorizontal: width * 0.15 }}
              itemTextStyle={{ fontFamily: fonts.fontPrimaryLight }}
              onChangeText={this.dropdownselection}
            />
          </View>
          <View style={{flex: 1,justifyContent : 'center',alignItems : 'center'}}>
              {this.state.emergencyJobIdError && <Text style={{ color: 'red',textAlign : 'center' }}>Please Select DropDown</Text>}
            </View>        
          <View style={{ height: verticalScale(20) }} />
          <View
            style={{
              height: verticalScale(70),
              paddingHorizontal: width * 0.1,
              flexDirection: "row"
            }}
          >
            {/* <TouchableOpacity
              onPress={() => {
            
                this.startTime()
              }}
              style={{
                flex: 1,
                height: verticalScale(70),
                borderWidth: 1,
                borderColor: "#D8D8D8",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text style={{ color: "gray" }}>Start Time</Text>
              <Text
                style={{
                  fontSize: width * 0.045,
                  color: "gray",
                  marginTop: width * 0.025
                }}
              >
                {startTimeData != '' ? moment(startTimeData).format("hh:mm A") : 'HH:MM'}
              </Text>
            </TouchableOpacity> */}
               <View
            
              style={{
                flex: 1,
                height: verticalScale(70),
                borderWidth: 1,
                borderColor: "#D8D8D8",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text style={{ color: "gray" }}>Start Time</Text>
              <TimePickerComponent
              dob={this.state.startTimePicker}
              style={{width : width*0.30}}
								onDateChange={date => {
                   this.setState({startTimePicker : date})
								}}
				      	/>
            </View> 
            		
            {/* <TouchableOpacity
              onPress={() => {
                this.endTime()
              }}
              style={{
                flex: 1,
                height: verticalScale(70),
                borderWidth: 1,
                borderColor: "#D8D8D8",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text style={{ color: "gray" }}>End Time</Text>
              <Text
                style={{
                  fontSize: width * 0.045,
                  color: "gray",
                  marginTop: width * 0.025
                }}
              >

                {endTimeData != '' ? moment(endTimeData).format("hh:mm A") : 'HH:MM'}
              </Text>
            </TouchableOpacity> */}
            <View
              onPress={() => {
                this.endTime()
              }}
              style={{
                flex: 1,
                height: verticalScale(70),
                borderWidth: 1,
                borderColor: "#D8D8D8",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text style={{ color: "gray" }}>End Time</Text>
              <TimePickerComponent
              style={{width : width*0.30}}
              dob={this.state.endTimePicker}
								onDateChange={date =>{
                   console.log(date)
                   this.setState({endTimePicker : date})
								}}
				      	/>
            </View>

          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{flex: 1,justifyContent : 'center',alignItems : 'center'}}>
              {this.state.stateTimeError && <Text style={{ color: 'red',textAlign : 'center' }}>Please Select Start Time</Text>}
            </View>
            <View style={{flex: 1,justifyContent : 'center',alignItems : 'center'}}>
              {this.state.endTimeError && <Text style={{ color: 'red',textAlign : 'center' }}>Please Select End Time</Text>}
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{flex: 1,justifyContent : 'center',alignItems : 'center'}}>
              {this.state.chargeableMinutesDataLogError && <Text style={{ color: 'red',textAlign : 'center' }}>EndTime Must Be Greater than Start Time </Text>}
            </View>
          </View>
          <View style={{ height: verticalScale(20) }} />
          <View
            style={{
              flex: 0.11,
              paddingHorizontal: width * 0.1,
              alignItems: 'center',
              marginTop: width * 0.0
            }}

          >
            <View
              onPress={() => {
                this.chargableHours()
              }}
              style={{
                flex: 1,
                height:  Platform.OS === 'ios' ?  verticalScale(90):  verticalScale(110),
                width: moderateScale(150),
                borderWidth: 1,
                borderColor: "#D8D8D8",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                <Text style={{ color: "gray" }}>Chargable Hours</Text>
              </View>
              <View style={{ flexDirection: 'row', flex: 1 }}>
                <TextInput
                  placeholder="HH"
                  maxLength={3}
                  onChangeText={(data)=>{
                    this.setState({chargeableHoursdata : data})
                  }}
                  underlineColorAndroid={'transparent'}
                  keyboardType="numeric"
                  style={{ fontSize: width * 0.044, borderWidth: 1, height: Platform.OS === 'ios' ? verticalScale(25) : verticalScale(50), width: moderateScale(50), borderColor: "#D8D8D8", textAlign: 'center' }}
                />
                <View style={{ height: Platform.OS === 'ios' ? verticalScale(25): verticalScale(50), justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ textAlign: 'center' }}> : </Text>
                </View>
                <TextInput
                  placeholder="MM"
                  maxLength={2}
                  onChangeText={(data)=>{
                    this.setState({chargeableMinutesdata : data})
                  }}
                  underlineColorAndroid={'transparent'}
                  keyboardType="numeric"
                  style={{ fontSize: width * 0.044, borderWidth: 1, height: Platform.OS === 'ios' ? verticalScale(25) : verticalScale(50), width: moderateScale(50), borderColor: "#D8D8D8", textAlign: 'center' }}
                />
              </View>
            </View>


          </View>
    
            <View style={{flex: 1,justifyContent : 'center',alignItems : 'center'}}>
              {this.state.chargeableHoursdataError && <Text style={{ color: 'red',textAlign : 'center' }}>Please Enter Chargeable Hours</Text>}
              {this.state.chargeableMinutesdataError && <Text style={{ color: 'red',textAlign : 'center' }}>Please Enter Chargeable Minutes</Text>}
            </View>
            <View style={{flex: 1,justifyContent : 'center',alignItems : 'center'}}>
              {this.state.chargeableMinutesdataTimeMinutesError && <Text style={{ color: 'red',textAlign : 'center' }}>Chargeable Hours is greater than the actual Time</Text>}
            </View>

            
          <View style={{ height: verticalScale(40) }} />
          <View
            style={{
              flex: 0.1,
              height: verticalScale(100),
              marginHorizontal: width * 0.1,
              borderBottomWidth: 2,
              borderColor: "#D8D8D8"
            }}
          >
            <Text style={{ fontSize: width * 0.038, color: "gray" }}>
              Description
          </Text>

            <TextInput
              placeholder="Start typing..."
              multiline={true}
              underlineColorAndroid={'transparent'}
              blurOnSubmit={true}
              onSubmitEditing={()=>{Keyboard.dismiss()}}

              onChangeText={(description)=>{
                this.setState({description})
              }}
              style={{ fontSize: width * 0.044 }}
            />

          </View>
          
          <View style={{flex: 1,paddingTop : moderateScale(5),paddingLeft : moderateScale(10)}}>
              {this.state.DescriptionError && <Text style={{ color: 'red' }}>Description is Required</Text>}
            </View>
          <View style={{ height: verticalScale(70) }} />
          <View style={{ height: verticalScale(50), paddingHorizontal: width * 0.1 }}>
            <CommonButton name={"ADD HOURS"} onPress={() => {
              this.addHours();
            }} />
          </View>
          <View style={{ height: verticalScale(40) }} />

          {/* <DateTimePicker
            mode={'time'}
            is24Hour={true}
            datePickerModeAndroid="spinner"
            isVisible={starttimemodal}
            onConfirm={this._starttimePicked}
            onCancel={this._hidestartTimepicker}
          /> */}

				


       
            {/* <DateTimePicker
            mode={'date'}
            is24Hour={true}
            datePickerModeAndroid="spinner"
            isVisible={dataTimeModal}
            onConfirm={this._starttimePickedData}
            onCancel={this._hidestartTimepicker}
          /> */}

        </View>
        </KeyboardAwareScrollView>
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
    </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center"
  }
});


const mapStateToProps = ({ TimeLogReducer, JobRequestReducer, Loginreducer }) => {
  const { timeLogData, loader } = TimeLogReducer
  const { token, userid } = Loginreducer;
  const { jobRequestData } = JobRequestReducer;
  return {
    token,
    userid,
    timeLogData,
    loader,
    jobRequestData,
    loader2 : JobRequestReducer.loader
  };
};

export default connect(
  mapStateToProps,
  { JobRequest,addTimeLogHours }
)(AddHours);

