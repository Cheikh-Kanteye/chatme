import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { SPACING } from "@misc/const";

const ContainerLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SafeAreaView
      style={{ flex: 1, paddingHorizontal: SPACING, backgroundColor: "white" }}
    >
      {children}
    </SafeAreaView>
  );
};

export default ContainerLayout;
