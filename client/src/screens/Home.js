import { useEffect, useState, useCallback, useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { MemorizedMap } from "../components/MapView";

import Header from "../components/Header";
import { clientSocket } from "../api/socket";
import {
  useFocusEffect,
  useNavigationState,
  useIsFocused,
} from "@react-navigation/native";
import DragUpView from "../components/DragUpView";

export default Home = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [busesLocation, getBusesLocations] = useState(null);
  const isFocused = useIsFocused();

  const searchHelper = useCallback(
    (query) => {
      setSearch(query);
    },
    [search]
  );

  useEffect(() => {
    if (isFocused) {
      clientSocket.getBusLocations(getBusesLocations);
    }
  }, [isFocused]);
  return (
    <View style={styles.container}>
      <Header
        search={search}
        setSearch={searchHelper}
        navigation={navigation}
      />
      <MemorizedMap mapStyle={styles.map} />
      <DragUpView></DragUpView>
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
});
