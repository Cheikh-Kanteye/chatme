import {
  ColorValue,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import FloatingBtn from "./FloatingBtn";
import {
  FLOAT_SIZE,
  HEIGHT,
  MODAL_H,
  MODAL_W,
  R,
  SPACING,
  WIDTH,
} from "@misc/const";
import { BACKGROUND_COLOR } from "@misc/colors";
import { Ionicons } from "@expo/vector-icons";
import Animated, { withTiming } from "react-native-reanimated";
import SvgPath from "./SvgPath";
import { ACTIONS_LIST } from "@misc/ACTION_LIST";
import Action from "./Action";

interface ChatFooterProps {
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  color: Animated.SharedValue<ColorValue>;
  open: Animated.SharedValue<number>;
  toggle: boolean;
  toggleSheet: () => void;
  onToggle: () => void;
  openPool: () => void;
}

const ChatFooter = ({
  onToggle,
  color,
  toggle,
  open,
  setToggle,
  toggleSheet,
  openPool,
}: ChatFooterProps) => {
  const [inputFocused, setFocused] = useState(false);

  type actionType = () => void;
  const doAction = (action: actionType) => {
    setTimeout(() => {
      setToggle(false);
    }, 200);
    if (toggle) {
      action();
    }
    open.value = withTiming(open.value === 1 ? 0 : 1);
  };

  const actonPressed = (action: string) => {
    switch (action) {
      case "themes":
        doAction(toggleSheet);
        break;
      case "polling":
        doAction(openPool);
        break;
      case "camera":
        doAction(() => console.log("Camera"));
        break;
      case "document":
        doAction(() => console.log("Document"));
        break;
      case "photo & video":
        doAction(() => console.log("Photo & Video"));
        break;
      case "location":
        doAction(() => console.log("Location"));
        break;
      case "contact":
        doAction(() => console.log("Contact"));
        break;
      default:
        doAction(() => console.log("wrong case!"));
        break;
    }
  };

  return (
    <View style={styles.footer}>
      {toggle && (
        <View style={styles.overlay}>
          <View>
            <SvgPath {...{ color, open }} />
            <View style={styles.actionsBtn}>
              {ACTIONS_LIST.map((item) => {
                return (
                  <Action
                    key={item.id}
                    color={color.value}
                    label={item.label}
                    icon={item.icon}
                    onPress={() => {
                      open.value = withTiming(0);
                      setToggle(false);
                      actonPressed(item.label);
                    }}
                  />
                );
              })}
            </View>
          </View>
        </View>
      )}
      <FloatingBtn
        onPress={onToggle}
        color={color}
        open={open}
        toggle={toggle}
      />
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
  );
};

export default ChatFooter;

const styles = StyleSheet.create({
  footer: {
    height: HEIGHT * 0.1,
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    borderTopRightRadius: 24,
    padding: 16,
    gap: SPACING / 2,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    zIndex: -1,
    paddingLeft: 10,
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
});
