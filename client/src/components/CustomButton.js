import { StyleSheet, Pressable } from "react-native";
import Color from "../utils/Color";

const CustomButton = ({ children, style, onPress }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          ...style,
          ...styles.Button,
          backgroundColor: pressed ? Color.medium : Color.semiBold,
        },
      ]}
      onPress={onPress}
    >
      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  Button: {
    borderRadius: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CustomButton;
