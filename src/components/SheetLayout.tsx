import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";
import { BACKDROP_COLOR } from "@misc/colors";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
  useAnimatedStyle,
} from "react-native-reanimated";
import {
  ComposedGesture,
  GestureDetector,
  GestureType,
} from "react-native-gesture-handler";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface SheetLayoutProps {
  children: React.ReactNode;
  sheetStyle: ViewStyle;
  gesture: ComposedGesture | GestureType;
  offset: Animated.SharedValue<number>;
  onPress: () => void;
}

const SheetLayout = ({
  children,
  sheetStyle,
  gesture,
  offset,
  onPress,
}: SheetLayoutProps) => {
  const translateY = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value }],
  }));

  return (
    <>
      <AnimatedPressable
        style={[
          StyleSheet.absoluteFillObject,
          { backgroundColor: BACKDROP_COLOR },
        ]}
        entering={FadeIn}
        exiting={FadeOut}
        onPress={onPress}
      />
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[sheetStyle, translateY]}
          entering={SlideInDown.springify().damping(15)}
          exiting={SlideOutDown}
        >
          {children}
        </Animated.View>
      </GestureDetector>
    </>
  );
};

export default SheetLayout;

const styles = StyleSheet.create({});
