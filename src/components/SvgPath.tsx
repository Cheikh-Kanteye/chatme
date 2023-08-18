import { ColorValue, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Mask, Path, Rect, Svg } from "react-native-svg";
import { FLOAT_SIZE, MODAL_H, MODAL_W, R, d } from "@misc/const";
import Animated, {
  interpolate,
  useAnimatedProps,
} from "react-native-reanimated";
import { mix } from "react-native-redash";

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface SvgPathProps {
  color: Animated.SharedValue<ColorValue>;
  open: Animated.SharedValue<number>;
}

const AnimatedRect = Animated.createAnimatedComponent(Rect);

const SvgPath = ({ color, open }: SvgPathProps) => {
  const animatedProps = useAnimatedProps(() => {
    const h = mix(open.value, MODAL_H, 0);
    const w = interpolate(h, [0, MODAL_H], [0, MODAL_W]);
    const y = interpolate(h, [0, h], [0, MODAL_H - h - R + FLOAT_SIZE]);
    return {
      rx: R,
      ry: R,
      width: w,
      height: h + R,
      x: 0,
      y,
    };
  });
  return (
    <Svg width={MODAL_W} height={MODAL_H} fillRule="evenodd">
      <Mask id="mask">
        <AnimatedRect animatedProps={animatedProps} fill={"white"} />
      </Mask>
      <Path d={d} fill={color.value} mask="url(#mask)" />
    </Svg>
  );
};

export default SvgPath;

const styles = StyleSheet.create({});
