import * as Location from "expo-location";
import { showError, showSuccess } from "./helperFunction";

class GetUserLocation {
  constructor() {
    this.getPermissions();
  }

  async getPermissions() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      this.error = "Permission to access location was denied";
      showError("Permission to access location was denied");
    }
  }

  async getUserLocation() {
    this.location = await Location.getCurrentPositionAsync();
    this.coords = {
      latitude: this.location.coords.latitude,
      longitude: this.location.coords.longitude,
    };
    return this.coords;
  }
  catch(err) {
    console.log(err);
  }
}

export const userLocation = new GetUserLocation();
