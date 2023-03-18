import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  useAnimatedGestureHandler,
} from "react-native-reanimated";
import { useEffect } from "react";
import { PanGestureHandler } from "react-native-gesture-handler";
import { StyleSheet, View, TouchableHighlight, Dimensions } from "react-native";
import Color from "../utils/Color";
import { EventRegister } from "react-native-event-listeners";

const DragUpView = ({ children }) => {
  const dimension = Dimensions.get("window");
  const open = useSharedValue(false);
  const y = useSharedValue(dimension.height / 3.5);

  const animatedHeight = useAnimatedStyle(() => {
    return {
      height: withSpring(y.value, {
        stiffness: 50,
      }),
    };
  });

  useEffect(() => {
    const listener = EventRegister.addEventListener("CloseDragUp", () => {
      y.value = dimension.height / 3.5;
    });
    return () => {
      EventRegister.removeEventListener(listener);
    };
  }, []);

  const eventHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      ctx.startY = event.y;
    },
    onActive: (event, ctx) => {
      if (event.translationY < ctx.startY) {
        y.value = dimension.height / 1.2;
      } else {
        y.value = dimension.height / 3.5;
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

export default DragUpView;

const styles = StyleSheet.create({
  container: {
    height: "25%",
    position: "absolute",
    backgroundColor: Color.semiBold,
    width: "100%",
    bottom: 0,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    paddingHorizontal: 15,
    paddingTop: 30,
    paddingBottom: 10,
    zIndex: 5,
  },
  subContainer: {
    backgroundColor: Color.light,
    borderRadius: 35,
    display: "flex",
    flex: 1,
    overflow: "hidden",
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
