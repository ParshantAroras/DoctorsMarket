import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Keyboard
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  colors,
  normalize,
  scale,
  verticalScale,
  moderateScale,
  fonts
} from "../../config";
import { TextField } from "react-native-material-textfield";
import Button from "../../components/button";
const { height, width } = Dimensions.get("window");
import { reset } from "../../actions/Loginactions";
export default class ChangeProfileImage extends Component {
  componentDidMount(){
    console.log('this.propsdssss',this.props)
  }
  render() {
    const {
      navigation: { navigate }
    } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <KeyboardAwareScrollView
          style={{
            flex: 1,
            backgroundColor: "#fff",
            paddingHorizontal: scale(14),
            paddingTop: verticalScale(8)
          }}
        >
          <TextField
            ref="gmcnumber"
            value={""}
            defaultValue={""}
            keyboardType="default"
            autoCapitalize="none"
            autoCorrect={false}
            enablesReturnKeyAutomatically={true}
            onFocus={this.onFocus}
            onChangeText={text =>
              SignupUpdate({ prop: "gmcnumber", value: text })
            }
            onSubmitEditing={() => Keyboard.dismiss()}
            returnKeyType="next"
            label="Name"
            error={""}
            tintColor={"#02B2FE"}
          />
          <TextField
            ref="gmcnumber"
            value={""}
            defaultValue={""}
            keyboardType="default"
            autoCapitalize="none"
            autoCorrect={false}
            enablesReturnKeyAutomatically={true}
            onFocus={this.onFocus}
            onChangeText={text =>
              SignupUpdate({ prop: "gmcnumber", value: text })
            }
            onSubmitEditing={() => Keyboard.dismiss()}
            returnKeyType="next"
            label="Email address"
            error={""}
            tintColor={"#02B2FE"}
          />
          <TextField
            ref="gmcnumber"
            value={""}
            defaultValue={""}
            keyboardType="default"
            autoCapitalize="none"
            autoCorrect={false}
            enablesReturnKeyAutomatically={true}
            onFocus={this.onFocus}
            onChangeText={text =>
              SignupUpdate({ prop: "gmcnumber", value: text })
            }
            onSubmitEditing={() => Keyboard.dismiss()}
            returnKeyType="next"
            label="Phone number"
            error={""}
            tintColor={"#02B2FE"}
          />
          <TextField
            ref="gmcnumber"
            value={""}
            defaultValue={""}
            keyboardType="default"
            autoCapitalize="none"
            autoCorrect={false}
            enablesReturnKeyAutomatically={true}
            onFocus={this.onFocus}
            onChangeText={text =>
              SignupUpdate({ prop: "gmcnumber", value: text })
            }
            onSubmitEditing={() => Keyboard.dismiss()}
            returnKeyType="next"
            label="Telephone number"
            error={""}
            tintColor={"#02B2FE"}
          />
          <TextField
            ref="gmcnumber"
            value={""}
            defaultValue={""}
            keyboardType="default"
            autoCapitalize="none"
            autoCorrect={false}
            enablesReturnKeyAutomatically={true}
            onFocus={this.onFocus}
            onChangeText={text =>
              SignupUpdate({ prop: "gmcnumber", value: text })
            }
            onSubmitEditing={() => Keyboard.dismiss()}
            returnKeyType="next"
            label="Adreess"
            error={""}
            tintColor={"#02B2FE"}
          />

          <View
            style={{
              flex: 0.2,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Button
              label={"LOGIN"}
              disabled={false}
              onPress={this.onSubmit}
              styles={{
                button: {
                  height: verticalScale(50),
                  width: width - 70,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 5,
                  paddingLeft: 15,
                  paddingRight: 15,
                  borderRadius: 50,
                  marginVertical: verticalScale(40)
                },

                label: [
                  {
                    fontSize: normalize(16),
                    color: "#FFFFFF",
                    letterSpacing: 5
                  }
                ]
              }}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}
