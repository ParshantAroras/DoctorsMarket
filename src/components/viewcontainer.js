import React from "react";

import { colors } from "../config";
import { View } from "react-native";
type Props = {
  children?: React.Element<*>
};

export const ViewContainer = ({ children }: Props) => (
  <View
    style={{
      flex: 1,
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "stretch",
      backgroundColor: colors.white
    }}
  >
    {children}
  </View>
);

ViewContainer.defaultProps = {
  children: null
};
