import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { FontAwesome5 } from "@expo/vector-icons";
import { Provider } from "react-redux";

import Color from "./src/utils/Color";
import "./src/utils/getUserLocation";
import CustomDrawerContent from "./src/components/CustomDrawerContent";
import HomeScreen from "./src/screens/Home";
import BusRoute from "./src/screens/BusRoute";
import { configureStore } from "./src/store/reducer";
import FlashMessage from "react-native-flash-message";

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerActiveBackgroundColor: Color.bold,
        drawerActiveTintColor: Color.light,
        drawerStatusBarAnimation: "fade",
        swipeEnabled: true,
        headerShown: false,
      }}
    >
      <Drawer.Screen
        component={HomeScreen}
        name="Home"
        options={{
          drawerIcon: () => (
            <FontAwesome5 name="home" size={24} color="black" />
          ),
        }}
      />
      <Drawer.Screen
        component={BusRoute}
        name="Bus Route"
        options={{
          drawerIcon: () => <FontAwesome5 name="bus" size={24} color="black" />,
        }}
      />
    </Drawer.Navigator>
  );
};

export default function App() {
  const store = configureStore();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar hidden={false} />
        <DrawerNavigation />
        <FlashMessage position="bottom" />
      </NavigationContainer>
    </Provider>
  );
}
