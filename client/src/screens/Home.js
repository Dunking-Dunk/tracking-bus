import { useEffect, useState, useCallback, useMemo } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Map } from "../components/MapView";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { getAllStop, getBus, getQuickStats } from "../store/action";
import Header from "../components/Header";
import { clientSocket } from "../api/socket";
import { useIsFocused } from "@react-navigation/native";
import DragUpView from "../components/DragUpView";
import { CalcDistance } from "../utils/distanceBetweenCoords";
import Loader from "../components/LoadingAnimation";
import Color from "../utils/Color";
import Container from "../components/CustomButton";
import { EventRegister } from "react-native-event-listeners";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

export default Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const stops = useSelector((state) => state.stops.stops);
  const userCoords = useSelector((state) => state.user.user);
  const stats = useSelector((state) => state.buses.quickStats);
  const [nearByStops, setNearByStops] = useState(null);
  const [nearByBuses, setNearByBuses] = useState(null);
  const [busesLocation, getBusesLocations] = useState(null);

  const isFocused = useIsFocused();
  const open = useSharedValue(false);

  useEffect(() => {
    dispatch(getAllStop());
    dispatch(getQuickStats());
  }, [dispatch]);

  useEffect(() => {
    const nearByStops = new CalcDistance(userCoords).nearByStops(stops);
    setNearByStops(nearByStops);
  }, [userCoords, stops]);

  useEffect(() => {
    const nearByBuses = new CalcDistance(userCoords).nearByBuses(busesLocation);
    setNearByBuses(nearByBuses);
  }, [userCoords, busesLocation]);

  useEffect(() => {
    if (isFocused) {
      clientSocket.getAllBusLocations(getBusesLocations);
    }
    return () => {
      clientSocket.stopAllBusLocation();
    };
  }, [isFocused]);

  const coordsPressHandler = (coords) => {
    EventRegister.emit("ChangeStopCoords", { stopCoords: coords });
  };

  const getBusHandler = useCallback(
    (bus) => {
      dispatch(getBus(bus)).then(() => {
        navigation.navigate("BusDetail", { busId: bus });
      });
    },
    [getBusHandler]
  );

  const animatedQuickStats = useAnimatedStyle(() => {
    return {
      display: open.value ? "flex" : "none",
    };
  });

  const renderNearByStops = useCallback(() => {
    return nearByStops.map((stop) => {
      return (
        <Container
          key={stop.id}
          style={styles.nearByStopContainer}
          onPress={() => coordsPressHandler(stop.coords)}
        >
          {stop.busId.map((bus) => {
            return (
              <Container
                style={styles.busImageContainer}
                key={bus.id}
                onPress={() => getBusHandler(bus.id)}
              >
                <View style={styles.ImageSubContainer}>
                  <FontAwesome5
                    name="bus"
                    size={24}
                    color={Color.semiBold}
                    style={{
                      backgroundColor: Color.light,
                      padding: 5,
                      borderRadius: 20,
                    }}
                  />

                  <View style={styles.routeContainer}>
                    <Text style={styles.routeText}>
                      {bus.busNumber} {bus.busSet && bus.busSet}
                    </Text>
                  </View>
                </View>
              </Container>
            );
          })}
          <View style={{ marginTop11: 5 }}>
            <Text style={styles.nearByStopText}>{stop.name}</Text>
            <Text style={styles.nearByStopText}>
              Morning Time: {stop.timing}
            </Text>
          </View>
          {/* {stop.address && <Text>{stop.address}</Text>} */}
        </Container>
      );
    });
  }, [nearByStops]);

  const renderNearByBuses = useCallback(() => {
    return nearByBuses.map((bus) => {
      return (
        <Container
          key={bus.id}
          style={styles.nearByStopContainer}
          onPress={() => coordsPressHandler(bus.coords)}
        >
          <View style={{ marginRight: 10 }}>
            <FontAwesome5
              name="bus"
              size={24}
              color={Color.semiBold}
              style={{
                backgroundColor: Color.light,
                padding: 5,
                borderRadius: 20,
              }}
            />
          </View>

          <View>
            <Text style={styles.nearByStopText}>
              9 b{/* {bus.busNumber}-{bus.busSet} */}
            </Text>
            <Text style={styles.nearByStopText}>Mogappair</Text>
          </View>
        </Container>
      );
    });
  }, [nearByBuses]);

  return (
    <View style={styles.container}>
      <Header searchRequired={false} navigation={navigation} />
      <Container
        style={styles.quickStatsBtn}
        onPress={() => {
          open.value = !open.value;
        }}
      >
        <MaterialIcons name="preview" size={24} color={Color.bold} />
      </Container>
      <Animated.View style={[styles.quickStatsContainer, animatedQuickStats]}>
        <Text>Total Bus: {stats.totalBus}</Text>
        <Text>Total Stop: {stats.totalStops}</Text>
        <Text style={styles.quickStatsHeaderText}>Morning to college</Text>
        <Text>{stats.morningToCollege} buses in all routes</Text>
        <Text style={styles.quickStatsHeaderText}>Return after 1 PM: </Text>
        <Text>{stats.returnAfter1} buses in all routes</Text>
        <Text style={styles.quickStatsHeaderText}>Return after 3:15 PM: </Text>
        <Text>{stats.returnAfter315} buses in all routes</Text>
        <Text style={styles.quickStatsHeaderText}>Return after 5 PM: </Text>
        <Text>{stats.returnAfter5} buses in all routes</Text>
      </Animated.View>
      {stops ? (
        <Map
          mapStyle={styles.map}
          allStops={stops}
          busesLiveLocation={busesLocation}
        />
      ) : (
        <Loader color={Color.regular} size="large" />
      )}

      <DragUpView>
        <ScrollView style={styles.dragContainer}>
          <Container
            style={styles.announcementContainer}
            onPress={() => {
              navigation.navigate("Announcements");
            }}
          >
            <Text style={styles.announcementTitle}>Announcements</Text>
          </Container>
          <Text style={styles.title}>STOPS NEARBY</Text>
          {nearByStops ? (
            renderNearByStops()
          ) : (
            <Text style={styles.title}>No Stops near by</Text>
          )}

          <Text style={{ ...styles.title, marginTop: 20 }}>BUS NEARBY</Text>

          {nearByBuses ? (
            renderNearByBuses()
          ) : (
            <Text style={styles.title}>No Bus near by</Text>
          )}
        </ScrollView>
      </DragUpView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  quickStatsContainer: {
    position: "absolute",
    padding: 10,
    top: 70,
    right: 120,
    zIndex: 1,
    borderRadius: 20,
    backgroundColor: Color.light,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  quickStatsBtn: {
    position: "absolute",
    top: 60,
    right: 30,
    zIndex: 1,
    borderRadius: 20,
    backgroundColor: Color.light,
    width: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  quickStatsHeaderText: {
    fontWeight: "bold",
    marginTop: 10,
    color: Color.semiBold,
  },
  map: {
    flex: 1,
  },
  dragContainer: {
    padding: 15,
  },
  title: {
    textAlign: "center",
    color: Color.bold,
  },
  nearByStopContainer: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Color.regular,
    padding: 8,
    borderRadius: 20,
    marginTop: 5,
  },
  nearByStopText: {
    textTransform: "capitalize",
    color: Color.white,
  },
  busImageContainer: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: Color.semiBold,
    padding: 5,
    borderRadius: 25,
    marginRight: 10,
  },
  ImageSubContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: 80,
    justifyContent: "space-between",
  },

  routeText: {
    textTransform: "uppercase",
    color: Color.white,
  },
  announcementContainer: {
    width: "100%",
    height: 60,
    backgroundColor: Color.semiBold,
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  announcementTitle: {
    fontSize: 20,
    color: Color.white,
    fontWeight: "600",
    textTransform: "uppercase",
  },
});
