import { PRIMARY_COLOR } from "@misc/colors";
import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
} from "react-native";

interface ActionProps {
  label: string;
  icon: ImageSourcePropType;
}

const Action = ({ label, icon }: ActionProps) => {
  return (
    <TouchableOpacity
      style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
    >
      <Image
        source={icon}
        style={{ width: 18, height: 18, tintColor: PRIMARY_COLOR }}
        resizeMode="contain"
      />
      <Text
        style={{
          fontSize: 14,
          color: PRIMARY_COLOR,
          textTransform: "capitalize",
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default Action;
