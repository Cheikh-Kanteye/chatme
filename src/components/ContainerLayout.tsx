import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { SPACING } from "@misc/const";
import { View } from "react-native";

interface Props {
  children: React.ReactNode;
  Left?: React.ReactNode
  Middle?: React.ReactNode
  Right?: React.ReactNode
}

const ContainerLayout = ({ children }: Props) => {
  return (
    <SafeAreaView
      style={{ flex: 1, paddingHorizontal: SPACING, backgroundColor: "white" }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      ></View>
      {children}
    </SafeAreaView>
  );
};

export default ContainerLayout;
