import React, { Component } from "react";
import {
  Modal,
  ActivityIndicator,
  Text,
  View,
  DeviceEventEmitter
} from "react-native";
import Swiper from "react-native-swiper";
import OpenAppSettings from "react-native-app-settings";
import { Icon } from "react-native-elements";
import Button from "../../components/button";
import { ViewContainer } from "../../components/viewcontainer";
import { colors } from "../../config";
import { resetNavigationTo } from "../../utils";

//import Button from "../../components/button";
const styles = {
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB"
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97CAE5"
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92BBD9"
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold"
  }
};
export default class WalkScreen extends Component {
  showToast = message => {
    DeviceEventEmitter.emit("showToast", "Hi i am shimil here");
  };
  loginUser = () => {
    const {
      navigation: { navigate }
    } = this.props;
    //alert("huu");
    navigate("Auth");
    //resetNavigationTo("Main", navigation);
  };

  render() {
    return (
      <ViewContainer>
        <Swiper style={styles.wrapper}>
          <View style={styles.slide1}>
            <Text style={styles.text}>Hello Swiper</Text>
          </View>
          <View style={styles.slide2}>
            <Text style={styles.text}>Beautiful</Text>
          </View>
          <View style={styles.slide3}>
            <Text style={styles.text}>And simple</Text>
          </View>
        </Swiper>
        <View
          style={{
            position: "absolute",
            right: 0,
            left: 0,
            bottom: 80,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Button
            label={"Get started"}
            disabled={false}
            onPress={() => this.loginUser()}
            styles={{
              button: styles.btnStyle,

              label: [
                styles.btnTextStyle,
                {
                  fontSize: 20
                }
              ]
            }}
          />
        </View>
      </ViewContainer>
    );
  }
}
