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
  KeyboardAvoidingView,
  Picker,
  Modal,
  ActivityIndicator,
  Platform,
  Keyboard
} from "react-native";
import moment from 'moment';

const { height, width } = Dimensions.get("window");
import CommonButton from "./CommonButton";
import ConditionalButton from "./ConditionalButton";
import { editTimeLogHours } from '../../actions/TimeLogsActions';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import TimePickerComponent from '../../components/timePicker';
import { scale, verticalScale, fonts, moderateScale } from '../../config';
import { JobRequest, acceptInvite, rejectInvite } from '../../actions/JobRequestActions';
class EditHoursModal extends Component {
  constructor(props) {
    super(props);
    console.log('selectedJobdata', this.props.selectedJobdata)
    let { start_time, date, candidate_id, chargable_hours, chargable_minutes, emergency_job_id, end_time, id, work_notes } = this.props.selectedJobdata

    console.log('chargable_hours', chargable_hours, chargable_minutes)
    this.state = {
      starttimemodal: false,
      end_time: false,
      start_Time: false,
      chargable_hours: false,
      startTimeData: moment(start_time, ["h:mm A"]).format(),
      endTimeData: moment(end_time, ["h:mm A"]).format(),
      // startTimeData: moment(new Date(new Date().setHours(startTimeHour)).setMinutes(startTimeMinute)).format(),
      // endTimeData: moment(new Date(new Date().setHours(endTimeHour)).setMinutes(endTimeMinute)).format(),
      SelectDateData: date,
      chargeableMinutesdata: chargable_minutes.toString(),
      chargeableHoursdata: chargable_hours.toString(),
      candidateIddata: candidate_id,
      emergencyJobId: emergency_job_id,
      selectedJobId: id,
      openModal: true,
      stateTimeError: false,
      endTimeError: false,
      chargeableHourError: false,
      chargeableHoursdataError: false,
      chargeableMinutesdataError: false,
      emergencyJobIdError: false,
      description: work_notes,
      SelectDateTab: false,
      CustomDatePIcker: false,
      dataTimeModal: false,
      chargeableMinutesdataTimeMinutesError: false,
      DescriptionError: false,
      chargeableMinutesDataLogError: false,
      startTimePicker: start_time,
      endTimePicker: end_time,

    };
    this.editHours = this.editHours.bind(this);
  }



  /*
edit Timelog functionality timelog functionality 
	*/
  editHours() {
    let { startTimePicker, endTimePicker, description, chargeableMinutesdata, chargeableHoursdata, emergencyJobId, candidateIddata, CustomDatePIcker, SelectDateData, selectedJobId } = this.state;
    const { token, userid, onClosed, navigateTo } = this.props;
    this.setState({ stateTimeError: false, endTimeError: false, chargeableHourError: false, DescritionError: false, chargeableHoursdataError: false, chargeableMinutesdataError: false, emergencyJobIdError: false, chargeableMinutesdataTimeMinutesError: false, DescriptionError: false, chargeableMinutesDataLogError: false })
    let context = this;

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
    let endTimeDataMoment = moment(endTimePicker, ["h:mm A"]);
    let startTimeDataMoment = moment(startTimePicker, ["h:mm A"]);

    console.log(' moment.duration(now.diff(end));', moment.duration(endTimeDataMoment.diff(startTimeDataMoment)))
    let duration = moment.duration(endTimeDataMoment.diff(startTimeDataMoment));
    let Minutes = duration.asMinutes();
    console.log('chargeableHoursdata', Minutes, chargeableHoursdata * 60, chargeableMinutesdata, chargeableHoursdata * 60 + chargeableMinutesdata)
    if (Minutes < 1) {
      this.setState({ chargeableMinutesDataLogError: true })
      return;
    }

    if (Minutes < (Number(chargeableHoursdata) * 60 + Number(chargeableMinutesdata))) {
      this.setState({ chargeableMinutesdataTimeMinutesError: true })
      return;
    }
    console.log('hoursss', Minutes)

    let body = {
      user_id: userid,
      api_token: token,
      chargable_minutes: chargeableMinutesdata,
      chargable_hours: chargeableHoursdata,
      candidate_id: candidateIddata,
      date: moment(SelectDateData).format('YYYY-MM-DD'),
      start_time: startTimePicker,
      end_time: endTimePicker,
      work_notes: description,
      emergency_job_id: emergencyJobId,
      timelog_id: selectedJobId

    };
    console.log("body", body)
    console.log('this.props', context.props)
    this.props.editTimeLogHours(body, () => {
      navigateTo();
    });
  }







