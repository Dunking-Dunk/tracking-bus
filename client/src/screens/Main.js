import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Home";
import BusDetail from "./BusDetail";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import userLocation from "../utils/getUserLocation";
import { schedulePushNotification } from "../hooks/use-notification";

const Stack = createNativeStackNavigator();

export default BusRoute = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    new userLocation(dispatch);
  }, [dispatch]);

  useEffect(() => {
    schedulePushNotification();
  }, []);

  return (
    <Stack.Navigator
      initialRouteName="home"
      screenOptions={{
        animationEnabled: true,
        headerShown: false,
      }}
    >
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="BusDetail" component={BusDetail} />
    </Stack.Navigator>
  );
};
