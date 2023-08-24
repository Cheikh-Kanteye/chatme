import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  FlatList,
} from "react-native";
import ContainerLayout from "@components/ContainerLayout";
import IconBtn from "@components/IconBtn";
import { ACCENT_COLOR, BACKGROUND_COLOR } from "@misc/colors";
import { R, SPACING } from "@misc/const";
import { Ionicons } from "@expo/vector-icons";
import OnlineFriends from "@components/OnlineFriends";
import UserList from "@misc/UserList";

const Messages = () => {
  const renderTItle = () => {
    return <Text style={{ fontSize: 20, fontWeight: "600" }}>Message</Text>;
  };

  const renderActions = () => {
    return (
      <View style={{ flexDirection: "row" }}>
        <IconBtn
          color={BACKGROUND_COLOR}
          icon={"camera-outline"}
          onPress={() => null}
        />
        <IconBtn
          color={BACKGROUND_COLOR}
          icon={"pencil-outline"}
          onPress={() => null}
        />
      </View>
    );
  };

  const ListHeader = () => {
    return (
      <View style={{ marginBottom: SPACING }}>
        <View style={styles.inputContainer}>
          <View style={styles.searchInputContainer}>
            <TouchableOpacity style={styles.search}>
              <Ionicons name={"search"} size={22} color={"lightgrey"} />
            </TouchableOpacity>
            <TextInput placeholder="Type Here..." style={styles.input} />
          </View>
          <TouchableOpacity style={styles.filter}>
            <Ionicons name={"filter-outline"} size={22} color={"black"} />
          </TouchableOpacity>
        </View>
        <View style={styles.rowBetween}>
          <TouchableOpacity>
            <Text style={{ color: ACCENT_COLOR }}>New Group</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{ color: ACCENT_COLOR }}>Archive (1)</Text>
          </TouchableOpacity>
        </View>
        <OnlineFriends />
      </View>
    );
  };

  return (
    <ContainerLayout Left={renderTItle()} Right={renderActions()}>
      <FlatList
        data={UserList}
        keyExtractor={(user) => user._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: SPACING }}
        ListHeaderComponent={<ListHeader />}
        renderItem={({ item }) => {
          return (
            <View style={{ flex: 1 }}>
              <View style={styles.message}>
                <View style={styles.avatar}>
                  <Image
                    source={{ uri: item.avatar }}
                    style={StyleSheet.absoluteFillObject}
                    resizeMode="cover"
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text>
                    {item.firstName} {item.lastName}
                  </Text>
                  {/*TODO will update*/}
                  <Text>message</Text>
                </View>
                <Text style={{ color: "lightgrey" }}>12:23PM</Text>
              </View>
            </View>
          );
        }}
      />
    </ContainerLayout>
  );
};

export default Messages;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING / 2,
    marginVertical: SPACING,
  },
  searchInputContainer: {
    flex: 1,
    height: 45,
    borderRadius: R,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: BACKGROUND_COLOR,
  },
  input: {
    flex: 1,
    height: "100%",
  },
  filter: {
    width: 45,
    height: 45,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: BACKGROUND_COLOR,
  },
  search: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: SPACING,
  },
  message: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 25,
    overflow: "hidden",
  },
});
