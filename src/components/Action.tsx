import { BACKGROUND_COLOR } from "@misc/colors";
import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
} from "react-native";

interface ActionProps {
  label: string;
  icon: ImageSourcePropType;
  onPress: () => void;
}

const Action = ({ label, icon, onPress }: ActionProps) => {
  return (
    <TouchableOpacity
      style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
      onPress={onPress}
    >
      <Image
        source={icon}
        style={{ width: 18, height: 18, tintColor: BACKGROUND_COLOR }}
        resizeMode="contain"
      />
      <Text
        style={{
          fontSize: 14,
          color: BACKGROUND_COLOR,
          textTransform: "capitalize",
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default Action;
