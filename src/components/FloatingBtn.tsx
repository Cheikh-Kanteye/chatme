import { ColorValue, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FLOAT_SIZE, SPACING } from "@misc/const";
import { BACKGROUND_COLOR } from "@misc/colors";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { mix } from "react-native-redash";

interface FloatingBtnProps {
  onPress: () => void;
  open: Animated.SharedValue<number>;
  toggle: boolean;
  color: ColorValue;
}
const FloatingBtn = ({ toggle, onPress, open, color }: FloatingBtnProps) => {
  const AnimatedIconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${mix(open.value, Math.PI / 4, 0)}rad` }],
  }));
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.moreActions,
        { backgroundColor: toggle ? BACKGROUND_COLOR : color },
      ]}
    >
      <Animated.View style={AnimatedIconStyle}>
        <Ionicons name={"add"} size={24} color={toggle ? color : "white"} />
      </Animated.View>
    </Pressable>
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
  },
});
