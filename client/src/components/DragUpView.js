import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  useAnimatedGestureHandler,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import { StyleSheet, View, TouchableHighlight } from "react-native";
import Color from "../utils/Color";
import { memo } from "react";

const DragUpView = ({ children }) => {
  const open = useSharedValue(false);
  const y = useSharedValue(200);

  const animatedHeight = useAnimatedStyle(() => {
    return {
      height: withSpring(y.value, {
        stiffness: 50,
      }),
    };
  });

  const eventHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      ctx.startY = event.y;
    },
    onActive: (event, ctx) => {
      if (event.translationY < ctx.startY) {
        y.value = 700;
      } else {
        y.value = 200;
      }
    },
  });

  return (
    <PanGestureHandler onGestureEvent={eventHandler}>
      <Animated.View style={[styles.container, animatedHeight]}>
        <TouchableHighlight style={styles.upGestureBtn}>
          <></>
        </TouchableHighlight>
        <View style={styles.subContainer}>{children}</View>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default memo(DragUpView);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.semiBold,
    height: "25%",
    position: "absolute",
    width: "100%",
    bottom: 0,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    paddingHorizontal: 15,
    paddingTop: 30,
    paddingBottom: 10,
  },
  subContainer: {
    backgroundColor: Color.light,
    borderRadius: 35,
    display: "flex",
    flex: 1,
  },
  upGestureBtn: {
    width: 150,
    height: 5,
    borderRadius: 10,
    position: "absolute",
    top: 15,
    left: "50%",
    transform: [
      {
        translateX: -60,
      },
    ],
    backgroundColor: Color.bold,
  },
});
