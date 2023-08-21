import { ACCENT_COLOR, BACKGROUND_COLOR } from "@misc/colors";
import { HEIGHT, R, SPACING } from "@misc/const";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageSourcePropType,
  Image,
} from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { images } from "@assets/index";
import { Ionicons } from "@expo/vector-icons";
import isColorDark from "@utils/isColorDark";

function TabBar({ props }: { props: BottomTabBarProps }) {
  const { state, descriptors, navigation } = props;
  const tabItems = [...state.routes.map((route) => route)];
  tabItems.splice(2, 0, { key: "add", name: "add" });

  return (
    <View style={styles.tabBar}>
      {tabItems.map((route, index) => {
        const isFocused = state.index === index;
        const tint = isFocused ? ACCENT_COLOR : "#222";
        let icon: ImageSourcePropType | null = null;
        let label = "";

        switch (route.name) {
          case "status":
            label = "status";
            icon = isFocused ? images.grid : images.grido;
            break;
          case "call":
            label = "call";
            icon = isFocused ? images.call : images.callo;
            break;
          case "profile":
            label = "profile";
            icon = isFocused ? images.user : images.usero;
            break;
          case "messages":
            label = "message";
            icon = isFocused ? images.chat : images.chato;
            break;
        }

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <View style={styles.btn} key={route.key}>
            {route.name === "add" ? (
              <TouchableOpacity
                style={{
                  borderRadius: 50,
                  height: 50,
                  width: 50,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: ACCENT_COLOR,
                }}
              >
                <Ionicons
                  name="add"
                  size={22}
                  color={isColorDark(ACCENT_COLOR) ? "white" : "black"}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                onPress={onPress}
                onLongPress={onLongPress}
                style={styles.btn}
              >
                <Image
                  source={icon}
                  style={{ width: 16, height: 16, tintColor: tint }}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    color: tint,
                    textTransform: "capitalize",
                    fontSize: 10,
                  }}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        );
      })}
    </View>
  );
}

export default TabBar;

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: HEIGHT * 0.1,
    backgroundColor: BACKGROUND_COLOR,
    margin: SPACING / 2,
    borderRadius: R * 2,
  },
  btn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
});
