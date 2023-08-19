import {
  ColorValue,
  FlatList,
  ImageBackground,
  StyleSheet,
  View,
} from "react-native";
import { useSharedValue, withTiming } from "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ACCENT_COLOR, BACKGROUND_COLOR } from "@misc/colors";
import {
  HEIGHT,
  MODAL_H,
  MODAL_W,
  OVERDRAG,
  POOL_OVERDRAG,
  PollingSheetH,
  R,
  SHEET_H,
  SPACING,
  WIDTH,
} from "@misc/const";
import { messages } from "@misc/messages";
import Message from "@components/Message";
import { useState } from "react";
import { images } from "@assets/index";
import ColorPicker from "@components/ColorPicker";
import ChatFooter from "@components/ChatFooter";
import ChatHeader from "@components/ChatHeader";
import { useSheetGestureHandler } from "@hooks/useSheetGestureHandler";
import SheetLayout from "@components/SheetLayout";
import { Camera, Polling } from "@components/index";

const defaultUser = require("@assets/images/defaultUser.jpg");
const ChatScreen = () => {
  const colorAccent = useSharedValue<ColorValue>(ACCENT_COLOR);
  const [toggle, setToggle] = useState(false);
  const [pickColor, setPickColor] = useState(false);
  const [openCamera, setOpenCamera] = useState(false);
  const [pool, setPool] = useState(false);
  const open = useSharedValue<number>(1);
  const themeOffset = useSharedValue(0);
  const poolOffset = useSharedValue(0);

  const toggleSheet = () => {
    setPickColor(!pickColor);
    themeOffset.value = 0;
  };
  const openPool = () => {
    setPool(!pool);
    poolOffset.value = 0;
  };

  const toggleCamera = () => {
    setOpenCamera(!openCamera);
  };

  const themePan = useSheetGestureHandler({
    sheetH: SHEET_H,
    offset: themeOffset,
    toggleSheet,
    overdrag: OVERDRAG,
  });

  const pollingPan = useSheetGestureHandler({
    sheetH: PollingSheetH,
    offset: themeOffset,
    toggleSheet: openPool,
    overdrag: POOL_OVERDRAG,
  });

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
                  id={item.id}
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
          toggleCamera={toggleCamera}
          setToggle={setToggle}
          openPool={openPool}
        />
        {pickColor && (
          <SheetLayout
            gesture={themePan}
            offset={themeOffset}
            sheetStyle={styles.sheet}
            onPress={toggleSheet}
          >
            <ColorPicker
              onPick={(color: ColorValue) => {
                colorAccent.value = color;
                toggleSheet();
              }}
            />
          </SheetLayout>
        )}
        {pool && (
          <SheetLayout
            gesture={pollingPan}
            offset={poolOffset}
            sheetStyle={styles.poolSheet}
            onPress={openPool}
          >
            <Polling color={colorAccent} />
          </SheetLayout>
        )}
        {openCamera && <Camera setOpenCamera={setOpenCamera} />}
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
  poolSheet: {
    width: WIDTH,
    height: PollingSheetH,
    backgroundColor: BACKGROUND_COLOR,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: SPACING,
    paddingTop: R + SPACING,
  },
});
