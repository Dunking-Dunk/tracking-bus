import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native";
import Header from "../components/Header";
import Color from "../utils/Color";
import CustomButton from "../components/CustomButton";
import { getBuses, refreshBuses } from "../store/action";
import { FontAwesome5 } from "@expo/vector-icons";
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
          <View>
            <Text style={styles.detailContainerText}>{bus.busName}</Text>
            <Text>active</Text>
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
      </View>
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
    backgroundColor: Color.semiBold,
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
});

export default AllBusRoute;
