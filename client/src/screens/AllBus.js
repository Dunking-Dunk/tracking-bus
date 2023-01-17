import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, StyleSheet, Button, FlatList } from "react-native";
import Header from "../components/Header";
import Color from "../utils/Color";
import CustomButton from "../components/CustomButton";
import { getBuses } from "../store/action";
import { clientSocket } from "../api/socket";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";

const AllBusRoute = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const buses = useSelector((state) => state.buses.buses);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      clientSocket.stopBusLocations();
      dispatch(getBuses());
    }
  }, [isFocused]);

  useEffect(() => {
    dispatch(getBuses(search));
  }, [search]);

  const renderBuses = ({ item: bus }) => {
    return (
      <View key={bus.id} style={styles.busContainer}>
        <View style={styles.busDetailContainer}>
          <Text style={{ color: Color.white }}>
            {bus.busNumber} {bus.busSet}
          </Text>
          <Text style={{ color: Color.white }}>{bus.origin}</Text>
        </View>

        <CustomButton
          onPress={() =>
            navigation.navigate("BusDetail", { busId: bus.id, bus })
          }
          style={{
            backgroundColor: Color.semiBold,
            width: 80,
            height: 40,
          }}
        >
          <Text style={{ color: Color.white }}>Detail</Text>
        </CustomButton>
      </View>
    );
  };
  return (
    <View style>
      <Header navigation={navigation} search={search} setSearch={setSearch} />
      <FlatList
        data={buses}
        style={styles.container}
        renderItem={renderBuses}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 140,
    display: "flex",
    flexDirection: "column",
    paddingHorizontal: 20,
  },
  busContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    backgroundColor: Color.regular,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  busDetailContainer: {
    display: "flex",
    flexDirection: "column",
    color: Color.white,
  },
});

export default AllBusRoute;
