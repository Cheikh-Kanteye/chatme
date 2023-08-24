import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ColorValue,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { ACCENT_COLOR, BACKGROUND_COLOR } from "@misc/colors";
import isColorDark from "@utils/isColorDark";

interface IconBtnProps {
  icon: keyof typeof Ionicons.glyphMap;
  color?: ColorValue;
  primary?: boolean;
  onPress: () => void;
}

const IconBtn = ({ icon, color = ACCENT_COLOR, onPress }: IconBtnProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.btn, { backgroundColor: color }]}
    >
      <Ionicons
        name={icon}
        size={22}
        color={isColorDark(color) ? "white" : "black"}
      />
    </TouchableOpacity>
  );
};

export default IconBtn;

const styles = StyleSheet.create({
  btn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: BACKGROUND_COLOR,
  },
});
