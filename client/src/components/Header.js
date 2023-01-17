import { View, Text, StyleSheet, TextInput } from "react-native";
import { memo } from "react";
import { Feather } from "@expo/vector-icons";
import Color from "../utils/Color";

const Header = ({ navigation, setSearch, search }) => {
  console.log("child render");
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerMenuContainer}>
        <Feather
          name="menu"
          size={32}
          color={Color.bold}
          onPress={() => navigation.openDrawer()}
          style={styles.headerMenu}
        />
      </View>
      <TextInput
        style={styles.input}
        value={search}
        onChangeText={setSearch}
        placeholder="Enter Your Bus Number"
        placeholderTextColor={Color.bold}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
  },
  input: {
    position: "absolute",
    width: "70%",
    height: 50,
    backgroundColor: Color.light,
    zIndex: 1,
    right: 30,
    top: 60,
    padding: 10,
    borderRadius: 30,
    fontSize: 15,
    fontWeight: "bold",
  },
  headerMenuContainer: {
    zIndex: 1,
    position: "absolute",
    top: 60,
    left: 15,
    borderRadius: 50,
    padding: 10,
    backgroundColor: Color.light,
  },
  headerMenu: {},
});

export default memo(Header);
