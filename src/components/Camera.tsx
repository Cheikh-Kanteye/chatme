import {
  ActivityIndicator,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  Camera as ExpoCamera,
  CameraType,
  FlashMode,
  CameraCapturedPicture,
} from "expo-camera";
import { HEIGHT, OVERDRAG, SPACING, WIDTH } from "@misc/const";
import { ACCENT_COLOR, BACKGROUND_COLOR } from "@misc/colors";
import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";
import { images } from "@assets/index";
import SheetLayout from "./SheetLayout";
import SendPicture from "./SendPicture";
import {
  runOnJS,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Gesture } from "react-native-gesture-handler";

const MODAL_HEIGHT = HEIGHT + 60;

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
        width: 80,
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
  const [ratio, setRatio] = useState("16:9");
  const [displayRatio, setDisplayRatio] = useState(false);
  const [permission, requestPermission] = ExpoCamera.useCameraPermissions();
  const [flash, setFlash] = useState(FlashMode.off);
  const [isPicturReady, setIsPictureReady] = useState(false);
  const [capturedPhoto, setCapturedPhoto] =
    useState<CameraCapturedPicture | null>(null);
  const cameraRef = useRef<ExpoCamera | null>(null);
  const offset = useSharedValue(0);

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const toggleFlash = () => {
    setFlash((mode) => (mode === FlashMode.off ? FlashMode.on : FlashMode.off));
  };

  const toggleSheet = () => {
    setIsPictureReady(!isPicturReady);
    offset.value = 0;
  };

  const takePicktureAsync = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setCapturedPhoto(photo);
      setIsPictureReady(true);
    }
  };

  const pan = Gesture.Pan()
    .onChange((e) => {
      const delta = e.changeY + offset.value;
      const clamp = Math.max(-OVERDRAG, delta);
      offset.value = delta > 0 ? delta : withSpring(clamp);
    })
    .onFinalize(() => {
      if (offset.value < MODAL_HEIGHT / 3) {
        offset.value = withSpring(0);
      } else {
        offset.value = withTiming(MODAL_HEIGHT, {}, () => {
          runOnJS(toggleSheet)();
        });
      }
    });

  useEffect(() => {
    setDisplayRatio(true);
    setTimeout(() => setDisplayRatio(false), 1000);
  }, [ratio]);

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

  return (
    <View
      style={[
        StyleSheet.absoluteFillObject,
        { backgroundColor: BACKGROUND_COLOR },
      ]}
    >
      {isPicturReady ? (
        <SheetLayout
          gesture={pan}
          offset={offset}
          onPress={toggleSheet}
          sheetStyle={styles.sheet}
        >
          <SendPicture picture={capturedPhoto} />
        </SheetLayout>
      ) : (
        <View style={{ flex: 1, height: HEIGHT }}>
          <ExpoCamera
            ref={cameraRef}
            style={{ flex: 1 }}
            type={type}
            flashMode={flash}
            ratio={ratio}
          />
          <View style={styles.container}>
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
                <Button
                  icon={flash === FlashMode.off ? images.flasho : images.flash}
                  onPress={toggleFlash}
                  label="flash"
                />
                <Button
                  icon={images.flip}
                  onPress={toggleCameraType}
                  label="Flip"
                />
                <Button
                  icon={images.timer}
                  onPress={() => null}
                  label="timer"
                />
                <Button
                  icon={images.speed}
                  onPress={() => null}
                  label="speed"
                />
              </View>
              <TouchableOpacity style={styles.openGallery}>
                <Image
                  source={
                    capturedPhoto == null
                      ? images.defaultUser
                      : { uri: capturedPhoto.uri }
                  }
                  resizeMode="cover"
                  style={{ width: "100%", height: "100%" }}
                />
                <View style={styles.uploadIcon}>
                  <Feather name="upload-cloud" size={20} color={"white"} />
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={takePicktureAsync}
              style={styles.pickBtn}
            >
              <View
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 35,
                  backgroundColor: ACCENT_COLOR,
                }}
              />
            </TouchableOpacity>
          </View>
          {displayRatio && (
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "white",
                position: "absolute",
                alignSelf: "center",
                top: SPACING * 3,
              }}
            >
              {ratio}
            </Text>
          )}
          <TouchableOpacity
            style={{ position: "absolute", top: SPACING * 2.6, left: SPACING }}
            onPress={() =>
              setRatio(ratio == "1:1" ? "4:3" : ratio == "4:3" ? "16:9" : "1:1")
            }
          >
            <MaterialIcons name="aspect-ratio" size={24} color="white" />
          </TouchableOpacity>
        </View>
      )}
    </View>
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
  sheet: {
    width: WIDTH,
    height: MODAL_HEIGHT,
    backgroundColor: BACKGROUND_COLOR,
    overflow: "hidden",
    position: "absolute",
    bottom: -OVERDRAG,
  },
});
