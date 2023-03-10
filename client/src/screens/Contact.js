import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Button,
} from "react-native";
import Header from "../components/Header";
import Color from "../utils/Color";
import { DataTable } from "react-native-paper";
import CustomButton from "../components/CustomButton";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BarCodeScanner } from "expo-barcode-scanner";
import { createFeedback } from "../store/action";

const Contact = ({ navigation }) => {
  const [state, setState] = useState({
    link: "",
    feedback: "",
  });
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(true);
  const dispatch = useDispatch();

  const updateState = (data) => {
    setState((state) => ({ ...state, ...data }));
  };

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    updateState({ link: data });
  };

  const onSubmit = () => {
    if (
      state.link.includes("https://www.rajalakshmi.org") &&
      state.feedback.length > 5
    ) {
      dispatch(createFeedback(state));
      setState({
        link: "",
        feedback: "",
      });
    }
  };

  return (
    <ScrollView>
      <Header searchRequired={false} navigation={navigation} />
      <View style={styles.container}>
        <Text style={styles.title}>Contact </Text>
        <DataTable style={styles.contactContainer}>
          <DataTable.Header>
            <DataTable.Title>Name</DataTable.Title>
            <DataTable.Title>Phone no</DataTable.Title>
          </DataTable.Header>
          <DataTable.Row>
            <DataTable.Cell>TRANSPORT DEPT</DataTable.Cell>
            <DataTable.Cell>044 6718 1069</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>P. Sathish</DataTable.Cell>
            <DataTable.Cell>902 522 4605</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>A. Natarajan</DataTable.Cell>
            <DataTable.Cell>902 522 4606</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>L. Ramajayam</DataTable.Cell>
            <DataTable.Cell>944 500 7183</DataTable.Cell>
          </DataTable.Row>
        </DataTable>
        <Text style={styles.title}>Feedback</Text>
        <Text style={{ color: Color.white }}>
          <Text style={{ fontWeight: "bold" }}>Note: </Text> only rec student
          can submit feedback
        </Text>
        <View style={styles.contactContainer}>
          {hasPermission === null && (
            <Text>Requesting for camera permission</Text>
          )}
          {hasPermission === false && <Text>No access to camera</Text>}
          {!state.link ? (
            <>
              <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={styles.absoluteFillObject}
                type="back"
              />
              {!state.link && (
                <Button
                  title={"Tap to Scan"}
                  onPress={() => setScanned(false)}
                  style={{ marginBottom: 10 }}
                />
              )}
            </>
          ) : (
            <Text style={{ marginBottom: 10 }}>{state.link}</Text>
          )}

          <TextInput
            style={styles.input}
            placeholder="Feedback"
            placeholderTextColor={Color.bold}
            multiline={true}
            numberOfLines={5}
            value={state.feedback}
            onChangeText={(text) => {
              updateState({ feedback: text });
            }}
          />
          <CustomButton style={styles.button} onPress={onSubmit}>
            <Text style={{ color: Color.white }}>Submit</Text>
          </CustomButton>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 70,
  },
  title: {
    color: Color.bold,
    fontSize: 22,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 10,
    marginTop: 20,
  },
  contactContainer: {
    borderRadius: 20,
    width: "100%",
    backgroundColor: Color.regular,
    padding: 20,
  },
  input: {
    backgroundColor: Color.light,
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
  },
  button: {
    height: 50,
    marginTop: 10,
    backgroundColor: Color.bold,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  absoluteFillObject: {
    height: 150,
    marginBottom: 10,
  },
});

export default Contact;
