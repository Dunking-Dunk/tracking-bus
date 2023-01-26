import { useEffect, useState, useCallback, useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Map } from "../components/MapView";
import { useDispatch, useSelector } from "react-redux";

import { getAllStop } from "../store/action";
import Header from "../components/Header";
import { clientSocket } from "../api/socket";
import {
  useFocusEffect,
  useNavigationState,
  useIsFocused,
} from "@react-navigation/native";
import DragUpView from "../components/DragUpView";

export default Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const stops = useSelector((state) => state.stops.stops);
  const [search, setSearch] = useState("");
  const [busesLocation, getBusesLocations] = useState(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    dispatch(getAllStop());
  }, []);

  useEffect(() => {
    if (isFocused) {
      clientSocket.getBusLocations(getBusesLocations);
    }
  }, [isFocused]);
  console.log(busesLocation);
  const searchHelper = useCallback(
    (query) => {
      setSearch(query);
    },
    [search]
  );

  return (
    <View style={styles.container}>
      <Header
        search={search}
        setSearch={searchHelper}
        navigation={navigation}
      />
      <Map mapStyle={styles.map} allStops={stops} />
      <DragUpView>
        <View style={styles.dragContainer}>
          <Text>BUSES NEARBY</Text>
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
    flex: 1,
  },
  dragContainer: {
    flex: 1,
    padding: 20,
  },
});
