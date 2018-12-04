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
  TextInput
} from "react-native";
const { height, width } = Dimensions.get("window");
import moment from 'moment';
import { capitalizeFirstLetter } from '../../utils';
let WeekDays = ['Mon','Tue','Wed','Thr','fri','Sat','Sun']
export default class LogHours extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount = () => {};
  render() {
    const mainIndex = this.props.index;
    let {index,item} = this.props;
    console.log("moment(item.start_time)",moment(item.start_time))
    console.log('ndex,item',index,item.emergency_job.start_date)
    // return (
      // this.props.item.shiftDetails &&
      // this.props.item.shiftDetails.map((item, index) => {
        return (
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              marginTop: width * 0.05
            }}
          >
            <View style={{ flex: 0.24 }}>
              <View
                style={{
                  height: width * 0.17,
                  width: width * 0.17,
                  borderRadius: 100,
                  borderWidth: 1,
                  borderColor: "#D8D8D8",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Text style={{ fontSize: width * 0.05 }}>
                  { moment(item.emergency_job.start_date).format('DD')}
                </Text>
                <Text style={{ fontSize: width * 0.027 }}>
                  { WeekDays[moment(item.emergency_job.start_date).isoWeekday()-1]}
                </Text>
              </View>
            </View>

            <View style={{ flex: 0.76 }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  borderRadius: 7,
                  //   borderWidth: 1,
                  borderColor: "#D8D8D8",
                  backgroundColor:
                    mainIndex == 0 && index == 0 ? "#38b2ff" : "#eeeeee",
                  paddingHorizontal: width * 0.02
                }}
              >
                <Text
                  style={{
                    fontSize: width * 0.055,
                    paddingVertical: width * 0.02,
                    color: mainIndex == 0 && index == 0 ? "#FFFFFF" : ""
                  }}
                >
                  { moment(item.emergency_job.start_time).utc().format("hh:mm A") }
                   {"   "}-{"   "}
                   { moment(item.emergency_job.end_time).utc().format("hh:mm A") }
                </Text>
                <Text
                  style={{
                    fontSize: width * 0.03,
                    color: mainIndex == 0 && index == 0 ? "#FFFFFF" : "gray"
                  }}
                >
                  { item.emergency_job.user.first_name && capitalizeFirstLetter(item.emergency_job.user.first_name) }  {' '}{ item.emergency_job.user.last_name  && capitalizeFirstLetter(item.emergency_job.user.last_name)}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );
     
  }
}

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center"
  }
});
