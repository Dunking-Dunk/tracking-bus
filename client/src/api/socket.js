import { io } from "socket.io-client";
import {
  addAnnouncement,
  addBus,
  addStop,
  deleteAnnouncement,
  deleteBus,
  deleteStop,
} from "../store/action";

class Socket {
  constructor() {
    this.url = "https://bus-tracking-server.azurewebsites.net/";
    this.config = {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 3,
      transports: ["polling", "websocket"],
    };
    this.createConnection();
  }

  createConnection() {
    this.socket = io(this.url, this.config);
    this.socket.on("connect", () => {
      console.log("connected to the server");
    });

    this.errorConnection();
  }

  getAllBusLocations(getBusesLocations) {
    this.socket.on("getAllBusLocation", (data) => {
      getBusesLocations(data);
    });
  }

  getBusLocation(room, setBusLiveLocation) {
    this.socket.emit("join-room", room);
    this.socket.on("getBusLocation", (data) => {
      setBusLiveLocation(data);
    });
  }

  stopAllBusLocation() {
    this.socket.removeListener("getAllBusLocation");
  }

  stopBusLocation(room) {
    this.socket.emit("leave-room", room);
    this.socket.removeListener("getBusLocation");
  }

  errorConnection() {
    this.socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err}`);
    });
  }

  getNewBusAndStopAdded(dispatch) {
    this.socket.on("newBusAdded", (data) => {
      dispatch(addBus(data));
    });
    this.socket.on("newStopAdded", (data) => {
      dispatch(addStop(data));
    });
    this.socket.on("stopDeleted", (data) => {
      dispatch(deleteStop(data));
    });
    this.socket.on("busDeleted", (data) => {
      dispatch(deleteBus(data));
    });
    this.socket.on("newAnnoucement", (data) => {
      dispatch(addAnnouncement(data));
    });
    this.socket.on("deleteAnnouncement", (data) => {
      dispatch(deleteAnnouncement(data));
    });
  }
}

export const clientSocket = new Socket();
