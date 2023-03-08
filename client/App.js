import { StatusBar } from "expo-status-bar";
import { NavigationContainer, useTheme } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Provider } from "react-redux";
import { useColorScheme } from "react-native";
import { DarkTheme, LightTheme } from "./src/utils/Color";

import Color from "./src/utils/Color";
import CustomDrawerContent from "./src/components/CustomDrawerContent";
import MainScreen from "./src/screens/Main";
import BusRoute from "./src/screens/BusRoute";
import Contact from "./src/screens/Contact";
import AnnouncementScreen from "./src/screens/Announcement";
import { configureStore } from "./src/store/reducer";
import FlashMessage from "react-native-flash-message";
import { useState } from "react";

const Drawer = createDrawerNavigator();

const DrawerNavigation = ({ darkMode, setDarkMode }) => {
  const { colors } = useTheme();
  return (
    <Drawer.Navigator
      useLegacyImplementation
      drawerContent={(props) => (
        <CustomDrawerContent
          {...props}
          // colors={colors}
          // darkMode={darkMode}
          // setDarkMode={setDarkMode}
        />
      )}
      screenOptions={{
        drawerActiveBackgroundColor: Color.bold,
        drawerActiveTintColor: Color.light,
        drawerStatusBarAnimation: "fade",
        swipeEnabled: true,
        headerShown: false,
        drawerInactiveTintColor: colors.secondary,
      }}
    >
      <Drawer.Screen
        component={MainScreen}
        name="Home"
        options={{
          drawerIcon: () => (
            <FontAwesome5 name="home" size={24} color={colors.secondary} />
          ),
        }}
      />
      <Drawer.Screen
        component={BusRoute}
        name="Bus Routes"
        options={{
          drawerIcon: () => (
            <FontAwesome5 name="bus" size={24} color={colors.secondary} />
          ),
        }}
      />
      <Drawer.Screen
        component={AnnouncementScreen}
        name="Announcements"
        options={{
          drawerIcon: () => (
            <MaterialIcons
              name="announcement"
              size={24}
              color={colors.secondary}
            />
          ),
        }}
      />
      <Drawer.Screen
        component={Contact}
        name="Contact"
        options={{
          drawerIcon: () => (
            <Ionicons name="call" size={24} color={colors.secondary} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default function App() {
  const store = configureStore();
  const scheme = useColorScheme();
  const [darkMode, setDarkMode] = useState(true);

  return (
    <Provider store={store}>
      <NavigationContainer theme={scheme ? DarkTheme : LightTheme}>
        <StatusBar hidden={false} />
        <DrawerNavigation setDarkMode={setDarkMode} darkMode={darkMode} />
        <FlashMessage position="bottom" />
      </NavigationContainer>
    </Provider>
  );
}
