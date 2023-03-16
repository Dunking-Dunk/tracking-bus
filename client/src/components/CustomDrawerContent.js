import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { Switch } from "react-native";
import Color from "../utils/Color";
import { Text } from "react-native";

export default function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
<<<<<<< HEAD
      <Text
        style={{
          color: Color.bold,
          marginVertical: 20,
          fontSize: 25,
          marginLeft: 3,
        }}
      >
        Rajalakshmi Engineering College
      </Text>
      <DrawerItemList {...props} />

=======
       <Text style={{color: Color.bold, marginVertical: 20, fontSize: 25, marginLeft: 3}}>Rajalakshmi Engineering College</Text>
      <DrawerItemList {...props} />
     
>>>>>>> ef74fef5256609595c454148526d803120bed0d0
      {/* <Switch
        trackColor={{ false: Color.regular, true: Color.bold }}
        thumbColor={props.darkMode ? Color.regular : Color.bold}
        onValueChange={() => props.setDarkMode(!props.darkMode)}
        value={props.darkMode}
      /> */}
    </DrawerContentScrollView>
  );
}
