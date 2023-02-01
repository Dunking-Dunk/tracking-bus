import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Home";
import BusDetail from "./BusDetail";

const Stack = createNativeStackNavigator();

export default BusRoute = () => {
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
