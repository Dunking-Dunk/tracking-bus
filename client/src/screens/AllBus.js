import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Pressable,
} from "react-native";
import Header from "../components/Header";
import Color from "../utils/Color";
import { getBuses, refreshBuses } from "../store/action";
import {
  FontAwesome5,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import Loader from "../components/LoadingAnimation";
import SortButton from "../components/SortButton";

const AllBusRoute = ({ navigation }) => {
  const dispatch = useDispatch();
  const refreshing = useSelector((state) => state.buses.refreshing);
  const buses = useSelector((state) => state.buses.buses);
  const { colors } = useTheme();

  useEffect(() => {
    dispatch(getBuses());
  }, [dispatch]);

  const renderBuses = ({ item: bus }) => {
    return (
      <Pressable
        key={bus.id}
        style={styles.busContainer}
        onPress={() => navigation.navigate("BusDetail", { busId: bus.id, bus })}
      >
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
          <View style={{ ...styles.busImageContainer, width: 130 }}>
            <View style={{ ...styles.ImageSubContainer, width: 70 }}>
              <View style={styles.routeContainer}>
                <Text style={styles.routeText}>{bus.stops.length}</Text>
              </View>
              <MaterialCommunityIcons
                name="bus-stop"
                size={24}
                color={Color.semiBold}
                style={{
                  backgroundColor: Color.light,
                  padding: 5,
                  borderRadius: 20,
                  marginLeft: 5,
                }}
              />
            </View>
          </View>
        </View>

        <View style={styles.busDetailContainer}>
          <View style={styles.busDetailSubContainer}>
            <Text style={styles.detailContainerText}>{bus.busName}</Text>
            {bus.status ? (
              <AntDesign name="checkcircle" size={20} color="green" />
            ) : (
              <AntDesign name="minuscircle" size={20} color="red" />
            )}
          </View>

          <Text style={styles.detailContainerText}>
            <Text style={styles.detailBoldText}>Arrival:</Text>{" "}
            {bus.stops[0].timing} AM
          </Text>
          <Text style={styles.detailContainerText}>
            <Text style={styles.detailBoldText}>Depature:</Text>{" "}
            {bus.returnAfter315 ? "3:15" : bus?.returnAfter1 ? "1:00" : "5:00"}{" "}
            PM
          </Text>
        </View>
      </Pressable>
    );
  };

  if (buses) {
    return (
      <SafeAreaView
        style={{
          backgroundColor: colors.background,
        }}
      >
        <Header navigation={navigation} searchRequired={true} />
        <View style={{ marginTop: 120 }}>
          <SortButton />
          {buses.length != 0 ? (
            <FlatList
              data={buses}
              style={styles.container}
              renderItem={renderBuses}
              refreshing={refreshing}
              onRefresh={() => {
                dispatch(refreshBuses(true));
                dispatch(getBuses()).then(() => {
                  dispatch(refreshBuses(false));
                });
              }}
            />
          ) : (
            <Text style={styles.infoText}>No buses found</Text>
          )}
        </View>
      </SafeAreaView>
    );
  } else return <Loader size="large" />;
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    paddingHorizontal: 20,
    marginBottom: 100,
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
    backgroundColor: Color.bold,
    padding: 10,
    borderRadius: 20,
  },
  detailContainerText: {
    color: Color.white,
    fontSize: 16,
    textTransform: "capitalize",
  },
  detailBoldText: {
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  detailBtnText: {
    color: Color.white,
    fontSize: 17,
  },

  busDetailSubContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoText: {
    color: Color.semiBold,
    textAlign: "center",
    fontSize: 24,
    textTransform: "uppercase",
    marginTop: 20,
  },
});

export default AllBusRoute;
