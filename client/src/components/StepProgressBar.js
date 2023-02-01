import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Component } from "react";
import StepIndicator from "react-native-step-indicator";
import Color from "../utils/Color";

export default class ProgressBar extends Component {
  constructor(props) {
    super(props);
    this.stops = props.stops;
    this.CustomStyle = {
      stepIndicatorSize: 30,
      currentStepIndicatorSize: 40,
      separatorStrokeWidth: 2,
      currentStepStrokeWidth: 3,
      stepStrokeCurrentColor: Color.semiBold,
      stepStrokeWidth: 3,
      separatorStrokeFinishedWidth: 4,
      stepStrokeFinishedColor: Color.semiBold,
      stepStrokeUnFinishedColor: Color.regular,
      separatorFinishedColor: Color.semiBold,
      separatorUnFinishedColor: Color.regular,
      stepIndicatorFinishedColor: Color.semiBold,
      stepIndicatorUnFinishedColor: "#ffffff",
      stepIndicatorCurrentColor: "#ffffff",
      stepIndicatorLabelFontSize: 13,
      currentStepIndicatorLabelFontSize: 13,
      stepIndicatorLabelCurrentColor: Color.semiBold,
      stepIndicatorLabelFinishedColor: "#ffffff",
      stepIndicatorLabelUnFinishedColor: Color.regular,
      labelColor: "#999999",
      labelSize: 13,
      currentStepLabelColor: Color.semiBold,
    };
    this.dimension = Dimensions.get("window");
    this.currentPosition = 2;
  }

  render() {
    return (
      <View
        style={{
          ...styles.container,
          width: this.dimension.width - 30,
          height: this.dimension.height - 400,
        }}
      >
        <StepIndicator
          customStyles={this.CustomStyle}
          direction="vertical"
          currentPosition={this.currentPosition}
          labels={this.stops}
          stepCount={this.stops.length}
          renderLabel={({ position, label, currentPosition }) => {
            return (
              <View style={styles.stepContainer}>
                <Text style={styles.stepTitle}>{label.name}</Text>
                <Text style={styles.stepTiming}>{label.timing}</Text>
              </View>
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    elevation: 10,
  },
  stepContainer: {
    marginTop: 10,
    paddingLeft: 10,
    width: 300,
  },
  stepTitle: {
    fontSize: 18,
    textTransform: "capitalize",
  },
  stepTiming: {
    fontSize: 16,
    color: "#aaaaaa",
  },
});
