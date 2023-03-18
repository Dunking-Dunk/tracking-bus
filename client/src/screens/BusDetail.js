import { Text, View, StyleSheet } from "react-native";
import { useState } from "react";
import { Map } from "../components/MapView";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

import Loader from "../components/LoadingAnimation";
import DragUpView from "../components/DragUpView";
import Color from "../utils/Color";
import StepProgressBar from "../components/StepProgressBar";
import { clientSocket } from "../api/socket";

import CustomButton from "../components/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getBus } from "../store/action";

import { CalcDistance } from "../utils/distanceBetweenCoords";

const BusDetail = ({ navigation, route }) => {
  const routeData = route.params;

  let bus = routeData.bus
    ? routeData.bus
    : useSelector((state) => state.buses.bus);

  const [routeInfo, setRouteInfo] = useState({
    distance: 0,
    elapsedTime: 0,
  });
  console.log(bus);
  const [busLiveLocation, setBusLiveLocation] = useState(null);

  const [elapsedTimeBetweenStops, setElapsedTimeBetweenStops] = useState([]);

  useEffect(() => {
    if (bus) {
      clientSocket.getBusLocation(bus.tracker, setBusLiveLocation);
      return () => {
        clientSocket.stopBusLocation(bus.tracker);
      };
    }
  }, [bus]);

  useEffect(() => {
    if (bus) {
      const data = new CalcDistance().TimeElapsedBetweenStops(
        bus.stops,
        routeInfo.distance,
        routeInfo.elapsedTime
      );
      setElapsedTimeBetweenStops(data);
    }
  }, [routeInfo, bus]);

  if (bus) {
    return (
      <View style={styles.container}>
        <CustomButton
          onPress={() => navigation.pop()}
          style={styles.headerMenuContainer}
        >
          <AntDesign name="arrowleft" size={24} color={Color.bold} />
        </CustomButton>

        {routeInfo ? (
          <Map
            stops={bus?.stops}
            mapStyle={styles.map}
            setRouteInfo={setRouteInfo}
            busLiveLocation={busLiveLocation}
            detail={true}
          />
        ) : (
          <Loader size="large" />
        )}

        <DragUpView>
          <View style={styles.busContainer}>
            <View style={styles.routeInfoContainer}>
              <Text style={styles.routeInfoText}>
                {parseInt(routeInfo.distance)} KM
              </Text>
              <Text style={styles.routeInfoText}>
                {parseInt(routeInfo.elapsedTime)} min
              </Text>
            </View>

            <View style={styles.detailContainer}>
              <Text style={styles.busNumber}>
                {bus.busNumber}
                {bus.busSet && bus.busSet}
              </Text>
              <Text style={styles.busText}>{bus.busName}</Text>
            </View>
            <View style={styles.detailContainer}>
              <Text style={styles.busText}>
                <Text style={styles.textBold}>Total Seats: </Text> {bus.seats}{" "}
                <MaterialCommunityIcons
                  name="seat"
                  size={24}
                  color={Color.bold}
                />
              </Text>
              <Text style={styles.textBold}>{bus.ac ? "AC" : "NON-AC"}</Text>
            </View>
            <Text style={styles.busText}>{bus.description}</Text>
            <Text style={styles.busText}>
              <Text style={styles.textBold}>Status: </Text>
              {bus.status ? (
                <AntDesign name="checkcircle" size={20} color="green" />
              ) : (
                <AntDesign name="minuscircle" size={20} color="red" />
              )}
            </Text>

            {elapsedTimeBetweenStops && (
              <StepProgressBar stops={elapsedTimeBetweenStops} />
            )}
          </View>
        </DragUpView>
      </View>
    );
  } else {
    return <Loader size="large" />;
  }
};

export default BusDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
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
  routeInfoContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingBottom: 10,
  },
  routeInfoText: {
    backgroundColor: Color.bold,
    padding: 10,
    borderRadius: 5,
    color: Color.white,
  },

  detailContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  busNumber: {
    fontSize: 24,
    textTransform: "uppercase",
    color: Color.black,
  },
  busText: {
    marginBottom: 3,
    color: Color.black,
    fontSize: 16,
    textTransform: "capitalize",
  },
  textBold: {
    fontWeight: "bold",
  },
});
