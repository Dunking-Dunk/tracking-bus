import { io } from "socket.io-client";

class Socket {
  constructor() {
    this.url = "https://975d-49-205-80-77.in.ngrok.io";
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

  getBusLocations(getBusesLocations) {
    this.socket.on("getLocation", (data) => {
      getBusesLocations(data);
    });
  }

  stopBusLocations() {
    this.socket.removeListener("getLocation");
    this.socket.emit("stop-getLocation", "stopped");
  }

  errorConnection() {
    this.socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err}`);
    });
  }
}

export const clientSocket = new Socket();
