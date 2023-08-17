import {
  View,
  Text,
  Pressable,
  Image,
  ImageSourcePropType,
  StyleSheet,
} from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { HEIGHT, SPACING } from "@misc/const";
import { Ionicons } from "@expo/vector-icons";
import IconBtn from "./IconBtn";

interface ChatHeaderProps {
  profileImg: ImageSourcePropType;
  username: string;
  online: boolean;
}

const ChatHeader = ({ profileImg, username, online }: ChatHeaderProps) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backBtn}>
        <Ionicons name="ios-chevron-back-sharp" size={24} color={"black"} />
      </TouchableOpacity>
      <Pressable style={styles.userInfo}>
        <View style={styles.userImage}>
          <Image
            source={profileImg}
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
          />
        </View>
        <View>
          <Text>{username}</Text>
          <Text>{online ? "Online" : "Offline"}</Text>
        </View>
      </Pressable>
      <View style={styles.actions}>
        <IconBtn icon="videocam-outline" />
        <IconBtn icon="call-outline" />
      </View>
    </View>
  );
};

export default ChatHeader;

const styles = StyleSheet.create({
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
});
