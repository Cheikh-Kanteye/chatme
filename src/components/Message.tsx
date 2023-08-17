import { ColorValue, StyleSheet, Text, View } from "react-native";
import React from "react";
import { WIDTH } from "@misc/const";
import { ACCENT_COLOR, BACKGROUND_COLOR, PRIMARY_COLOR } from "@misc/colors";

interface MessageProps {
  fromMe?: boolean;
  message: string;
  color: ColorValue;
}

const Message: React.FC<MessageProps> = ({ fromMe, message, color }) => {
  return (
    <Text
      style={[
        fromMe
          ? { ...styles.messageFromMe, backgroundColor: color }
          : { ...styles.messageFromThem, color },
        styles.messageCommon,
      ]}
    >
      {message}
    </Text>
  );
};

export default Message;

const styles = StyleSheet.create({
  messageCommon: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    maxWidth: WIDTH * 0.8,
  },
  messageFromThem: {
    borderTopLeftRadius: 0,
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: "white",
    alignSelf: "flex-start",
  },
  messageFromMe: {
    borderTopRightRadius: 0,
    color: "white",
    alignSelf: "flex-end",
  },
});
