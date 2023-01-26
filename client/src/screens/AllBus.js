import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, StyleSheet, Button, FlatList } from "react-native";
import Header from "../components/Header";
import Color from "../utils/Color";
import CustomButton from "../components/CustomButton";
import { getBuses } from "../store/action";
import { clientSocket } from "../api/socket";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";

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
          <View style={styles.detailSubContainer}>
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
              <Text style={{ color: Color.white }}>
                {bus.busNumber} {bus.busSet}
              </Text>
            </View>
          </View>
        </View>

        <CustomButton
          onPress={() =>
            navigation.navigate("BusDetail", { busId: bus.id, bus })
          }
          style={{
            backgroundColor: Color.semiBold,
            width: 100,
            height: 50,
          }}
        >
          <Text style={styles.detailBtnText}>Detail</Text>
        </CustomButton>
      </View>
    );
  };
  return (
    <View style={{ flex: 1 }}>
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
    alignItems: "center",
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
    backgroundColor: Color.medium,
    padding: 10,
    borderRadius: 25,
  },
  detailSubContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: 140,
    justifyContent: "space-between",
  },

  routeContainer: {
    backgroundColor: Color.semiBold,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    color: Color.white,
  },
  detailBtnText: {
    color: Color.white,
    fontSize: 17,
  },
});

export default AllBusRoute;
