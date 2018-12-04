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

export default class CommonButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount = () => {};

  render() {
     let {onPress}  = this.props;
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          borderRadius: 40,
          borderColor: "#39b3ff",
          borderWidth: 2,
          justifyContent: "center",
          alignItems: "center"
        }}
        onPress={()=>{onPress()}}
      >
        <Text
          style={{
            fontSize: width * 0.04,
            fontWeight: "bold",
            color: "#39b3ff"
          }}
        >
          {this.props.name}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center"
  }
});
