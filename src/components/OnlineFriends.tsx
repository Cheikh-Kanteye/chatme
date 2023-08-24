import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import React from "react";
import { SPACING } from "@misc/const";
import UserList, { OnlineUsers } from "@misc/UserList";

const OnlineFriends = () => {
  return (
    <View>
      <FlatList
        data={OnlineUsers}
        keyExtractor={(user) => user._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: SPACING }}
        renderItem={({ item }) => {
          return (
            <View
              style={{ justifyContent: "center", alignItems: "center", gap: 8 }}
            >
              <View style={styles.avatarContainer}>
                <View style={{ flex: 1, borderRadius: 25, overflow: "hidden" }}>
                  <Image
                    source={{ uri: item.avatar }}
                    style={StyleSheet.absoluteFillObject}
                    resizeMode="cover"
                  />
                </View>
                <View style={styles.dot} />
              </View>
              <Text>{item.firstName}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default OnlineFriends;

const styles = StyleSheet.create({
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "lightblue",
  },
  dot: {
    width: 15,
    height: 15,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "white",
    backgroundColor: "lime",
    position: "absolute",
    bottom: 0,
    right: -4,
  },
});
