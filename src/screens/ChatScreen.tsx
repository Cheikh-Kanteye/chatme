import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BACKGROUND_COLOR } from "@misc/colors";
import {
  FLOAT_SIZE,
  HEIGHT,
  MODAL_H,
  MODAL_W,
  SPACING,
  WIDTH,
  d,
} from "@misc/const";
import IconBtn from "@components/IconBtn";
import { messages } from "@misc/messages";
import Message from "@components/Message";
import { useState } from "react";
import { Path, Svg } from "react-native-svg";
import FloatingBtn from "@components/FloatingBtn";
import Action from "@components/Action";
import { ACTIONS_LIST } from "@misc/ACTION_LIST";
import { images } from "@assets/index";

const defaultUser = require("@assets/images/defaultUser.jpg");

const ChatScreen = () => {
  const [toggle, setToggle] = useState(false);
  const [inputFocused, setFocused] = useState(false);
  return (
    <ImageBackground
      source={images.bg}
      resizeMode="cover"
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn}>
          <Ionicons name="ios-chevron-back-sharp" size={24} color={"black"} />
        </TouchableOpacity>
        <Pressable style={styles.userInfo}>
          <View style={styles.userImage}>
            <Image
              source={defaultUser}
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
            />
          </View>
          <View>
            <Text>Abdurrahman Client</Text>
            <Text>Online</Text>
          </View>
        </Pressable>
        <View style={styles.actions}>
          <IconBtn icon="videocam-outline" />
          <IconBtn icon="call-outline" />
        </View>
      </View>
      <View style={styles.messagesContainer}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={messages}
          inverted
          contentContainerStyle={styles.chatsContainer}
          renderItem={({ item }) => {
            return (
              <Message message={item.message} fromMe={item.from == "me"} />
            );
          }}
          keyExtractor={(item) => item.id}
        />
      </View>
      {toggle && (
        <View style={styles.overlay}>
          <View>
            <Svg width={MODAL_W} height={MODAL_H} fillRule="evenodd">
              <Path
                d={d}
                fill="rgba(0, 0, 0, 0.1)"
                transform="translate(4, 4)"
              />
              <Path d={d} fill={"white"} />
            </Svg>
            <View style={styles.actionsBtn}>
              {ACTIONS_LIST.map((item) => {
                return (
                  //@ts-ignore
                  <Action key={item.id} label={item.label} icon={item.icon} />
                );
              })}
            </View>
          </View>
        </View>
      )}
      <FloatingBtn onPress={() => setToggle(!toggle)} toggle={toggle} />
      <View style={styles.footer}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Type Here..."
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            style={styles.input}
          />
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons
              name={inputFocused ? "send-outline" : "mic-outline"}
              size={22}
              color={"black"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
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
  backBtn: {
    width: 38,
    height: 38,
    justifyContent: "center",
    alignItems: "center",
  },
  userInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING / 2,
  },
  userImage: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    overflow: "hidden",
  },
  actions: { flexDirection: "row", gap: 8, alignItems: "flex-end" },
  messagesContainer: {
    flex: 1,
  },
  footer: {
    height: HEIGHT * 0.1,
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 16,
    gap: SPACING / 2,
  },
  inputContainer: {
    flex: 1,
    width: WIDTH - FLOAT_SIZE - SPACING * 2.5,
    height: FLOAT_SIZE,
    flexDirection: "row",
    paddingHorizontal: SPACING,
    backgroundColor: BACKGROUND_COLOR,
    borderRadius: 20,
    alignItems: "center",
    alignSelf: "flex-end",
    overflow: "hidden",
  },
  input: {
    flex: 1,
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    zIndex: 10,
    padding: SPACING,
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
    paddingTop: SPACING * 1.5,
    position: "absolute",
    top: 0,
    left: 0,
    gap: SPACING,
  },
});
