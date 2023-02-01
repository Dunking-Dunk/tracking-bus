import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { Switch } from "react-native";
import Color from "../utils/Color";

export default function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      {/* <Switch
        trackColor={{ false: Color.regular, true: Color.bold }}
        thumbColor={props.darkMode ? Color.regular : Color.bold}
        onValueChange={() => props.setDarkMode(!props.darkMode)}
        value={props.darkMode}
      /> */}
    </DrawerContentScrollView>
  );
}
