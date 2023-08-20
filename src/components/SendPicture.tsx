import {
  View,
  Image,
  ImageSourcePropType,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import { CameraCapturedPicture } from "expo-camera";
import { R, SPACING } from "@misc/const";
import { images } from "@assets/index";
import IconBtn from "./IconBtn";
import { ACCENT_COLOR } from "@misc/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface IconProps {
  icon: ImageSourcePropType;
  onPress: () => void;
}

interface SendPictureProps {
  picture: CameraCapturedPicture | null;
}

const Icon = ({ icon, onPress }: IconProps) => {
  return (
    <TouchableOpacity
      style={{
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#06090e",
      }}
    >
      <Image
        source={icon}
        style={{ width: 18, height: 18, tintColor: "white" }}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

const SendPicture = ({ picture }: SendPictureProps) => {
  return (
    <ImageBackground source={{ uri: picture.uri }} style={styles.container}>
      <View style={styles.row}>
        <Icon icon={images.close} onPress={() => null} />
        <View style={styles.rowLeft}>
          <Icon icon={images.hd} onPress={() => null} />
          <Icon icon={images.crop} onPress={() => null} />
          <Icon icon={images.sticker} onPress={() => null} />
          <Icon icon={images.t} onPress={() => null} />
          <Icon icon={images.pencil} onPress={() => null} />
        </View>
      </View>
      <View style={{ paddingHorizontal: SPACING }}>
        <View style={styles.inputContainer}>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="image-plus"
              size={20}
              color={ACCENT_COLOR}
            />
          </TouchableOpacity>
          <TextInput
            placeholder="Add a caption..."
            style={[styles.input, { color: ACCENT_COLOR }]}
          />
        </View>
        <View style={styles.row}>
          <View style={styles.usernameC}>
            <Text
              style={{
                fontSize: 14,
                textTransform: "capitalize",
                color: ACCENT_COLOR,
              }}
            >
              {"user"}
            </Text>
          </View>
          <IconBtn
            icon="send"
            onPress={() => console.log("Sending photo...")}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default SendPicture;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: SPACING * 2,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: R,
    height: 45,
    marginTop: SPACING / 2,
    paddingHorizontal: 10,
    gap: 8,
  },
  row: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
    paddingHorizontal: SPACING / 2,
  },
  input: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
  rowLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: SPACING / 2,
  },
  usernameC: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: R,
    backgroundColor: "white",
  },
});
