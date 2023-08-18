import { ColorValue, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FLOAT_SIZE } from "@misc/const";
import { BACKGROUND_COLOR } from "@misc/colors";
import Animated, {
  useAnimatedStyle,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { mix } from "react-native-redash";
import isColorDark from "@utils/isColorDark";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);

interface FloatingBtnProps {
  onPress: () => void;
  open: Animated.SharedValue<number>;
  toggle: boolean;
  color: Animated.SharedValue<ColorValue>;
}
const FloatingBtn = ({ toggle, onPress, open, color }: FloatingBtnProps) => {
  const AnimatedIconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${mix(open.value, Math.PI / 4, 0)}rad` }],
  }));

  const animStyle = useAnimatedStyle(() => ({
    backgroundColor: withDelay(
      100,
      toggle ? withTiming("white") : withTiming(color.value as never)
    ),
  }));
  const iconStyle = useAnimatedStyle(() => ({
    color: isColorDark(color.value) ? withTiming("white") : withTiming("black"),
  }));

  return (
    <AnimatedPressable
      onPress={onPress}
      style={[styles.moreActions, animStyle]}
    >
      <Animated.View style={AnimatedIconStyle}>
        <AnimatedIcon
          name={"add"}
          size={24}
          style={[toggle ? { color: "black" } : iconStyle]}
        />
      </Animated.View>
    </AnimatedPressable>
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
