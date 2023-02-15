import { View, Text, StyleSheet } from "react-native";
import { Marker, Callout } from "react-native-maps";
import { memo } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Color from "../utils/Color";

const StopMarker = ({ stop, showBus }) => {
  return (
    <Marker
      coordinate={stop.coords}
      title={stop.name}
      description={stop.timing}
      tracksViewChanges={false}
    >
      <MaterialCommunityIcons name="bus-marker" size={24} color={Color.bold} />
      <Callout tooltip>
        <View>
          <View style={styles.bubble}>
            <View style={styles.row}>
              <Text style={{ fontWeight: "bold" }}>Stop: </Text>
              <Text style={styles.text}>{stop.name}</Text>
            </View>
            <View style={styles.row}>
              <Text style={{ fontWeight: "bold" }}>Timing: </Text>
              <Text style={styles.text}>{stop.timing} AM</Text>
            </View>
            {stop.address && (
              <>
                <Text style={{ fontWeight: "bold" }}>Address: </Text>
                <View style={styles.row}>
                  <Text style={styles.text}>{stop.address}</Text>
                </View>
              </>
            )}

            <Text style={{ fontWeight: "bold" }}>Bus: </Text>
            {showBus && (
              <View style={styles.row}>
                <Text style={styles.text}>
                  {stop.busId[0]?.busNumber}
                  {stop.busId[0]?.busSet}
                  {"  "}
                </Text>
                <Text style={styles.text}>{stop.busId[0]?.busName}</Text>
              </View>
            )}
          </View>
          <View style={styles.arrowBorder} />
          <View style={styles.arrow} />
        </View>
      </Callout>
    </Marker>
  );
};

const styles = StyleSheet.create({
  bubble: {
    flexDirection: "column",
    borderRadius: 6,
    borderWidth: 0.5,
    backgroundColor: Color.light,
    width: 200,
    borderColor: Color.medium,
    alignSelf: "flex-start",
    padding: 5,
  },
  arrow: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: Color.medium,
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: Color.medium,
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -0.5,
  },
  row: {
    flexDirection: "row",
  },
  text: {
    fontSize: 16,
    textTransform: "capitalize",
  },
});

export default memo(StopMarker);
