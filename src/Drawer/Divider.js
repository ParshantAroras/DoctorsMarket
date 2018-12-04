import React, { Component } from "react";
import { TouchableHighlight, View, Text, Dimensions } from "react-native";
import {
  colors,
  normalize,
  scale,
  verticalScale,
  moderateScale,
  fonts
} from "../config";
const { height, width } = Dimensions.get("window");

export default class Divider extends Component {
  render() {
    return (
      <View
        style={{
          height: verticalScale(0.1),
          width,
          backgroundColor: "white",
          borderStyle: "dotted",
          borderWidth: 0.4,
          borderColor: "#b7c2c6"
        }}
      />
    );
  }
}
