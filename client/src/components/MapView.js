import { memo, useRef, useState, useEffect } from "react";
import {
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import MapView, {
  Callout,
  Marker,
  Circle,
  AnimatedRegion,
} from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import {
  MaterialCommunityIcons,
  FontAwesome,
  Entypo,
} from "@expo/vector-icons";
import { GOOGLE_MAPS_API_KEY } from "@env";
import { userLocation } from "../utils/getUserLocation";
import Color from "../utils/Color";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0122;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Map = ({ stops, mapStyle, allStops }) => {
  const mapRef = useRef();
  const markerRef = useRef();

  //states
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
    time: 0,
    distance: 0,
  });
  const updateState = (data) => setState((state) => ({ ...state, ...data }));
  const updateDirection = (data) =>
    setDirection((state) => ({ ...state, ...data }));

  //useEffect
  useEffect(() => {
    getUserLocation();
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
    updateDirection({ d, t });
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
        >
          {allStops &&
            allStops.map((stop) => {
              return (
                <Marker
                  key={stop.id}
                  coordinate={stop.coords}
                  title={stop.name}
                  description={stop.timing}
                >
                  <MaterialCommunityIcons
                    name="bus-marker"
                    size={24}
                    color="black"
                  />
                </Marker>
              );
            })}
          {stops && (
            <>
              <MapViewDirections
                origin={direction.origin}
                waypoints={direction.wayPoints}
                destination={direction.destination}
                strokeWidth={3}
                strokeColor="red"
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
                return (
                  <Marker
                    key={stop.id}
                    coordinate={stop.coords}
                    title={stop.name}
                    description={stop.timing}
                  >
                    <MaterialCommunityIcons
                      name="bus-marker"
                      size={24}
                      color="black"
                    />
                  </Marker>
                );
              })}
            </>
          )}
          {state.userCoords && (
            <>
              <Circle radius={3000} center={state.userCoords} />
              <Marker.Animated ref={markerRef} coordinate={state.coordinate}>
                <FontAwesome name="circle-o" size={18} color={Color.blue} />
              </Marker.Animated>
            </>
          )}
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
          <Entypo name="location" size={34} color="black" />
        </TouchableOpacity>
      </>
    );
  }
};

export { Map };

const styles = StyleSheet.create({
  map: {
    marginBottom: Dimensions.get("screen").height / 5.5,
  },
});
