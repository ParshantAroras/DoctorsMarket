import { Alert } from "react-native";
import { Toast } from "native-base";
import {
    colors,
    normalize,
    scale,
    verticalScale,
    moderateScale,
    fonts
  } from "../config";
export const toast = ({text="",position="bottom", type="success", duration=5000})=>{
    Toast.show({text, position, buttonText:"ok", type, duration,style: {
        backgroundColor: "#02B2FE"
       },
       textStyle:{
        fontFamily: fonts.fontPrimaryLight,
       }
    
    });
}
