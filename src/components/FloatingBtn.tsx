import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { FLOAT_SIZE, SPACING } from "@misc/const";
import { BACKGROUND_COLOR, PRIMARY_COLOR } from "@misc/colors";

interface FloatingBtnProps {
  onPress: () => void;
  toggle: boolean;
}
const FloatingBtn = ({ toggle, onPress }: FloatingBtnProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.moreActions,
        { backgroundColor: toggle ? BACKGROUND_COLOR : PRIMARY_COLOR },
      ]}
    >
      <Ionicons
        name={toggle ? "close" : "add"}
        size={24}
        color={toggle ? PRIMARY_COLOR : "white"}
      />
    </TouchableOpacity>
  );
};

export default FloatingBtn;

const styles = StyleSheet.create({
  moreActions: {
    width: FLOAT_SIZE,
    height: FLOAT_SIZE,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.17,
    shadowRadius: 2.54,
    elevation: 3,
    position: "absolute",
    zIndex: 11,
    bottom: SPACING,
    left: SPACING + 8,
  },
});
