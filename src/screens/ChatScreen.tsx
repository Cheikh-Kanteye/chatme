import {
  ColorValue,
  FlatList,
  ImageBackground,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { ACCENT_COLOR, BACKDROP_COLOR, BACKGROUND_COLOR } from "@misc/colors";
import {
  HEIGHT,
  MODAL_H,
  MODAL_W,
  OVERDRAG,
  R,
  SHEET_H,
  SPACING,
} from "@misc/const";
import { messages } from "@misc/messages";
import Message from "@components/Message";
import { useState } from "react";
import { images } from "@assets/index";
import ColorPicker from "@components/ColorPicker";
import ChatFooter from "@components/ChatFooter";
import ChatHeader from "@components/ChatHeader";

const defaultUser = require("@assets/images/defaultUser.jpg");
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const ChatScreen = () => {
  const [colorAccent, setColorAccent] = useState<ColorValue>(ACCENT_COLOR);
  const [toggle, setToggle] = useState(false);
  const [pickColor, setPickColor] = useState(false);
  const open = useSharedValue<number>(1);
  const offset = useSharedValue(0);
  const toggleSheet = () => {
    setPickColor(!pickColor);
    offset.value = 0;
  };

  const pan = Gesture.Pan()
    .onChange((e) => {
      const delta = e.changeY + offset.value;
      const clamp = Math.max(-OVERDRAG, delta);
      offset.value = delta > 0 ? delta : withSpring(clamp);
    })
    .onFinalize(() => {
      if (offset.value < SHEET_H / 3) {
        offset.value = withSpring(0);
      } else {
        offset.value = withTiming(SHEET_H, {}, () => {
          runOnJS(toggleSheet)();
        });
      }
    });

  const translateY = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value }],
  }));

  return (
    <GestureHandlerRootView style={styles.container}>
      <ImageBackground
        source={images.bg}
        resizeMode="cover"
        style={styles.container}
      >
        <ChatHeader
          profileImg={defaultUser}
          online
          username="Abdurrahman Client"
        />
        <View style={styles.messagesContainer}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={messages}
            inverted
            contentContainerStyle={styles.chatsContainer}
            renderItem={({ item }) => {
              return (
                <Message
                  message={item.message}
                  fromMe={item.from == "me"}
                  color={colorAccent}
                />
              );
            }}
            keyExtractor={(item) => item.id}
          />
        </View>
        <ChatFooter
          color={colorAccent}
          open={open}
          toggle={toggle}
          onToggle={() => {
            open.value = withTiming(open.value === 1 ? 0 : 1);
            setToggle(open.value === 1);
          }}
          toggleSheet={toggleSheet}
          setToggle={setToggle}
        />
        {pickColor && (
          <>
            <AnimatedPressable
              style={[
                StyleSheet.absoluteFillObject,
                { backgroundColor: BACKDROP_COLOR },
              ]}
              entering={FadeIn}
              exiting={FadeOut}
              onPress={() => setPickColor(false)}
            />
            <GestureDetector gesture={pan}>
              <Animated.View
                style={[styles.sheet, translateY]}
                entering={SlideInDown.springify().damping(15)}
                exiting={SlideOutDown}
              >
                <ColorPicker
                  onPick={(color: ColorValue) => {
                    setColorAccent(color);
                    toggleSheet();
                  }}
                />
              </Animated.View>
            </GestureDetector>
          </>
        )}
      </ImageBackground>
    </GestureHandlerRootView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  header: {
    height: HEIGHT * 0.15,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING,
    paddingTop: SPACING * 2,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  chatsContainer: {
    gap: 20,
    padding: 16,
    flexDirection: "column-reverse",
  },
  messagesContainer: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    zIndex: 10,
    paddingHorizontal: SPACING,
    paddingBottom: 10,
  },
  items: {
    width: MODAL_W,
    height: MODAL_H,
  },
  actionsBtn: {
    width: MODAL_W,
    height: MODAL_H,
    borderRadius: 20,
    padding: SPACING,
    paddingTop: R + SPACING / 2,
    position: "absolute",
    top: 0,
    left: 0,
    gap: SPACING,
  },
  sheet: {
    backgroundColor: "white",
    padding: SPACING,
    height: 220,
    width: "100%",
    position: "absolute",
    bottom: -OVERDRAG * 1.1,
    borderTopRightRadius: R,
    borderTopLeftRadius: R,
    zIndex: 11,
  },
});
