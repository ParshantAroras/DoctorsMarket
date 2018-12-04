'use strict';
import { Linking, Platform } from "react-native";

export function telephone(phoneNumber){
	Linking.canOpenURL("tel:" +phoneNumber).
    then(supported => {
      if (!supported) {
        console.log("Can't handle => " + phoneNumber);
      } else {
        return Linking.openURL("tel:" + phoneNumber)
      }}).catch(err => console.error('An error occurred', err));
};