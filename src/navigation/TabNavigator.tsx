import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabParamLists } from "@utils/type";
import Messages from "@screens/Messages";
import Status from "@screens/Status";
import Profile from "@screens/Profile";
import Call from "@screens/Call";
import TabBar from "@components/TabBar";

const Tab = createBottomTabNavigator<TabParamLists>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <TabBar {...{ props }} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="messages" component={Messages} />
      <Tab.Screen name="status" component={Status} />
      <Tab.Screen name="call" component={Call} options={{ tabBarBadge: 1 }} />
      <Tab.Screen name="profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
