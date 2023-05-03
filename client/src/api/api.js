import axios from "axios";

export default axios.create({
  baseURL: "https://bus-tracking-server.azurewebsites.net/api",
});
