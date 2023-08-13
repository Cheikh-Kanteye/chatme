import ChatScreen from "@screens/ChatScreen";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import * as NavBar from "expo-navigation-bar";

export default function App() {
  useEffect(() => {
    NavBar.setBackgroundColorAsync("white"), NavBar.setButtonStyleAsync("dark");
  }, []);

  return (
    <>
      <StatusBar style="dark" />
      <ChatScreen />
    </>
  );
}
