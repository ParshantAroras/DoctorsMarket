import React, { Component } from "react";

import { Text, View, StyleSheet } from "react-native";

import Icon from "react-native-vector-icons/MaterialIcons";

export default function CheckBox(props) {
  const iconName = props.checked
    ? props.checkedIconName
    : props.uncheckedIconName;
  const styles = StyleSheet.create({
    label: {
      fontSize: 16
    },
    icon: {
      marginLeft: -10
    }
  });

  function onPress() {
    props.onPress(!props.checked);
  }

  return (
    <Icon.Button
      {...props}
      name={iconName}
      size={props.size}
      backgroundColor={props.backgroundColor}
      color={props.color}
      iconStyle={[
        styles.icon,
        props.iconStyle,
        props.checked && props.checkedIconStyle
      ]}
      onPress={onPress}
      activeOpacity={props.activeOpacity}
      underlayColor={props.underlayColor}
      borderRadius={props.borderRadius}
    >
      <Text style={[styles.label, props.labelStyle]}>{props.label}</Text>
    </Icon.Button>
  );
}

CheckBox.defaultProps = {
  size: 30,
  checked: false,
  labelStyle: {},
  iconStyle: {},
  checkedIconStyle: { borderWidth: 0.1 },
  color: "#02B2FE",
  backgroundColor: "#fff",
  underlayColor: "#02B2FE",
  activeOpacity: 1,
  borderRadius: 1,
  uncheckedIconName: "check-box-outline-blank",
  checkedIconName: "check-box"
};
