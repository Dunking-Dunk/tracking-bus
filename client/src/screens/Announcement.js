import { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import Header from "../components/Header";
import Color from "../utils/Color";
import { useSelector, useDispatch } from "react-redux";
import { getAllAnnouncements } from "../store/action";
import HtmlText from "react-native-html-to-text";

const AnnouncementScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const announcements = useSelector(
    (state) => state.announcements.announcements
  );

  useEffect(() => {
    dispatch(getAllAnnouncements());
  }, []);

  return (
    <>
      <Header searchRequired={false} navigation={navigation} />
      <View style={styles.container}>
        <Text style={styles.title}>Announcements</Text>
        <ScrollView style={styles.announcementContainer}>
          {announcements &&
            announcements.map((announcement) => {
              return (
                <View style={styles.announcement} key={announcement._id}>
                  <HtmlText
                    html={announcement.content}
                    style={styles.announcementContent}
                  ></HtmlText>
                </View>
              );
            })}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 70,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    color: Color.bold,
    fontSize: 22,
    textTransform: "uppercase",
    fontWeight: "bold",
    marginBottom: 25,
  },
  announcementContainer: {
    backgroundColor: Color.light,
    width: "100%",
    borderRadius: 20,
  },
  announcement: {
    backgroundColor: Color.regular,
    padding: 5,
    borderRadius: 10,
    margin: 10,
  },
  announcementContent: {
    height: 20,
    width: "70%",
  },
});

export default AnnouncementScreen;
