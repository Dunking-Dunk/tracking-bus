import axios from "axios";
import Constants from "expo-constants";

const { manifest } = Constants;

const uri = `http://${manifest.debuggerHost.split(":").shift()}`;

export default axios.create({
  baseURL: "http://10.0.2.2:4000/api",
});
