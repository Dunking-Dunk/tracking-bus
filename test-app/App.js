import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import axios from "axios";
import * as Location from "expo-location";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  useEffect(() => {
    const helperFunction = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      setInterval(async () => {
        try {
          let location = await Location.getCurrentPositionAsync({
            accuracy: 3,
          });
          await axios.post(
            `https://ba16-49-204-114-8.ngrok-free.app/api/gps-tracking/gps-01?lat=${location.coords.latitude}&lng=${location.coords.longitude}`,
            {}
          );
        } catch (err) {
          console.log(err);
        }
      }, 3000);
    };

    helperFunction();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
