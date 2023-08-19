import {
  ActivityIndicator,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Camera as ExpoCamera, CameraType, FlashMode } from "expo-camera";
import { HEIGHT, SPACING } from "@misc/const";
import { ACCENT_COLOR } from "@misc/colors";
import { Ionicons, Feather } from "@expo/vector-icons";
import { images } from "@assets/index";

interface ButtonProps {
  icon: ImageSourcePropType;
  label: string;
  onPress: () => void;
}

interface CameraProps {
  setOpenCamera: React.Dispatch<React.SetStateAction<boolean>>;
}

const Button = ({ icon, label, onPress }: ButtonProps) => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        gap: 6,
      }}
    >
      <TouchableOpacity style={styles.btn} onPress={onPress}>
        <Image
          source={icon}
          resizeMode="contain"
          style={{ width: 20, height: 20, tintColor: "white" }}
        />
      </TouchableOpacity>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const Camera = ({ setOpenCamera }: CameraProps) => {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = ExpoCamera.useCameraPermissions();
  const [flash, setFlash] = useState(FlashMode.off);

  if (!permission) {
    requestPermission();
    return (
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: "rgba(0, 0, 0,0.3)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size={"large"} color={ACCENT_COLOR} />
      </View>
    );
  }

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const toggleFlash = () => {
    setFlash((mode) => (mode === FlashMode.off ? FlashMode.on : FlashMode.off));
  };

  return (
    <ExpoCamera style={styles.container} type={type} flashMode={flash}>
      <View style={styles.btnGroup}>
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={() => setOpenCamera(false)}
        >
          <Ionicons name="close" size={22} color={"white"} />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
            gap: SPACING,
            paddingBottom: HEIGHT >= 720 ? SPACING * 4.5 : SPACING * 3,
          }}
        >
          <Button icon={images.flash} onPress={toggleFlash} label="flash" />
          <Button icon={images.flip} onPress={toggleCameraType} label="Flip" />
          <Button icon={images.timer} onPress={() => null} label="timer" />
          <Button icon={images.speed} onPress={() => null} label="speed" />
        </View>
        <TouchableOpacity style={styles.openGallery}>
          <Image
            source={images.defaultUser}
            resizeMode="cover"
            style={{ width: "100%", height: "100%" }}
          />
          <View style={styles.uploadIcon}>
            <Feather name="upload-cloud" size={20} color={"white"} />
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.pickBtn}>
        <View
          style={{
            width: 35,
            height: 35,
            borderRadius: 35,
            backgroundColor: ACCENT_COLOR,
          }}
        />
      </TouchableOpacity>
    </ExpoCamera>
  );
};

export default Camera;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    padding: SPACING,
    paddingBottom: SPACING * 3,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  btnGroup: {
    position: "absolute",
    width: 60,
    height: HEIGHT,
    bottom: 0,
    right: 0,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: SPACING * 3,
  },
  closeBtn: {
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  openGallery: {
    width: 50,
    height: 50,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "white",
    overflow: "hidden",
  },
  btn: {
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: ACCENT_COLOR,
    borderRadius: 45,
  },
  label: {
    textTransform: "capitalize",
    color: "white",
    fontSize: 14,
  },
  uploadIcon: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  pickBtn: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 6,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});
