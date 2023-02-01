import { View, Text, StyleSheet } from "react-native";
import Header from "../components/Header";
import Color from "../utils/Color";

const AnnouncementScreen = ({ navigation }) => {
  return (
    <>
      <Header searchRequired={false} navigation={navigation} />
      <View style={styles.container}>
        <Text style={styles.title}>Announcements</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 70,
    alignItems: "center",
  },
  title: {
    color: Color.bold,
    fontSize: 22,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

export default AnnouncementScreen;
