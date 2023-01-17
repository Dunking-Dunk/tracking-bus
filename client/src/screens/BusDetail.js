import { Text, View, StyleSheet, TouchableHighlight } from "react-native";
import { useState } from "react";
import { MemorizedMap } from "../components/MapView";
import { AntDesign } from "@expo/vector-icons";

import DragUpView from "../components/DragUpView";
import Color from "../utils/Color";
import StepProgressBar from "../components/StepProgressBar";

const BusDetail = ({ navigation, route }) => {
  const { bus } = route.params;

  return (
    <View style={styles.container}>
      <TouchableHighlight
        onPress={() => navigation.pop()}
        style={styles.headerMenuContainer}
      >
        <AntDesign name="arrowleft" size={24} color={Color.bold} />
      </TouchableHighlight>

      <MemorizedMap
        busPin={{
          latitude: 13,
          longitude: 80,
        }}
        stops={bus.stops}
        mapStyle={styles.map}
      />
      <DragUpView>
        <View style={styles.busContainer}>
          <View style={styles.row}>
            <Text style={styles.busNumber}>
              {bus.busNumber} {bus.busSet}
            </Text>
            <Text style={styles.busFrom}>{bus.origin}</Text>
          </View>
          <Text style={styles.busFrom}>{bus.description}</Text>
          <StepProgressBar stops={bus.stops} />
        </View>
      </DragUpView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "80%",
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

  busContainer: {
    padding: 20,
    flex: 1,
  },
  busNumber: {
    fontSize: 24,
    textTransform: "uppercase",
    color: Color.white,
  },
  busFrom: {
    color: Color.white,
    fontSize: 18,
    textTransform: "capitalize",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
});
export default BusDetail;
