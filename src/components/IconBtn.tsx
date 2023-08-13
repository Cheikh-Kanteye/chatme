import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { BACKGROUND_COLOR } from "@misc/colors";

interface IconBtnProps {
  icon: keyof typeof Ionicons.glyphMap;
}

const IconBtn = ({ icon }: IconBtnProps) => {
  return (
    <TouchableOpacity style={styles.btn}>
      <Ionicons name={icon} size={22} color={"black"} />
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
