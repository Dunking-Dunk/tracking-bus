import { useRef, useState, useEffect } from "react";
import {
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
  View,
  Image,
} from "react-native";
import MapView, {
  Marker,
  Circle,
  AnimatedRegion,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import Color from "../utils/Color";
import { GOOGLE_API_KEY } from "@env";
import Loader from "./LoadingAnimation";
import StopMarker from "./StopMarker";
import { useTheme } from "@react-navigation/native";
import { darkMap, standardMap } from "../utils/mapStyle";
import { EventRegister } from "react-native-event-listeners";
import { useSelector } from "react-redux";
import RecFlagMarker from "../utils/RecFlagMarker";
// @ts-nocheck

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0122;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const map = ({
  stops,
  mapStyle,
  allStops,
  setRouteInfo,
  busesLiveLocation,
  busLiveLocation,
  detail,
  navigation,
}) => {
  const userCoords = useSelector((state) => state.user.user);
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
    if (userCoords) {
      const { latitude, longitude } = userCoords;
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
    }
  }, [userCoords]);

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
  const animate = (latitude, longitude) => {
    const newCoordinate = { latitude, longitude };
    if (Platform.OS == "android") {
      if (markerRef.current) {
        markerRef.current.animateMarkerToCoordinate(newCoordinate, 7000);
      }
    } else {
      state.coordinate?.timing(newCoordinate).start();
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
      <View style={{ flex: 1 }}>
        {/* <Canvas>
          <ambientLight /> */}

        <MapView
          style={{ ...mapStyle, ...styles.map }}
          initialRegion={{
            latitude: state.userCoords.latitude,
            longitude: state.userCoords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          provider={PROVIDER_GOOGLE}
          ref={mapRef}
          customMapStyle={dark ? darkMap : standardMap}
        >
          {allStops &&
            allStops.map((stop) => {
              return (
                <StopMarker
                  stop={stop}
                  key={stop.id}
                  showBus={true}
                  navigation={navigation}
                />
              );
            })}

          {busesLiveLocation &&
            busesLiveLocation.map((bus) => {
              const { latitude, longitude } = bus.coords.slice(-1)[0];
              return (
                <Marker.Animated
                  coordinate={{
                    latitude,
                    longitude,
                  }}
                  key={bus.id}
                  tracksViewChanges={false}
                >
                  <View style={styles.busTracker}>
                    <Text
                      style={{
                        color: Color.white,
                        textTransform: "uppercase",
                      }}
                    >
                      {bus.onBusRoute}
                    </Text>
                  </View>
                </Marker.Animated>
              );
            })}

          {busLiveLocation && (
            <Marker.Animated
              coordinate={busLiveLocation.coords[0]}
              tracksViewChanges={false}
            >
              <View>
                <View style={styles.busTracker}>
                  <Text style={{ color: Color.white }}>
                    {busLiveLocation.onBusRoute}
                  </Text>
                </View>
              </View>
            </Marker.Animated>
          )}

          {stops && (
            <>
              <MapViewDirections
                timePrecision="now"
                mode="DRIVING"
                origin={direction.origin}
                waypoints={direction.wayPoints}
                destination={direction.destination}
                strokeWidth={3}
                strokeColor={Color.regular}
                lineCap="round"
                lineJoin="round"
                apikey={process.env.REACT_APP_GOOGLE_API_KEY}
                optimizeWaypoints={true}
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
              {stops.map((stop, index) => {
                return <StopMarker key={index} stop={stop} showBus={false} />;
              })}
            </>
          )}
          <RecFlagMarker />
          {!detail && (
            <Circle
              radius={2000}
              center={state.userCoords}
              strokeColor={Color.regular}
            />
          )}

          <Marker.Animated
            ref={markerRef}
            coordinate={state.coordinate}
            tracksViewChanges={false}
          >
            <FontAwesome name="circle-o" size={18} color={Color.blue} />
          </Marker.Animated>
        </MapView>
        {/* </Canvas> */}
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
      </View>
    );
  } else {
    return <Loader size="large" color={Color.regular} />;
  }
};
const Map = map;
export { Map };

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
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
