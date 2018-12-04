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
import ShiftCard from "./ShiftCard.js";
const data = [
  {
    date: 16,
    day: "MON",
    shiftDetails: [
      {
        clinic: "Parashant Dental clinic",
        shiftStart: "10:30",
        shiftEnd: "12:30"
      },
      {
        clinic: "Unknown Dental clinic",
        shiftStart: "10:30",
        shiftEnd: "12:30"
      },
      {
        clinic: "Good Dental clinic",
        shiftStart: "10:30",
        shiftEnd: "12:30"
      }
    ]
  },
  {
    date: 16,
    day: "MON",
    shiftDetails: [
      {
        clinic: "Best Dental clinic",
        shiftStart: "10:30",
        shiftEnd: "12:30"
      },
      {
        clinic: "Chai clinic",
        shiftStart: "10:30",
        shiftEnd: "12:30"
      }
    ]
  },
  {
    date: 16,
    day: "MON",
    shiftDetails: [
      {
        clinic: "Romil clinic",
        shiftStart: "10:30",
        shiftEnd: "12:30"
      },
      {
        clinic: "somit clinic",
        shiftStart: "10:30",
        shiftEnd: "12:30"
      }
    ]
  },
  {
    date: 16,
    day: "MON",
    shiftDetails: [
      {
        clinic: "Parashant Dental clinic",
        shiftStart: "10:30",
        shiftEnd: "12:30"
      },
      {
        clinic: "Parashant Dental clinic",
        shiftStart: "10:30",
        shiftEnd: "12:30"
      }
    ]
  },
  {
    date: 16,
    day: "MON",
    shiftDetails: [
      {
        clinic: "Parashant Dental clinic",
        shiftStart: "10:30",
        shiftEnd: "12:30"
      }
    ]
  }
];
export default class LogHours extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount = () => {};

  render() {
    let {logHoursData} = this.props;
    console.log('logggggghourData',logHoursData)
    return (
      <ScrollView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        {logHoursData.map((item, index) => {
          console.log('datadatdatda',item,index)
          return (
            <View
              style={{
                // height: height * 0.1,
                paddingHorizontal: height * 0.025,
                // marginHorizontal: height * 0.01,
                backgroundColor: "#FFFFFF"
              }}
            >
              <ShiftCard item={item} index={index} />
            </View>
          );
        })}
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
