import { ColorValue, StyleSheet } from "react-native";
import React from "react";
import { WIDTH } from "@misc/const";
import { messages } from "@misc/messages";
import Animated, {
  useAnimatedStyle,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import isColorDark from "@utils/isColorDark";

interface MessageProps {
  fromMe?: boolean;
  message: string;
  id: string;
  color: Animated.SharedValue<ColorValue>;
}

const Message: React.FC<MessageProps> = ({ fromMe, message, color, id }) => {
  const index = messages.findIndex((msg) => msg.id === id);

  const bg = useAnimatedStyle(() => ({
    backgroundColor: withDelay(100 * index, withTiming(color.value as never)),
  }));
  const textStyle = useAnimatedStyle(() => ({
    color: withDelay(
      50 * index,
      isColorDark(color.value) ? withTiming("white") : withTiming("black")
    ),
  }));

  return (
    <Animated.View
      style={[
        fromMe ? [styles.messageFromMe, bg] : styles.messageFromThem,
        styles.messageCommon,
      ]}
    >
      <Animated.Text style={[fromMe ? textStyle : { color: "black" }]}>
        {message}
      </Animated.Text>
    </Animated.View>
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
    color: "black",
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: "white",
    alignSelf: "flex-start",
  },
  messageFromMe: {
    borderTopRightRadius: 0,
    alignSelf: "flex-end",
  },
});
