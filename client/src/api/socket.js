import { io } from "socket.io-client";

class Socket {
  constructor() {
    this.url = "https://d803-49-205-86-123.in.ngrok.io";
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

  getBusLocation(room, getBusLocation) {
    this.socket.emit("join-room", room);
    this.socket.on("getBusLocation", (data) => {
      console.log(data);
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
}

export const clientSocket = new Socket();
