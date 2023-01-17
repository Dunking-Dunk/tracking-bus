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
      stepStrokeCurrentColor: "#fe7013",
      stepStrokeWidth: 3,
      separatorStrokeFinishedWidth: 4,
      stepStrokeFinishedColor: "#fe7013",
      stepStrokeUnFinishedColor: "#aaaaaa",
      separatorFinishedColor: "#fe7013",
      separatorUnFinishedColor: "#aaaaaa",
      stepIndicatorFinishedColor: "#fe7013",
      stepIndicatorUnFinishedColor: "#ffffff",
      stepIndicatorCurrentColor: "#ffffff",
      stepIndicatorLabelFontSize: 13,
      currentStepIndicatorLabelFontSize: 13,
      stepIndicatorLabelCurrentColor: "#fe7013",
      stepIndicatorLabelFinishedColor: "#ffffff",
      stepIndicatorLabelUnFinishedColor: "#aaaaaa",
      labelColor: "#999999",
      labelSize: 13,
      currentStepLabelColor: "#fe7013",
    };
    this.dimension = Dimensions.get("window");
    this.currentPosition = 2;
  }

  render() {
    console.log("lol");
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
    marginTop: 50,
  },
  stepContainer: {
    marginTop: 25,
    paddingLeft: 10,
    width: 300,
  },
  stepTitle: {
    fontSize: 20,
    color: Color.white,
  },
  stepTiming: {
    fontSize: 16,
    color: "#aaaaaa",
  },
});
