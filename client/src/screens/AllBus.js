import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, StyleSheet, Button, FlatList } from "react-native";
import Header from "../components/Header";
import Color from "../utils/Color";
import CustomButton from "../components/CustomButton";
import { getBuses } from "../store/action";
import { clientSocket } from "../api/socket";
import { useIsFocused } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import Loader from "../components/LoadingAnimation";

const AllBusRoute = ({ navigation }) => {
  const dispatch = useDispatch();
  const buses = useSelector((state) => state.buses.buses);
  const isFocused = useIsFocused();
  const { colors } = useTheme();

  useEffect(() => {
    if (isFocused) {
      clientSocket.stopBusLocations();
      dispatch(getBuses());
    }
  }, [isFocused]);

  const renderBuses = ({ item: bus }) => {
    return (
      <View key={bus.id} style={styles.busContainer}>
        <View style={styles.busHeroContainer}>
          <View style={styles.busImageContainer}>
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
              backgroundColor: Color.bold,
              width: 100,
              height: 50,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={styles.detailBtnText}>Detail</Text>
          </CustomButton>
        </View>

        <View style={styles.busDetailContainer}>
          <Text style={styles.detailContainerText}>{bus.busName}</Text>
          <Text style={styles.detailContainerText}>
            depature: {bus.stops[0].timing}AM
          </Text>
        </View>
      </View>
    );
  };

  if (buses) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <Header navigation={navigation} searchRequired={true} />
        <FlatList
          data={buses}
          style={styles.container}
          renderItem={renderBuses}
        />
      </View>
    );
  } else return <Loader size="large" />;
};

const styles = StyleSheet.create({
  container: {
    marginTop: 140,
    display: "flex",
    flexDirection: "column",
    paddingHorizontal: 20,
  },
  busContainer: {
    backgroundColor: Color.regular,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginBottom: 8,
  },
  busHeroContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  busImageContainer: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: Color.semiBold,
    padding: 10,
    borderRadius: 25,
  },
  ImageSubContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: 140,
    justifyContent: "space-between",
  },
  routeContainer: {
    backgroundColor: Color.bold,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    color: Color.white,
  },
  routeText: {
    textTransform: "uppercase",
    color: Color.white,
  },
  busDetailContainer: {
    backgroundColor: Color.semiBold,
    padding: 10,
    borderRadius: 20,
  },
  detailContainerText: {
    color: Color.white,
    fontSize: 16,
  },
  detailBtnText: {
    color: Color.white,
    fontSize: 17,
  },
});

export default AllBusRoute;