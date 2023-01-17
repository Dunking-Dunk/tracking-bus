import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllBusRoute from "./AllBus";
import BusDetail from "./BusDetail";

const Stack = createNativeStackNavigator();

export default BusRoute = () => {
  return (
    <Stack.Navigator
      initialRouteName="AllBus"
      screenOptions={{
        animationEnabled: true,
        headerShown: false,
      }}
    >
      <Stack.Screen name="AllBus" component={AllBusRoute} />
      <Stack.Screen name="BusDetail" component={BusDetail} />
    </Stack.Navigator>
  );
};
