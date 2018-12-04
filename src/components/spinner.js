import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import Modal from "react-native-modalbox";

export default class Spinner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.visible
    };
  }
  close = () => {
    this.setState({ visible: false });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible !== this.state.visible) {
      this.setState({ visible: false });
    }
  }
  render() {
    // alert(this.state.visible);
    return (
      <Modal
        backdrop={false}
        isOpen={this.state.visible}
        onClosed={() => this.setState({ visible: false })}
        style={{
          flex: 1,
          backgroundColor: "transparent",
          alignItems: "center",
          justifyContent: "center"
        }}
        position={"center"}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <ActivityIndicator color={"#02B2FE"} size={"large"} />

          <Text style={{ color: "#02B2FE" }}>{this.props.text}</Text>
        </View>
      </Modal>
    );
  }
}
