import React, { Component } from "react";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";

import StepIndicator from "./stepindicator";
const StepIndicatorView = props => {
  let styles = {
    indicatorStyle: {
      stepIndicatorSize: 15,
      currentStepIndicatorSize: 20,
      separatorStrokeWidth: 1,
      currentStepStrokeWidth: 2,
      stepStrokeCurrentColor: "#02B2FE",
      stepStrokeWidth: 1,
      stepStrokeFinishedColor: "#02B2FE",
      stepStrokeUnFinishedColor: "#02B2FE",
      separatorFinishedColor: "#02B2FE",
      separatorUnFinishedColor: "#02B2FE",
      stepIndicatorFinishedColor: "#02B2FE",
      stepIndicatorUnFinishedColor: "#ffffff",
      stepIndicatorCurrentColor: "#ffffff",
      stepIndicatorLabelFontSize: 13,
      currentStepIndicatorLabelFontSize: 13,
      stepIndicatorLabelCurrentColor: "#fe7013",
      stepIndicatorLabelFinishedColor: "#ffffff",
      stepIndicatorLabelUnFinishedColor: "#aaaaaa",
      labelColor: "#999999",
      labelSize: 13,
      currentStepLabelColor: "#fe7013"
    }
  };
  //  console.log(props.label, "props");
  return (
    <StepIndicator
      customStyles={styles.indicatorStyle}
      currentPosition={props.position}
      stepCount={4}
    />
  );
};

export default StepIndicatorView;
