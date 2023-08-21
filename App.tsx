import ChatScreen from "@screens/ChatScreen";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import * as NavBar from "expo-navigation-bar";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "src/navigation/TabNavigator";

export default function App() {
  useEffect(() => {
    NavBar.setBackgroundColorAsync("white"), NavBar.setButtonStyleAsync("dark");
  }, []);

  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}
