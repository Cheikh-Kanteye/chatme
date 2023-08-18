import { useEffect, useState } from "react";
import { Keyboard } from "react-native";
import { Gesture } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  withSpring,
  withTiming,
} from "react-native-reanimated";

interface Props {
  sheetH: number;
  offset: Animated.SharedValue<number>;
  overdrag: number;
  toggleSheet: () => void;
}
export function useSheetGestureHandler({
  sheetH,
  offset,
  overdrag,
  toggleSheet,
}: Props) {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const pan = Gesture.Pan()
    .onChange((e) => {
      if (!keyboardVisible) {
        const delta = e.changeY + offset.value;
        const clamp = Math.max(-overdrag, delta);
        offset.value = delta > 0 ? delta : withSpring(clamp);
      }
    })
    .onFinalize(() => {
      if (!keyboardVisible) {
        if (offset.value < sheetH / 3) {
          offset.value = withSpring(0);
        } else {
          offset.value = withTiming(sheetH, {}, () => {
            runOnJS(toggleSheet)();
          });
        }
      }
    });

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return pan;
}
