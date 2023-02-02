import { memo, useRef, useState, useEffect, useCallback } from "react";
import {
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
  View,
  Image,
} from "react-native";
import MapView, { Marker, Circle, AnimatedRegion } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { GOOGLE_MAPS_API_KEY } from "@env";
import { userLocation } from "../utils/getUserLocation";
import Color from "../utils/Color";
import Loader from "./LoadingAnimation";
import StopMarker from "./StopMarker";
import { useTheme } from "@react-navigation/native";
import { darkMap, standardMap } from "../utils/mapStyle";
import { EventRegister } from "react-native-event-listeners";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0122;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Map = ({
  stops,
  mapStyle,
  allStops,
  setRouteInfo,
  busesLiveLocation,
}) => {
  console.log("render");
  const { dark } = useTheme();
  //ref/////////////////////////////
  const mapRef = useRef();
  const markerRef = useRef();
  //states////////////////////
  const [state, setState] = useState({
    userCoords: null,
    coordinate: null,
  });
  const [direction, setDirection] = useState({
    origin: {
      latitude: 0,
      longitude: 0,
    },
    destination: {
      latitude: 0,
      longitude: 0,
    },
    wayPoints: [{ latitude: 0, longitude: 0 }],
    elapsedTime: 0,
    distance: 0,
  });
  const updateState = (data) => setState((state) => ({ ...state, ...data }));
  const updateDirection = (data) =>
    setDirection((state) => ({ ...state, ...data }));

  //useEffect//////////////////////////////
  useEffect(() => {
    getUserLocation();
  }, []);

  useEffect(() => {
    const listener = EventRegister.addEventListener(
      "ChangeStopCoords",
      ({ stopCoords }) => {
        mapRef.current.animateToRegion({
          latitude: stopCoords.latitude,
          longitude: stopCoords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        });
      }
    );
    return () => {
      EventRegister.removeEventListener(listener);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getUserLocation();
      // console.log(state.userCoords);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (stops) {
      updateDirection({
        origin: stops[0].coords,
        destination: stops[stops.length - 1].coords,
        wayPoints: stops.slice(1, -1).map((stop) => {
          return stop.coords;
        }),
      });
    }
  }, []);

  //helper function
  const getUserLocation = async () => {
    const { latitude, longitude } = await userLocation.getUserLocation();
    animate(latitude, longitude);
    updateState({
      userCoords: { latitude, longitude },
      coordinate: new AnimatedRegion({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }),
    });
  };

  const animate = (latitude, longitude) => {
    const newCoordinate = { latitude, longitude };
    if (Platform.OS == "android") {
      if (markerRef.current) {
        markerRef.current.animateMarkerToCoordinate(newCoordinate, 7000);
      }
    } else {
      state.coordinate.timing(newCoordinate).start();
    }
  };

  const onCenter = () => {
    mapRef.current.animateToRegion({
      latitude: state.userCoords.latitude,
      longitude: state.userCoords.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });
  };

  const updatedDandT = (d, t) => {
    updateDirection({ distance: d, elapsedTime: t });
    if (setRouteInfo) {
      setRouteInfo((state) => ({ ...state, elapsedTime: t, distance: d }));
    }
  };

  if (state.userCoords) {
    return (
      <>
        <MapView
          style={{ ...mapStyle, ...styles.map }}
          initialRegion={{
            ...state.userCoords,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          apikey={GOOGLE_MAPS_API_KEY}
          provider="google"
          userInterfaceStyle="dark"
          ref={mapRef}
          customMapStyle={dark ? darkMap : standardMap}
        >
          {allStops &&
            allStops.map((stop) => {
              return <StopMarker stop={stop} key={stop.id} showBus={true} />;
            })}

          {busesLiveLocation &&
            busesLiveLocation.map((bus) => {
              return (
                <Marker.Animated coordinate={bus.coords} key={bus.id}>
                  <View>
                    <View style={styles.busTracker}>
                      <Text style={{ color: Color.white }}>9B</Text>
                    </View>
                  </View>
                </Marker.Animated>
              );
            })}

          {stops && (
            <>
              <MapViewDirections
                origin={direction.origin}
                waypoints={direction.wayPoints}
                destination={direction.destination}
                strokeWidth={3}
                strokeColor={Color.regular}
                apikey={GOOGLE_MAPS_API_KEY}
                lineCap="round"
                lineJoin="round"
                onReady={(result) => {
                  console.log(`Distance: ${result.distance} km`);
                  console.log(`Duration: ${result.duration} min.`);
                  updatedDandT(result.distance, result.duration);
                  mapRef.current.fitToCoordinates(result.coordinates);
                }}
                onError={(err) => {
                  console.log(err);
                }}
              />
              {stops.map((stop) => {
                return <StopMarker key={stop.id} stop={stop} showBus={false} />;
              })}
            </>
          )}
          {state.userCoords && (
            <>
              <Circle
                radius={2000}
                center={state.userCoords}
                strokeColor={Color.regular}
              />
              <Marker.Animated ref={markerRef} coordinate={state.coordinate}>
                <FontAwesome name="circle-o" size={18} color={Color.blue} />
              </Marker.Animated>
            </>
          )}

          <Marker
            coordinate={{ latitude: 13.009577, longitude: 80.00433 }}
            anchor={{ x: 0, y: 1.45 }}
          >
            <Image source={require("../../assets/RECFlagFlagMain.gif")} />
          </Marker>
          <Marker
            coordinate={{ latitude: 13.009577, longitude: 80.00433 }}
            anchor={{ x: 1, y: 1 }}
          >
            <Image source={require("../../assets/pole1.png")} />
          </Marker>
        </MapView>

        <TouchableOpacity
          style={{
            position: "absolute",
            bottom: 250,
            right: 20,
            zIndex: 2,
          }}
          onPress={onCenter}
        >
          <MaterialIcons name="gps-fixed" size={34} color={Color.light} />
        </TouchableOpacity>
      </>
    );
  } else {
    return <Loader size="large" color={Color.regular} />;
  }
};

export { Map };

const styles = StyleSheet.create({
  map: {
    marginBottom: Dimensions.get("screen").height / 5.5,
  },
  busTracker: {
    width: 30,
    height: 30,
    backgroundColor: Color.bold,
    borderRadius: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
