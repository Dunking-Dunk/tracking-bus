import { io } from "socket.io-client";

class Socket {
  constructor() {
<<<<<<< HEAD
    this.url = "https://c4a1-49-204-113-4.in.ngrok.io";
=======
    this.url = "https://2150-2401-4900-25c3-4afb-5510-2724-768e-fb16.in.ngrok.io";
>>>>>>> ef74fef5256609595c454148526d803120bed0d0
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
}

export const clientSocket = new Socket();
