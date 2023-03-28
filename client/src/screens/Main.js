import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Home";
import BusDetail from "./BusDetail";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useLocation from "../hooks/use-location";
import { useAppState } from "../hooks/use-appState";
import { appStatusState } from "../store/action";

const Stack = createNativeStackNavigator();

export default BusRoute = () => {
  const dispatch = useDispatch();
  const appState = useAppState();
  useEffect(() => {
    new useLocation(dispatch);
  }, [dispatch]);

  useEffect(() => {
    dispatch(appStatusState(appState));
  }, [dispatch, appState]);

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
