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

export default class ConditionalButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      button1: true,
      button2: false
    };
  }
  componentWillMount = () => {};

  render() {
    let {callback} = this.props;
    return (
      <View
        style={{
          flex: 1,

          flexDirection: "row"
        }}
      >
        <TouchableOpacity
          onPress={() => {this.setState({ button1: true, button2: false }); callback(false) }}
          style={{
            flex: 0.5,
            alignItems: "center",
            justifyContent: "center",
            borderBottomLeftRadius: 40,
            borderTopLeftRadius: 40,
            borderColor: this.state.button1 ? "#39b3ff" : "#D8D8D8",
            borderWidth: 1
          }}
        >
          <Text
            style={{
              fontSize: width * 0.035,
              fontWeight: "bold",
              color: this.state.button1 ? "#39b3ff" : "#D8D8D8"
            }}
          >
            {this.props.name1}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {this.setState({ button1: false, button2: true });callback(true)}}
          style={{
            flex: 0.5,
            alignItems: "center",
            justifyContent: "center",
            borderBottomRightRadius: 40,
            borderTopRightRadius: 40,
            borderColor: this.state.button2 ? "#39b3ff" : "lightgray",
            borderWidth: 1
          }}
        >
          <Text
            style={{
              fontSize: width * 0.035,
              fontWeight: "bold",
              color: this.state.button2 ? "#39b3ff" : "lightgray"
            }}
          >
            {this.props.name2}
          </Text>
        </TouchableOpacity>
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
