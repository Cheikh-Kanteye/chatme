import { BACKGROUND_COLOR } from "@misc/colors";
import chroma from "chroma-js";
import {
  ColorValue,
  ImageSourcePropType,
  TouchableOpacity,
} from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

interface ActionProps {
  label: string;
  icon: ImageSourcePropType;
  color: ColorValue;
  onPress: () => void;
}

const Action = ({ label, icon, onPress, color }: ActionProps) => {
  const colorDark = chroma(color as string).luminance() < 0.5;
  const reColorText = useAnimatedStyle(() => ({
    color: colorDark ? "white" : "black",
  }));
  const restyleImg = useAnimatedStyle(() => ({
    tintColor: colorDark ? "white" : "black",
    width: 18,
    height: 18,
  }));
  return (
    <TouchableOpacity
      style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
      onPress={onPress}
    >
      <Animated.Image source={icon} style={restyleImg} resizeMode="contain" />
      <Animated.Text
        style={[
          {
            fontSize: 14,
            textTransform: "capitalize",
          },
          reColorText,
        ]}
      >
        {label}
      </Animated.Text>
    </TouchableOpacity>
  );
};

export default Action;
