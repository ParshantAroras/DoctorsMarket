import { normalize } from "../config";
import {Platform } from "react-native";
 const type = {
  black:Platform.OS==='ios'?'SFUIDisplay-Black':'SF-UI-Display-Black',
  bold: Platform.OS==='ios'?'SFUIDisplay-Black':'SF-UI-Display-Black',
  heavy:Platform.OS==='ios'?'SFUIDisplay-Black':'SF-UI-Display-Black',
  medium: Platform.OS==='ios'?'SFUIDisplay-Black':'SF-UI-Display-Black',
  light: Platform.OS==='ios'?'SFUIDisplay-Black':'SF-UI-Display-Black',
};

const size = {
  h1: normalize(38),
  h2: normalize(34),
  h5: normalize(20),
  regular: normalize(17),
  medium: normalize(14)
};

const style = {
  h1: {
    fontFamily: type.base,
    fontSize: size.h1
  },
  h2: {
    fontWeight: "bold",
    fontSize: size.h2
  },
  h5: {
    fontFamily: type.base,
    fontSize: size.h5
  },
  normal: {
    fontFamily: type.base,
    fontSize: size.regular
  },
  description: {
    fontFamily: type.base,
    fontSize: size.medium
  },
  boldh1: {
    fontFamily: type.bold,
    fontSize: size.h1
  },
  boldh2: {
    fontFamily: type.bold,
    fontSize: size.h2
  }
};

export default {
  type,
  size,
  style
};