  render() {
    let { chargeableHoursdata,description ,chargeableMinutesdata } = this.state;
    return (<ScrollView style={{ height: height }} keyboardDismissMode={Platform.OS === 'ios' ? 'on-drag' : 'none'}>
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
            <TouchableOpacity style={{ height: verticalScale(40), width: moderateScale(40), justifyContent: 'center', alignItems: 'center' }} onPress={() => { this.props.onClosed() }}>
              <Image source={require('../../images/Group51.png')} style={{ width: 15, height: 15 }} />
            </TouchableOpacity>
          </View>
          <View style={{ height: verticalScale(40), paddingHorizontal: width * 0.1 }}>
            <Text style={{ fontSize: width * 0.038, color: "gray" }}>
              Edit Shift Details
      </Text>
          </View>
          <View style={{ height: verticalScale(20) }} />
          <View
            style={{
              height: verticalScale(70),
              paddingHorizontal: width * 0.1,
              flexDirection: "row"
            }}
          >
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
                style={{width : width*0.30}}
                dob={this.state.startTimePicker}
                onDateChange={date => {
                  console.log(date)
                  this.setState({ startTimePicker: date })
                }}
              />
            </View>
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
              <Text style={{ color: "gray" }}>End Time</Text>
              <TimePickerComponent
                dob={this.state.endTimePicker}
                style={{width : width*0.30}}
                onDateChange={date => {
                  console.log(date)
                  this.setState({ endTimePicker: date })
                }}
              />
            </View>

          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              {this.state.stateTimeError && <Text style={{ color: 'red', textAlign: 'center' }}>Please Select Start Time</Text>}
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              {this.state.endTimeError && <Text style={{ color: 'red', textAlign: 'center' }}>Please Select End Time</Text>}
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              {this.state.chargeableMinutesDataLogError && <Text style={{ color: 'red', textAlign: 'center' }}>EndTime Must Be Greater than Start Time </Text>}
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
                height: Platform.OS === 'ios' ? verticalScale(90) : verticalScale(110),
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
                  value={chargeableHoursdata}
                  maxLength={3}
                  onChangeText={(data) => {
                    this.setState({ chargeableHoursdata: data })
                  }}
                  underlineColorAndroid={'transparent'}
                  keyboardType="numeric"
                  style={{ fontSize: width * 0.044, borderWidth: 1, height: Platform.OS === 'ios' ? verticalScale(25) : verticalScale(50), width: moderateScale(50), borderColor: "#D8D8D8", textAlign: 'center' }}
                />
                <View style={{ height: Platform.OS === 'ios' ?  verticalScale(25) :  verticalScale(50), justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ textAlign: 'center' }}> : </Text>
                </View>
                <TextInput
                  placeholder="MM"
                  maxLength={2}
                  value={chargeableMinutesdata}
                  onChangeText={(data) => {
                    this.setState({ chargeableMinutesdata: data })
                  }}
                  underlineColorAndroid={'transparent'}
                  keyboardType="numeric"
                  style={{ fontSize: width * 0.044, borderWidth: 1, height: Platform.OS === 'ios' ? verticalScale(25) : verticalScale(50), width: moderateScale(50), borderColor: "#D8D8D8", textAlign: 'center' }}
                />
              </View>
            </View>


          </View>

          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {this.state.chargeableHoursdataError && <Text style={{ color: 'red', textAlign: 'center' }}>Please Enter Chargeable Hours</Text>}
            {this.state.chargeableMinutesdataError && <Text style={{ color: 'red', textAlign: 'center' }}>Please Enter Chargeable Minutes</Text>}
          </View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {this.state.chargeableMinutesdataTimeMinutesError && <Text style={{ color: 'red', textAlign: 'center' }}>Chargeable Hours is greater than the actual Time</Text>}
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
              value={description}
              blurOnSubmit={true}
              onSubmitEditing={() => { Keyboard.dismiss() }}

              onChangeText={(description) => {
                this.setState({ description })
              }}
              style={{ fontSize: width * 0.044 }}
            />

          </View>

          <View style={{ flex: 1, paddingTop: moderateScale(5), paddingLeft: moderateScale(10) }}>
            {this.state.DescriptionError && <Text style={{ color: 'red' }}>Description is Required</Text>}
          </View>
          <View style={{ height: verticalScale(70) }} />
          <View style={{ height: verticalScale(50), paddingHorizontal: width * 0.1 }}>
            <CommonButton name={"EDIT HOURS"} onPress={() => {
              this.editHours();
            }} />
          </View>
          <View style={{ height: verticalScale(40) }} />

        </View>
      </KeyboardAwareScrollView>
      {this.props.loader && (
        <View
          style={{
            flex: 1,
            zIndex: 600,
            position: 'absolute',
            top: verticalScale(280),
            right: moderateScale(150),
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
  { JobRequest, editTimeLogHours }
)(EditHoursModal);

