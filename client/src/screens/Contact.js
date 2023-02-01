import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import Header from "../components/Header";
import Color from "../utils/Color";
import { DataTable } from "react-native-paper";
import Button from "../components/CustomButton";
import { useState } from "react";

const Contact = ({ navigation }) => {
  const [state, setState] = useState({
    email: "",
    feedback: "",
  });

  const updateState = (data) => {
    setState((state) => ({ ...state, ...data }));
  };

  const onSubmit = () => {
    updateState();
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
        <Text style={{ ...styles.title, marginTop: 20 }}>Feedback</Text>
        <View style={styles.contactContainer}>
          <TextInput
            style={styles.input}
            placeholder="College Id"
            autoComplete="email"
            inputMode="email"
            value={state.email}
            onChangeText={(text) => {
              updateState({ email: text });
            }}
            placeholderTextColor={Color.bold}
          />
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
          <Button style={styles.button} onPress={onSubmit}>
            <Text style={{ color: Color.white }}>Submit</Text>
          </Button>
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
    marginBottom: 30,
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
});

export default Contact;
