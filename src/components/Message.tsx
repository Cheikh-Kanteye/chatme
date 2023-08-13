import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { WIDTH } from "@misc/const";
import { BACKGROUND_COLOR, PRIMARY_COLOR } from "@misc/colors";

interface MessageProps {
  fromMe?: boolean;
  message: string;
}

const Message: React.FC<MessageProps> = ({ fromMe, message }) => {
  return (
    <Text
      style={[
        fromMe ? styles.messageFromMe : styles.messageFromThem,
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
    color: PRIMARY_COLOR,
    backgroundColor: "white",
    alignSelf: "flex-start",
  },
  messageFromMe: {
    borderTopRightRadius: 0,
    backgroundColor: PRIMARY_COLOR,
    color: "white",
    alignSelf: "flex-end",
  },
});
